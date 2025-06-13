import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

const UsersPage = () => {
  const { authUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get("/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await axiosInstance.post(`/users/block/${userId}/`);
      setUsers(users.map(u => u.id === userId ? { ...u, is_blocked: true } : u));
    } catch {
      alert("Failed to block user");
    }
  };

  if (loading) return <div className="text-center mt-16 text-lg text-gray-600">Loading users...</div>;
  if (error) return <div className="text-red-600 text-center mt-16 font-semibold">{error}</div>;

  const normalUsers = users.filter(u => !u.is_superuser && !u.is_agent);
  const agents = users.filter(u => !u.is_superuser && u.is_agent);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            View and manage the list of registered users and agents. Administrators can block users when necessary.
          </p>
        </header>

        {/* Users section */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">Regular Users</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            These are the normal registered users who have access to standard features on the platform.
          </p>

          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm bg-white">
            <table className="min-w-full w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">Username</th>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  {authUser?.is_superuser && <th className="border border-gray-300 px-5 py-4 text-center text-sm font-medium text-gray-600">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {normalUsers.length === 0 ? (
                  <tr>
                    <td colSpan={authUser?.is_superuser ? 5 : 4} className="text-center py-8 text-gray-500 italic">
                      No regular users found.
                    </td>
                  </tr>
                ) : (
                  normalUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="border border-gray-300 px-5 py-3 text-sm text-gray-700">{user.id}</td>
                      <td className="border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900">{user.username}</td>
                      <td className="border border-gray-300 px-5 py-3 text-sm text-gray-700 break-words max-w-xs">{user.email}</td>
                      <td className="border border-gray-300 px-5 py-3 text-sm">
                        {user.is_blocked ? (
                          <span className="text-red-600 font-semibold">Blocked</span>
                        ) : (
                          <span className="text-green-600 font-semibold">Active</span>
                        )}
                      </td>
                      {authUser?.is_superuser && (
                        <td className="border border-gray-300 px-5 py-3 text-center">
                          {!user.is_blocked && (
                            <button
                              onClick={() => handleBlockUser(user.id)}
                              className="bg-red-600 text-white text-sm px-4 py-1 rounded-md hover:bg-red-700 transition"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Agents section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">Agents</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Agents have extended privileges and access to specialized features on the platform.
          </p>

          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm bg-white">
            <table className="min-w-full w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">Username</th>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="border border-gray-300 px-5 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  {authUser?.is_superuser && <th className="border border-gray-300 px-5 py-4 text-center text-sm font-medium text-gray-600">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {agents.length === 0 ? (
                  <tr>
                    <td colSpan={authUser?.is_superuser ? 5 : 4} className="text-center py-8 text-gray-500 italic">
                      No agents found.
                    </td>
                  </tr>
                ) : (
                  agents.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="border border-gray-300 px-5 py-3 text-sm text-gray-700">{user.id}</td>
                      <td className="border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900">{user.username}</td>
                      <td className="border border-gray-300 px-5 py-3 text-sm text-gray-700 break-words max-w-xs">{user.email}</td>
                      <td className="border border-gray-300 px-5 py-3 text-sm">
                        {user.is_blocked ? (
                          <span className="text-red-600 font-semibold">Blocked</span>
                        ) : (
                          <span className="text-green-600 font-semibold">Active</span>
                        )}
                      </td>
                      {authUser?.is_superuser && (
                        <td className="border border-gray-300 px-5 py-3 text-center">
                          {!user.is_blocked && (
                            <button
                              onClick={() => handleBlockUser(user.id)}
                              className="bg-red-600 text-white text-sm px-4 py-1 rounded-md hover:bg-red-700 transition"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default UsersPage;
