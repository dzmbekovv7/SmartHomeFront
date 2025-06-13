import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { axiosInstance } from "../../lib/axios";

const AgentApplicationsPage = () => {
  const { authUser } = useAuthStore();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?.is_superuser) return;

    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get("/applications/");
        setApplications(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке заявок:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [authUser]);

  const handleApprove = async (id) => {
    try {
      await axiosInstance.post(`/applications/${id}/approve/`);
      setApplications((apps) => apps.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Ошибка при одобрении заявки:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.post(`/applications/${id}/reject/`);
      setApplications((apps) => apps.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Ошибка при отклонении заявки:", error);
    }
  };

  if (!authUser?.is_superuser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">Доступ запрещён</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Загрузка заявок...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Заявки на агентов</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-20">Нет новых заявок.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {[
                  "ID",
                  "ФИО",
                  "Телефон",
                  "Номер паспорта",
                  "Кем выдан",
                  "Дата выдачи",
                  "Дата рождения",
                  "Адрес",
                  "Доп. информация",
                  "Дата подачи",
                  "Статус",
                  "Действия",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b border-gray-300 px-4 py-3 text-left text-gray-700 text-sm font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr
                  key={app.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border px-4 py-2 whitespace-nowrap text-gray-700">{app.id}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{app.full_name}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{app.phone}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{app.passport_number}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{app.passport_issued_by}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{app.passport_issue_date}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{app.date_of_birth}</td>
                  <td className="border px-4 py-2 whitespace-nowrap max-w-xs truncate">{app.address}</td>
                  <td className="border px-4 py-2 whitespace-nowrap max-w-xs truncate">{app.additional_info || "-"}</td>
                  <td className="border px-4 py-2 whitespace-nowrap">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="border px-4 py-2 whitespace-nowrap capitalize">{app.status}</td>
                  <td className="border px-4 py-2 whitespace-nowrap space-x-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleApprove(app.id)}
                    >
                      Одобрить
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleReject(app.id)}
                    >
                      Отклонить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgentApplicationsPage;
