import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarClock,
  CalendarX,
  CircleCheck,
  Eye,
  GraduationCap,
  Inbox,
  LogOut,
  Pencil,
  Search,
  SearchX,
  ShieldCheck,
  Trash2,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";
import { supabase } from "../services/supabaseClient";
import { PasswordInput } from "../components/PasswordToggle";
import {
  Avatar,
  ListMessage,
  OwnerPill,
  RowButton,
  StatTile,
  StatusChip,
  TypeChip,
} from "../components/AdminUI";
import { subscriptionStatus } from "../services/subscription";
import { Star } from "../components/KidsArt";
import {
  ROLES,
  ACCOUNT_TYPES,
  getCurrentUser,
  isSuperAdmin,
  getAccountType,
} from "../services/auth";

// Products an admin can be put in charge of. Add new modules to this list.
const ASSIGNABLE_MODELS = ["Subscription Model"];

const emptyForm = {
  username: "",
  password: "",
  endDate: "",
  price: "",
  assignedModel: ASSIGNABLE_MODELS[0],
  accountType: ACCOUNT_TYPES.TEACHER,
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "—");

// A to Z by username, ignoring capitals and putting numbers in their natural order, so
// "school2" comes before "school10".
const byUsername = (a, b) =>
  String(a.username ?? "").localeCompare(String(b.username ?? ""), undefined, {
    sensitivity: "base",
    numeric: true,
  });

// A label and its field in the create / edit form.
const Field = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-kid-ink">
      {label}
    </label>

    {children}
  </div>
);

