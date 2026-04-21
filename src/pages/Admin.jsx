import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        alert("Error fetching users");
        console.error(error);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingUsers(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    if (!username || !password || !endDate || !price) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      if (editingUser) {
        // Update user
        const { error } = await supabase
          .from("users")
          .update({
            username,
            password,
            end_date: endDate,
            price,
          })
          .eq("id", editingUser.id);

        if (error) {
          alert("Error updating user");
          console.error(error);
        } else {
          alert("User updated successfully!");
          setEditingUser(null);
          setShowModal(false);
          fetchUsers();
        }
      } else {
        // Create new user
        const { error } = await supabase.from("users").insert([
          {
            username,
            password,
            end_date: endDate,
            price,
            role: "user",
          },
        ]);

        if (error) {
          alert("Error creating user");
          console.error(error);
        } else {
          alert("User created successfully!");
          fetchUsers();
        }
      }

      // Clear form
      setUsername("");
      setPassword("");
      setEndDate("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const { error } = await supabase.from("users").delete().eq("id", id);

        if (error) {
          alert("Error deleting user");
          console.error(error);
        } else {
          alert("User deleted successfully!");
          fetchUsers();
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred");
      }
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword(user.password);
    setEndDate(user.end_date);
    setPrice(user.price);
    setShowModal(true);
    setActiveTab("form");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setUsername("");
    setPassword("");
    setEndDate("");
    setPrice("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const openNewUserForm = () => {
    setEditingUser(null);
    setUsername("");
    setPassword("");
    setEndDate("");
    setPrice("");
    setShowModal(true);
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              User List
            </button>
            <button
              onClick={openNewUserForm}
              className="px-6 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              + Add New User
            </button>
          </div>

          {/* User List Tab */}
          {activeTab === "list" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Users Management</h2>
              </div>

              {loadingUsers ? (
                <div className="p-6 text-center text-gray-500">Loading users...</div>
              ) : users.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No users found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          End Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user.id}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{user.username}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {new Date(user.end_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">₹{user.price}</td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            <button
                              onClick={() => editUser(user)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-xs font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs font-medium"
                            >
                              Delete
                            </button>
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

      {/* Modal for Add/Edit User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingUser ? "Edit User" : "Create New User"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={createUser}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Processing..." : editingUser ? "Update User" : "Create User"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
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