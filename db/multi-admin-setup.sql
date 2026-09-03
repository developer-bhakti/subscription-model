-- ===========================================================================
-- Multi-admin setup for the subscription model.
-- Run this ONCE, top to bottom, in Supabase -> SQL Editor -> New query -> Run.
-- Safe to re-run: every step is idempotent.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. OWNERSHIP COLUMN
--    Records which admin created each row. users.id is a uuid, so the foreign
--    key must be uuid too. ON DELETE SET NULL means deleting an admin keeps
--    their users alive; they fall back to the super admin's list.
-- ---------------------------------------------------------------------------
alter table public.users
  add column if not exists created_by uuid references public.users (id) on delete set null;


-- ---------------------------------------------------------------------------
-- 2. ASSIGNED MODEL
--    Which product an admin is put in charge of, e.g. 'Subscription Model'.
-- ---------------------------------------------------------------------------
alter table public.users
  add column if not exists assigned_model text;


-- ---------------------------------------------------------------------------
-- 3. PROMOTE THE EXISTING ADMIN TO SUPER ADMIN
--    admin@adiuvaret.in becomes the one account with full control.
-- ---------------------------------------------------------------------------
update public.users
set role = 'superadmin'
where username = 'admin@adiuvaret.in';


-- ---------------------------------------------------------------------------
-- 4. BACKFILL OWNERSHIP OF THE 11 EXISTING USERS
--    They were all created by the super admin, so hand them to the super
--    admin. A newly created sub-admin therefore starts with an empty list and
--    never sees any of these rows.
-- ---------------------------------------------------------------------------
update public.users
set created_by = (select id from public.users where role = 'superadmin' limit 1)
where created_by is null
  and role <> 'superadmin';


-- ---------------------------------------------------------------------------
-- 5. INDEX
--    Every sub-admin page load filters on created_by.
-- ---------------------------------------------------------------------------
create index if not exists users_created_by_idx on public.users (created_by);


-- ---------------------------------------------------------------------------
-- 6. RULES ENFORCED IN THE DATABASE
--    These hold no matter who writes the row - the app, the Table Editor, or
--    a raw SQL statement:
--      a. ownership can never be reassigned once set, so one admin can never
--         take over another admin's user;
--      b. an 'admin' account can only be owned by a superadmin, so a sub-admin
--         can never create another admin;
--      c. a row can never own itself.
-- ---------------------------------------------------------------------------
create or replace function public.users_ownership_guard()
returns trigger
language plpgsql
as $$
declare
  owner_role text;
begin
  if tg_op = 'UPDATE'
     and old.created_by is not null
     and new.created_by is distinct from old.created_by then
    raise exception 'created_by cannot be reassigned (user %)', old.username;
  end if;

  if new.created_by = new.id then
    raise exception 'a row cannot be its own creator';
  end if;

  if new.role = 'admin' and new.created_by is not null then
    select role into owner_role from public.users where id = new.created_by;

    if owner_role is distinct from 'superadmin' then
      raise exception 'only a superadmin can create an admin account';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists users_ownership_guard on public.users;

create trigger users_ownership_guard
  before insert or update on public.users
  for each row execute function public.users_ownership_guard();


-- ---------------------------------------------------------------------------
-- 7. CHECK THE RESULT
--    Expect: admin@adiuvaret.in = superadmin with created_by NULL, and every
--    other row = user with created_by pointing at the super admin.
-- ---------------------------------------------------------------------------
select
  u.username,
  u.role,
  u.assigned_model,
  owner.username as created_by
from public.users u
left join public.users owner on owner.id = u.created_by
order by u.role, u.username;


-- ---------------------------------------------------------------------------
-- 8. OPTIONAL - only if a CHECK constraint on role rejects 'superadmin'.
--    Step 3 will have failed with a constraint violation if so. Find the
--    constraint name in the error, then run these two statements.
-- ---------------------------------------------------------------------------
-- alter table public.users drop constraint users_role_check;
-- alter table public.users
--   add constraint users_role_check check (role in ('superadmin', 'admin', 'user'));