export default function Admin() {
  const navigate = useNavigate();

  const [currentAdmin] = useState(getCurrentUser);
  const superAdmin = isSuperAdmin(currentAdmin);

  // Today, fixed when the page opens, so every subscription is judged against the same moment.
  const [now] = useState(() => Date.now());

  const [view, setView] = useState(superAdmin ? "admins" : "users");
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [formRole, setFormRole] = useState(ROLES.USER);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // An admin only ever asks the database for the rows it owns, so users
  // belonging to another admin never reach the browser in the first place.
  const loadData = useCallback(async () => {
    if (!currentAdmin) return;

    setLoadingList(true);

    try {
      let userQuery = supabase
        .from("users")
        .select("*")
        .eq("role", ROLES.USER)
        .order("id", { ascending: false });

      if (!superAdmin) {
        userQuery = userQuery.eq("created_by", currentAdmin.id);
      }

      const requests = [userQuery];

      if (superAdmin) {
        requests.push(
          supabase
            .from("users")
            .select("*")
            .in("role", [ROLES.ADMIN, ROLES.SUPER_ADMIN])
            .order("id", { ascending: false })
        );
      }

      const [userResult, staffResult] = await Promise.all(requests);

      if (userResult.error) throw userResult.error;
      setUsers([...(userResult.data || [])].sort(byUsername));

      if (staffResult) {
        if (staffResult.error) throw staffResult.error;
        setStaff([...(staffResult.data || [])].sort(byUsername));
      }
    } catch (err) {
      console.error(err);
      alert(`Error loading data: ${err.message || err}`);
    }

    setLoadingList(false);
  }, [currentAdmin, superAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const admins = staff.filter((row) => row.role === ROLES.ADMIN);

  const ownerName = (createdBy) => {
    if (!createdBy) return "Super Admin (legacy)";

    const owner = staff.find((row) => row.id === createdBy);
    return owner ? owner.username : `#${createdBy}`;
  };

  const countUsersOf = (adminId) =>
    users.filter((user) => user.created_by === adminId).length;

  // The figures at the top of the page: every user this account can see, by where their
  // subscription stands.
  const statusCount = (status) =>
    users.filter((user) => subscriptionStatus(user.end_date, now) === status).length;

  const soonCount = statusCount("soon");
  const expiredCount = statusCount("expired");
  const activeCount = statusCount("active") + soonCount;
  const figure = (value) => (loadingList && users.length === 0 ? "–" : value);

  const ownedUsers =
    superAdmin && ownerFilter !== "all"
      ? users.filter((user) =>
          ownerFilter === "none"
            ? !user.created_by
            : String(user.created_by) === ownerFilter
        )
      : users;

  // The search looks at what the list shows (ID, username and, for the Super Admin, the
  // admin who owns the user). Every word typed has to match, in any order and any case.
  const searchTerms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const visibleUsers = searchTerms.length
    ? ownedUsers.filter((user) => {
        const haystack = [user.id, user.username, superAdmin ? ownerName(user.created_by) : ""]
          .join(" ")
          .toLowerCase();

        return searchTerms.every((term) => haystack.includes(term));
      })
    : ownedUsers;

  // "View Users" on an admin starts from that admin's full list, not a leftover search.
  const showUsersOf = (adminId) => {
    setOwnerFilter(String(adminId));
    setSearch("");
    setView("users");
  };

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const openCreateForm = (role) => {
    setEditingRecord(null);
    setFormRole(role);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditForm = (record) => {
    setEditingRecord(record);
    setFormRole(record.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.USER);
    setForm({
      username: record.username || "",
      password: record.password || "",
      endDate: record.end_date ? String(record.end_date).slice(0, 10) : "",
      price: record.price ?? "",
      assignedModel: record.assigned_model || ASSIGNABLE_MODELS[0],
      accountType: getAccountType(record),
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRecord(null);
    setForm(emptyForm);
  };

  const saveRecord = async () => {
    const isAdminForm = formRole === ROLES.ADMIN;

    if (!form.username || !form.password) {
      alert("Please enter a username and password");
      return;
    }

    // An admin account carries no subscription of its own, so end date and
    // price are only required for a user.
    if (!isAdminForm && (!form.endDate || form.price === "")) {
      alert("Please fill all fields");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        username: form.username,
        password: form.password,
        end_date: form.endDate || null,
        price: form.price === "" ? null : form.price,
      };

      if (isAdminForm) {
        payload.assigned_model = form.assignedModel;
      } else {
        // Decides which dashboard the account lands on and which modules it can
        // reach. Admin accounts have their own area, so it does not apply to them.
        payload.account_type = form.accountType;
      }

      if (editingRecord) {
        let query = supabase.from("users").update(payload).eq("id", editingRecord.id);

        // Re-apply the ownership filter so an admin cannot edit a row it does
        // not own, even if the id were tampered with.
        if (!superAdmin) {
          query = query.eq("created_by", currentAdmin.id);
        }

        const { error } = await query;
        if (error) throw error;

        alert(isAdminForm ? "Admin updated successfully!" : "User updated successfully!");
      } else {
        const { error } = await supabase.from("users").insert([
          {
            ...payload,
            role: isAdminForm ? ROLES.ADMIN : ROLES.USER,
            created_by: currentAdmin.id,
          },
        ]);

        if (error) throw error;

        alert(isAdminForm ? "Admin created successfully!" : "User created successfully!");
      }

      closeModal();
      loadData();
    } catch (err) {
      console.error(err);
      alert(`An error occurred: ${err.message || err}`);
    }

    setSaving(false);
  };

  const deleteRecord = async (record) => {
    const isAdminRow = record.role === ROLES.ADMIN;

    const message = isAdminRow
      ? `Delete admin "${record.username}"? The users they created stay in the system and become visible to the Super Admin only.`
      : `Are you sure you want to delete "${record.username}"?`;

    if (!window.confirm(message)) return;

    try {
      let query = supabase.from("users").delete().eq("id", record.id);

      if (!superAdmin) {
        query = query.eq("created_by", currentAdmin.id);
      }

      const { error } = await query;
      if (error) throw error;

      alert("Deleted successfully!");
      loadData();
    } catch (err) {
      console.error(err);
      alert(`An error occurred: ${err.message || err}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!currentAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6f5e1] font-playful font-bold text-kid-soft">
        Loading...
      </div>
    );
  }

  const tabClass = (name) =>
    `inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:flex-none ${
      view === name
        ? "bg-kid-green text-white shadow-[0_3px_0_#0f7a36]"
        : "text-kid-soft hover:bg-tone-mint"
    }`;

  const userColumns = ["ID", "Username", "End Date", "Price"]
    .concat(superAdmin ? ["Created By"] : [])
    .concat(["Actions"]);

  const adminColumns = ["ID", "Username", "Assigned Model", "Users Created", "End Date", "Actions"];

  const th = "whitespace-nowrap px-4 py-3 text-left sm:px-6";
  const td = "px-4 py-3.5 text-sm font-semibold text-kid-ink sm:px-6";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f5e1] to-[#f6fbf2] font-playful text-kid-ink">

      {/* HEADER */}
      <header className="sticky top-0 z-30 overflow-hidden bg-gradient-to-r from-[#1da655] to-[#127c3b] text-white shadow-lg">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-white/10"
        />

        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 sm:px-6 lg:px-8">

          <div className="order-1 flex min-w-0 flex-1 items-center gap-3">
            <span className="kid-chip h-12 w-12 text-kid-deep">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/75">
                ECCE 360 Tool
              </p>

              <h1 className="text-lg font-bold leading-tight sm:text-2xl">
                {superAdmin ? "Super Admin Dashboard" : "Admin Dashboard"}
              </h1>
            </div>
          </div>

          <div className="order-3 flex w-full items-center gap-2.5 rounded-full bg-white/15 py-1.5 pl-1.5 pr-4 sm:order-2 sm:w-auto">
            <Avatar name={currentAdmin.username} className="h-9 w-9 text-base" />

            <p className="min-w-0 text-xs leading-tight text-white/80 sm:text-sm">
              Signed in as{" "}
              <span className="font-bold text-white">{currentAdmin.username}</span>
              {!superAdmin && currentAdmin.assigned_model && (
                <> · {currentAdmin.assigned_model}</>
              )}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="kid-btn kid-btn-soft order-2 !py-2 sm:order-3"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">

        {/* AT A GLANCE */}
        <section
          aria-label="At a glance"
          className={`mb-6 grid grid-cols-2 gap-3 sm:gap-4 ${
            superAdmin ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          {superAdmin && (
            <StatTile
              icon={ShieldCheck}
              label="Admins"
              value={figure(admins.length)}
              tone="tone-mint"
            />
          )}

          <StatTile
            icon={UsersRound}
            label={superAdmin ? "Users" : "My users"}
            value={figure(users.length)}
            tone="tone-lime"
          />

          <StatTile
            icon={CircleCheck}
            label="Active"
            value={figure(activeCount)}
            tone="tone-aqua"
          />

          <StatTile
            icon={CalendarClock}
            label="Expiring soon"
            value={figure(soonCount)}
            hint="Ends within 30 days"
            tone="tone-butter"
          />

          <StatTile
            icon={CalendarX}
            label="Expired"
            value={figure(expiredCount)}
            tone="tone-rose"
            className={superAdmin ? "col-span-2 lg:col-span-1" : ""}
          />
        </section>

        {/* TOP ACTIONS */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

          <div className="flex gap-1.5 rounded-full border-2 border-edge-mint bg-white p-1.5 shadow-sm">
            {superAdmin && (
              <button
                onClick={() => setView("admins")}
                aria-pressed={view === "admins"}
                className={tabClass("admins")}
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Admins
              </button>
            )}

            <button
              onClick={() => setView("users")}
              aria-pressed={view === "users"}
              className={tabClass("users")}
            >
              <UsersRound className="h-4 w-4" aria-hidden="true" />
              {superAdmin ? "All Users" : "My Users"}
            </button>
          </div>

          {superAdmin && view === "admins" && (
            <button
              onClick={() => openCreateForm(ROLES.ADMIN)}
              className="kid-btn kid-btn-sun sm:ml-auto"
            >
              + Add New Admin
            </button>
          )}

          {view === "users" && (
            <button
              onClick={() => openCreateForm(ROLES.USER)}
              className="kid-btn kid-btn-sun sm:ml-auto"
            >
              + Add New User
            </button>
          )}

        </div>

        {/* ADMIN LIST (SUPER ADMIN ONLY) */}
        {superAdmin && view === "admins" && (
          <section className="kid-card tone-white overflow-hidden">

            <div className="flex items-center gap-3 border-b-2 border-edge-mint/70 bg-gradient-to-r from-[#eaf8ea] to-white px-4 py-4 sm:px-6">
              <span className="kid-chip h-12 w-12 bg-tone-mint text-kid-deep">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>

              <div className="min-w-0">
                <h2 className="text-lg font-bold text-kid-ink sm:text-xl">
                  Admins Management
                </h2>

                <p className="mt-0.5 text-xs font-medium text-kid-soft sm:text-sm">
                  Each admin can only see and manage the users they create.
                </p>
              </div>

              <Star className="ml-auto hidden h-7 w-7 shrink-0 sm:block" />
            </div>

            {loadingList ? (
              <ListMessage loading title="Loading admins..." />
            ) : admins.length === 0 ? (
              <ListMessage icon={ShieldCheck} title="No admins found" />
            ) : (
              <>
                {/* Phones and tablets: one card per admin, so Edit and Delete are never off the right-hand edge */}
                <ul className="space-y-3 bg-[#f7fcf5] p-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:hidden">
                  {admins.map((admin) => (
                    <li
                      key={admin.id}
                      className="flex flex-col rounded-2xl border-2 border-edge-mint bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar name={admin.username} />

                        <div className="min-w-0 flex-1">
                          <p className="break-all font-bold text-kid-ink">{admin.username}</p>
                          <p className="text-xs font-semibold text-kid-soft">ID {admin.id}</p>
                        </div>

                        <span className="max-w-[40%] shrink-0 truncate rounded-full bg-tone-aqua px-3 py-1 text-xs font-bold text-[#0f6b6b]">
                          {admin.assigned_model || "Not assigned"}
                        </span>
                      </div>

                      <dl className="mt-3 grid grid-cols-2 gap-3 rounded-2xl bg-[#f3fbf1] p-3 text-sm">
                        <div>
                          <dt className="text-xs font-semibold text-kid-soft">Users created</dt>
                          <dd className="font-bold text-kid-ink">{countUsersOf(admin.id)}</dd>
                        </div>

                        <div>
                          <dt className="text-xs font-semibold text-kid-soft">End date</dt>
                          <dd className="font-bold text-kid-ink">{formatDate(admin.end_date)}</dd>
                        </div>
                      </dl>

                      <div className="mt-auto grid grid-cols-3 gap-2 pt-3">
                        <RowButton large tone="view" icon={Eye} onClick={() => showUsersOf(admin.id)}>
                          View Users
                        </RowButton>

                        <RowButton large tone="edit" icon={Pencil} onClick={() => openEditForm(admin)}>
                          Edit
                        </RowButton>

                        <RowButton large tone="danger" icon={Trash2} onClick={() => deleteRecord(admin)}>
                          Delete
                        </RowButton>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="hidden overflow-x-auto lg:block">
                  <table className="min-w-full">

                    <thead className="bg-tone-mint text-[11px] font-bold uppercase tracking-wider text-kid-deep">
                      <tr>
                        {adminColumns.map((heading) => (
                          <th key={heading} className={th}>
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#e3f3e6]">
                      {admins.map((admin) => (
                        <tr key={admin.id} className="transition-colors hover:bg-[#f6fcf3]">

                          <td className={`${td} whitespace-nowrap text-kid-soft`}>{admin.id}</td>

                          <td className={`${td} whitespace-nowrap`}>
                            <div className="flex items-center gap-3">
                              <Avatar name={admin.username} />
                              <span className="font-bold">{admin.username}</span>
                            </div>
                          </td>

                          <td className={`${td} whitespace-nowrap`}>
                            <span className="inline-flex rounded-full bg-tone-aqua px-3 py-1 text-xs font-bold text-[#0f6b6b]">
                              {admin.assigned_model || "Not assigned"}
                            </span>
                          </td>

                          <td className={`${td} whitespace-nowrap`}>
                            <span className="inline-grid h-7 min-w-7 place-items-center rounded-full bg-tone-butter px-2 text-sm font-bold text-[#8a5a00]">
                              {countUsersOf(admin.id)}
                            </span>
                          </td>

                          <td className={`${td} whitespace-nowrap`}>{formatDate(admin.end_date)}</td>

                          <td className={td}>
                            <div className="flex flex-wrap gap-2">
                              <RowButton tone="view" icon={Eye} onClick={() => showUsersOf(admin.id)}>
                                View Users
                              </RowButton>

                              <RowButton tone="edit" icon={Pencil} onClick={() => openEditForm(admin)}>
                                Edit
                              </RowButton>

                              <RowButton tone="danger" icon={Trash2} onClick={() => deleteRecord(admin)}>
                                Delete
                              </RowButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </>
            )}
          </section>
        )}

        {/* USER LIST */}
        {view === "users" && (
          <section className="kid-card tone-white overflow-hidden">

            <div className="flex flex-col gap-4 border-b-2 border-edge-mint/70 bg-gradient-to-r from-[#eaf8ea] to-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-3">
                <span className="kid-chip h-12 w-12 bg-tone-lime text-kid-deep">
                  <UsersRound className="h-6 w-6" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-kid-ink sm:text-xl">
                    Users Management
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-kid-soft sm:text-sm">
                    {superAdmin
                      ? "Every user in the system, including those created by each admin."
                      : "Only the users you created are shown here."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <div role="search" className="relative w-full sm:w-80">
                  <Search
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-kid-soft"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") setSearch("");
                    }}
                    placeholder={superAdmin ? "Search by username, ID or admin" : "Search by username or ID"}
                    aria-label="Search users"
                    autoComplete="off"
                    className="kid-input rounded-full py-2.5 pl-11 pr-10 text-sm"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-kid-soft hover:bg-tone-mint hover:text-kid-ink"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>

                {superAdmin && (
                  <select
                    value={ownerFilter}
                    onChange={(event) => setOwnerFilter(event.target.value)}
                    aria-label="Filter by admin"
                    className="kid-input w-full rounded-full py-2.5 text-sm sm:w-auto"
                  >
                    <option value="all">All admins</option>

                    {admins.map((admin) => (
                      <option key={admin.id} value={String(admin.id)}>
                        {admin.username}
                      </option>
                    ))}

                    <option value="none">Super Admin (legacy)</option>
                  </select>
                )}

              </div>

            </div>

            {!loadingList && users.length > 0 && (
              <p
                role="status"
                className="border-b border-edge-mint/50 bg-[#f7fcf5] px-4 py-2.5 text-xs font-bold text-kid-soft sm:px-6"
              >
                {visibleUsers.length === users.length
                  ? `${users.length} ${users.length === 1 ? "user" : "users"}`
                  : `Showing ${visibleUsers.length} of ${users.length} users`}
                <span className="font-medium"> · A to Z</span>
              </p>
            )}

            {loadingList ? (
              <ListMessage loading title="Loading users..." />
            ) : visibleUsers.length === 0 ? (
              searchTerms.length ? (
                <ListMessage icon={SearchX} title={`No users match “${search.trim()}”`}>
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="kid-btn kid-btn-soft mt-4 !py-2"
                  >
                    Clear search
                  </button>
                </ListMessage>
              ) : (
                <ListMessage icon={Inbox} title="No users found" />
              )
            ) : (
              <>
                {/* Phones and tablets: one card per user, so Edit and Delete are never off the right-hand edge */}
                <ul className="space-y-3 bg-[#f7fcf5] p-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:hidden">
                  {visibleUsers.map((user) => (
                    <li
                      key={user.id}
                      className="flex flex-col rounded-2xl border-2 border-edge-mint bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar name={user.username} />

                        <div className="min-w-0 flex-1">
                          <p className="break-all font-bold text-kid-ink">{user.username}</p>
                          <p className="text-xs font-semibold text-kid-soft">ID {user.id}</p>

                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            <TypeChip user={user} />
                            <StatusChip status={subscriptionStatus(user.end_date, now)} />
                            {superAdmin && <OwnerPill name={ownerName(user.created_by)} />}
                          </div>
                        </div>
                      </div>

                      <dl className="mt-3 grid grid-cols-2 gap-3 rounded-2xl bg-[#f3fbf1] p-3 text-sm">
                        <div>
                          <dt className="text-xs font-semibold text-kid-soft">End date</dt>
                          <dd className="font-bold text-kid-ink">{formatDate(user.end_date)}</dd>
                        </div>

                        <div>
                          <dt className="text-xs font-semibold text-kid-soft">Price</dt>
                          <dd className="font-bold text-kid-ink">₹{user.price}</dd>
                        </div>
                      </dl>

                      <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
                        <RowButton large tone="edit" icon={Pencil} onClick={() => openEditForm(user)}>
                          Edit
                        </RowButton>

                        <RowButton large tone="danger" icon={Trash2} onClick={() => deleteRecord(user)}>
                          Delete
                        </RowButton>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="hidden overflow-x-auto lg:block">
                  <table className="min-w-full">

                    <thead className="bg-tone-mint text-[11px] font-bold uppercase tracking-wider text-kid-deep">
                      <tr>
                        {userColumns.map((heading) => (
                          <th key={heading} className={th}>
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#e3f3e6]">
                      {visibleUsers.map((user) => (
                        <tr key={user.id} className="transition-colors hover:bg-[#f6fcf3]">

                          <td className={`${td} whitespace-nowrap text-kid-soft`}>{user.id}</td>

                          <td className={`${td} whitespace-nowrap`}>
                            <div className="flex items-center gap-3">
                              <Avatar name={user.username} />

                              <div>
                                <p className="font-bold">{user.username}</p>
                                <TypeChip user={user} />
                              </div>
                            </div>
                          </td>

                          <td className={`${td} whitespace-nowrap`}>
                            <div className="flex flex-col items-start gap-1">
                              <span>{formatDate(user.end_date)}</span>
                              <StatusChip status={subscriptionStatus(user.end_date, now)} />
                            </div>
                          </td>

                          <td className={`${td} whitespace-nowrap font-bold text-kid-deep`}>
                            ₹{user.price}
                          </td>

                          {superAdmin && (
                            <td className={`${td} whitespace-nowrap`}>
                              <OwnerPill name={ownerName(user.created_by)} />
                            </td>
                          )}

                          <td className={td}>
                            <div className="flex flex-wrap gap-2">
                              <RowButton tone="edit" icon={Pencil} onClick={() => openEditForm(user)}>
                                Edit
                              </RowButton>

                              <RowButton tone="danger" icon={Trash2} onClick={() => deleteRecord(user)}>
                                Delete
                              </RowButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </>
            )}
          </section>
        )}
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b2a16]/55 p-4 backdrop-blur-sm">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-form-title"
            className="kid-card tone-white max-h-[92vh] w-full max-w-md overflow-y-auto p-5 shadow-2xl sm:p-7"
          >

            <div className="mb-6 flex items-center gap-3">
              <span className="kid-chip h-12 w-12 bg-tone-mint text-kid-deep">
                {editingRecord ? (
                  <Pencil className="h-6 w-6" aria-hidden="true" />
                ) : formRole === ROLES.ADMIN ? (
                  <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <UserPlus className="h-6 w-6" aria-hidden="true" />
                )}
              </span>

              <h2 id="admin-form-title" className="min-w-0 flex-1 text-xl font-bold text-kid-ink">
                {editingRecord ? "Edit " : "Create New "}
                {formRole === ROLES.ADMIN ? "Admin" : "User"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-kid-soft transition-colors hover:bg-tone-mint hover:text-kid-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">

              <Field id="admin-form-username" label="Username">
                <input
                  id="admin-form-username"
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={setField("username")}
                  className="kid-input text-sm"
                />
              </Field>

              <Field id="admin-form-password" label="Password">
                <PasswordInput
                  id="admin-form-password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={setField("password")}
                  className="kid-input pr-12 text-sm"
                />
              </Field>

              {formRole === ROLES.ADMIN && (
                <Field id="admin-form-model" label="Assign To Model">
                  <select
                    id="admin-form-model"
                    value={form.assignedModel}
                    onChange={setField("assignedModel")}
                    className="kid-input text-sm"
                  >
                    {ASSIGNABLE_MODELS.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {formRole !== ROLES.ADMIN && (
                <Field id="admin-form-type" label="Account Type">
                  <select
                    id="admin-form-type"
                    value={form.accountType}
                    onChange={setField("accountType")}
                    className="kid-input text-sm"
                  >
                    <option value={ACCOUNT_TYPES.TEACHER}>
                      School
                    </option>

                    <option value={ACCOUNT_TYPES.PARENT}>
                      Parent
                    </option>
                  </select>
                </Field>
              )}

              <Field
                id="admin-form-end"
                label={`Subscription End Date${formRole === ROLES.ADMIN ? " (optional)" : ""}`}
              >
                <input
                  id="admin-form-end"
                  type="date"
                  value={form.endDate}
                  onChange={setField("endDate")}
                  className="kid-input text-sm"
                />
              </Field>

              <Field
                id="admin-form-price"
                label={`Price (₹)${formRole === ROLES.ADMIN ? " (optional)" : ""}`}
              >
                <input
                  id="admin-form-price"
                  type="number"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={setField("price")}
                  className="kid-input text-sm"
                />
              </Field>

            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

              <button
                onClick={closeModal}
                className="kid-btn kid-btn-soft flex-1 py-3"
              >
                Cancel
              </button>

              <button
                onClick={saveRecord}
                disabled={saving}
                className="kid-btn flex-1 py-3"
              >
                {saving ? "Processing..." : editingRecord ? "Update" : "Create"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
