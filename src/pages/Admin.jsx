import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { ROLES, getCurrentUser, isSuperAdmin } from "../services/auth";

// Products an admin can be put in charge of. Add new modules to this list.
const ASSIGNABLE_MODELS = ["Subscription Model"];

const emptyForm = {
  username: "",
  password: "",
  endDate: "",
  price: "",
  assignedModel: ASSIGNABLE_MODELS[0],
};

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "—");

export default function Admin() {
  const navigate = useNavigate();

  const [currentAdmin] = useState(getCurrentUser);
  const superAdmin = isSuperAdmin(currentAdmin);

  const [view, setView] = useState(superAdmin ? "admins" : "users");
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState("all");

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
      setUsers(userResult.data || []);

      if (staffResult) {
        if (staffResult.error) throw staffResult.error;
        setStaff(staffResult.data || []);
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

  const visibleUsers =
    superAdmin && ownerFilter !== "all"
      ? users.filter((user) =>
          ownerFilter === "none"
            ? !user.created_by
            : String(user.created_by) === ownerFilter
        )
      : users;

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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const tabClass = (name) =>
    `px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto ${
      view === name
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    }`;

  const userColumns = ["ID", "Username", "End Date", "Price"]
    .concat(superAdmin ? ["Created By"] : [])
    .concat(["Actions"]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {superAdmin ? "Super Admin Dashboard" : "Admin Dashboard"}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Signed in as{" "}
                <span className="font-medium text-gray-700">{currentAdmin.username}</span>
                {!superAdmin && currentAdmin.assigned_model && (
                  <> · {currentAdmin.assigned_model}</>
                )}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 sm:px-6 lg:px-8">

        <div className="px-4 sm:px-0">

          {/* TOP ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">

            {superAdmin && (
              <button onClick={() => setView("admins")} className={tabClass("admins")}>
                Admins
              </button>
            )}

            <button onClick={() => setView("users")} className={tabClass("users")}>
              {superAdmin ? "All Users" : "My Users"}
            </button>

            {superAdmin && view === "admins" && (
              <button
                onClick={() => openCreateForm(ROLES.ADMIN)}
                className="px-6 py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors w-full sm:w-auto"
              >
                + Add New Admin
              </button>
            )}

            {view === "users" && (
              <button
                onClick={() => openCreateForm(ROLES.USER)}
                className="px-6 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                + Add New User
              </button>
            )}

          </div>

          {/* ADMIN LIST (SUPER ADMIN ONLY) */}
          {superAdmin && view === "admins" && (
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Admins Management
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Each admin can only see and manage the users they create.
                </p>
              </div>

              {loadingList ? (
                <div className="p-6 text-center text-gray-500">Loading admins...</div>
              ) : admins.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No admins found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">

                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        {["ID", "Username", "Assigned Model", "Users Created", "End Date", "Actions"].map(
                          (heading) => (
                            <th
                              key={heading}
                              className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                            >
                              {heading}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {admins.map((admin, index) => (
                        <tr key={admin.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {admin.id}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {admin.username}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {admin.assigned_model || "Not assigned"}
                            </span>
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {countUsersOf(admin.id)}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {formatDate(admin.end_date)}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                            <div className="flex flex-wrap gap-2">

                              <button
                                onClick={() => {
                                  setOwnerFilter(String(admin.id));
                                  setView("users");
                                }}
                                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors text-xs font-medium"
                              >
                                View Users
                              </button>

                              <button
                                onClick={() => openEditForm(admin)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-xs font-medium"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => deleteRecord(admin)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                              >
                                Delete
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              )}
            </div>
          )}

          {/* USER LIST */}
          {view === "users" && (
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Users Management
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {superAdmin
                      ? "Every user in the system, including those created by each admin."
                      : "Only the users you created are shown here."}
                  </p>
                </div>

                {superAdmin && (
                  <select
                    value={ownerFilter}
                    onChange={(event) => setOwnerFilter(event.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-auto"
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

              {loadingList ? (
                <div className="p-6 text-center text-gray-500">Loading users...</div>
              ) : visibleUsers.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No users found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">

                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        {userColumns.map((heading) => (
                          <th
                            key={heading}
                            className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {visibleUsers.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {user.id}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {user.username}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {formatDate(user.end_date)}
                          </td>

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            ₹{user.price}
                          </td>

                          {superAdmin && (
                            <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {ownerName(user.created_by)}
                              </span>
                            </td>
                          )}

                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                            <div className="flex flex-wrap gap-2">

                              <button
                                onClick={() => openEditForm(user)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-xs font-medium"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => deleteRecord(user)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                              >
                                Delete
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingRecord ? "Edit " : "Create New "}
              {formRole === ROLES.ADMIN ? "Admin" : "User"}
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={setField("username")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={setField("password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                />
              </div>

              {formRole === ROLES.ADMIN && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To Model
                  </label>

                  <select
                    value={form.assignedModel}
                    onChange={setField("assignedModel")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                  >
                    {ASSIGNABLE_MODELS.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription End Date{formRole === ROLES.ADMIN ? " (optional)" : ""}
                </label>

                <input
                  type="date"
                  value={form.endDate}
                  onChange={setField("endDate")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹){formRole === ROLES.ADMIN ? " (optional)" : ""}
                </label>

                <input
                  type="number"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={setField("price")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                onClick={saveRecord}
                disabled={saving}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {saving ? "Processing..." : editingRecord ? "Update" : "Create"}
              </button>

              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
