import { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import { axiosInstance } from "../lib/axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newChatName, setNewChatName] = useState("");
  // Получение списка чатов
  const fetchChats = async () => {
    const res = await axiosInstance.get("/chats/");
    setChats(res.data);
    if (res.data.length > 0) setSelectedChatId(res.data[0].id);
  };

  // Получение сообщений выбранного чата
  const fetchMessages = async (chatId) => {
    const res = await axiosInstance.get(`/chats/${chatId}/messages/`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;

    const userMessage = { text: input, is_user: true };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axiosInstance.post(`/chats/${selectedChatId}/send/`, {
        text: input,
      });

      const botMessage = {
        text: res.data.bot_reply,
        is_user: false,
        image: res.data.image_url || null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Ошибка:", err);
    }

    setInput("");
  };

  const createChat = async () => {
    const res = await axiosInstance.post("/chats/create/");
    await fetchChats();
    setSelectedChatId(res.data.chat_id);
    setMessages([]); // новый чат — пусто
  };

  const renameChat = async (chatId, newName) => {
    await axiosInstance.post(`/chats/${chatId}/rename/`, { name: newName });
    await fetchChats();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }
  }, [selectedChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#121212] text-white" : "bg-[#f5f5f5] text-black"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          menuOpen ? "w-64" : "w-0 md:w-0"
        } overflow-hidden fixed md:static top-0 left-0 h-screen ${
          darkMode ? "bg-[#1e1e1e] border-gray-700" : "bg-[#cccccc] border-gray-300"
        } border-r z-50`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">SweetyBot</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`text-sm px-2 py-1 rounded ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`md:hidden px-2 py-1 rounded text-sm ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              ☰
            </button>
          </div>
        </div>

        <div className="p-2">
          <button
            onClick={createChat}
            className="w-full mb-2 py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            + Новый чат
          </button>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full mb-3 px-3 py-2 rounded-lg border ${
              darkMode
                ? "border-gray-600 bg-[#2a2a2a] text-white"
                : "border-gray-300 bg-white text-black"
            }`}
          />

          <div className="space-y-2">
          {chats
  .filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .map((chat) => (
    <div
      key={chat.id}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border mb-1 ${
        darkMode
          ? "border-gray-700 hover:bg-gray-800"
          : "border-gray-200 hover:bg-gray-100"
      } ${
        chat.id === selectedChatId ? "bg-blue-500 text-white" : ""
      }`}
    >
      {/* Левая часть: либо инпут для редактирования, либо название */}
      {editingChatId === chat.id ? (
        <input
          className={`flex-1 rounded px-2 py-1 mr-2 text-sm ${
            darkMode
              ? "bg-[#2a2a2a] border border-gray-600 text-white"
              : "bg-white border border-gray-300 text-black"
          }`}
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              renameChat(chat.id, newChatName);
              setEditingChatId(null);
            } else if (e.key === "Escape") {
              setEditingChatId(null);
            }
          }}
        />
      ) : (
        <button
          onClick={() => setSelectedChatId(chat.id)}
          className="flex-1 text-left truncate"
          disabled={editingChatId !== null}
        >
          {chat.name}
        </button>
      )}

      {/* Правая часть: кнопки */}
    {editingChatId === chat.id ? (
  <>
    <button
      onClick={() => {
        renameChat(chat.id, newChatName);
        setEditingChatId(null);
      }}
      className="text-green-500 px-2"
      title="Сохранить"
      aria-label="Сохранить"
    >
      ✔️
    </button>
    <button
      onClick={() => setEditingChatId(null)}
      className="text-red-500 px-2"
      title="Отмена"
      aria-label="Отмена"
    >
      ❌
    </button>
  </>
) : (
  <button
    onClick={() => {
      setEditingChatId(chat.id);
      setNewChatName(chat.name);
    }}
    disabled={editingChatId !== null}
    className={`text-gray-400 hover:text-gray-600 px-2 ${
      darkMode ? "hover:text-gray-300" : "hover:text-gray-700"
    }`}
    title="Переименовать чат"
  >
    ✏️
  </button>
)}
</div>
  ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col pt-4 px-4 md:px-10 overflow-hidden">
        <div className="flex justify-between items-center md:hidden mb-2">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`px-3 py-1 rounded ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            ☰ Меню
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto border rounded-xl p-4 shadow max-h-[calc(100vh-150px)] ${
            darkMode ? "bg-[#1e1e1e] border-gray-700" : "bg-[#e0e0e0] border-gray-300"
          }`}
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isUser={msg.is_user}
              darkMode={darkMode}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 ${
              darkMode
                ? "bg-[#2a2a2a] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            value={input}
            placeholder="Введите сообщение..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={sendMessage}
          >
            Отправить
          </button>
        </div>
      </main>
    </div>
  );
}
