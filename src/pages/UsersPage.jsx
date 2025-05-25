import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

const UsersPage = () => {
  const { authUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get("http://localhost:8000/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка при загрузке пользователей");
        setLoading(false);
      });
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await axiosInstance.post(`http://localhost:8000/users/block/${userId}/`);
      setUsers(users.map(u => u.id === userId ? { ...u, is_blocked: true } : u));
    } catch {
      alert("Не удалось заблокировать пользователя");
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Загрузка...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  const normalUsers = users.filter(u => !u.is_superuser && !u.is_agent);
  const agents = users.filter(u => !u.is_superuser && u.is_agent);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-12">
      {/* Стилизация заголовков */}
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Пользователи</h1>

      {/* Таблица обычных пользователей */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Обычные пользователи</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="min-w-[600px] w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">Имя</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">Статус</th>
                {authUser?.is_superuser && <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-600">Действия</th>}
              </tr>
            </thead>
            <tbody>
              {normalUsers.length === 0 ? (
                <tr>
                  <td colSpan={authUser?.is_superuser ? 5 : 4} className="text-center py-6 text-gray-500">
                    Пользователей нет
                  </td>
                </tr>
              ) : (
                normalUsers.map(user => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 break-words max-w-xs">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {user.is_blocked ? (
                        <span className="text-red-600 font-semibold">Заблокирован</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Активен</span>
                      )}
                    </td>
                    {authUser?.is_superuser && (
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {!user.is_blocked && (
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 transition"
                          >
                            Заблокировать
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

      {/* Таблица агентов */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Агенты</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="min-w-[600px] w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">Имя</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium text-gray-600">Статус</th>
                {authUser?.is_superuser && <th className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-600">Действия</th>}
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 ? (
                <tr>
                  <td colSpan={authUser?.is_superuser ? 5 : 4} className="text-center py-6 text-gray-500">
                    Агентов нет
                  </td>
                </tr>
              ) : (
                agents.map(user => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 break-words max-w-xs">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {user.is_blocked ? (
                        <span className="text-red-600 font-semibold">Заблокирован</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Активен</span>
                      )}
                    </td>
                    {authUser?.is_superuser && (
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {!user.is_blocked && (
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 transition"
                          >
                            Заблокировать
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
  );
};

export default UsersPage;
