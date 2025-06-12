import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu as MenuIcon, PlusCircle, Edit, Save, X, Search, Send } from "lucide-react";
import ChatMessage from "../components/ChatMessage";
import { axiosInstance } from "../lib/axios";
import ChartComponent from "../components/ChartComponent";
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

  const fetchChats = async () => {
    const res = await axiosInstance.get("/chats/");
    setChats(res.data);
    if (res.data.length > 0) setSelectedChatId(res.data[0].id);
  };
const [loading, setLoading] = useState(false);

  const fetchMessages = async (chatId) => {
    const res = await axiosInstance.get(`/chats/${chatId}/messages/`);
    setMessages(res.data);
  };
  // useEffect(() => {
  //   if (selectedChatId) {
  //     fetchMessages(selectedChatId);
  //   }
  // }, [selectedChatId]);

const sendMessage = async () => {
  if (!input.trim() || !selectedChatId) return;

  const userMessage = { text: input, is_user: true };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true); // Show loader

  try {
    const res = await axiosInstance.post(`/chats/${selectedChatId}/send/`, {
      text: input,
    });

    const botMessage = {
      text: res.data.bot_reply,
      is_user: false,
      image: res.data.image_url || null,
    };

    // ⏱ Delay the bot response for 1.5s to simulate thinking
    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false); // Hide loader AFTER showing the real message
    }, 500);

  } catch (err) {
    console.error("Ошибка:", err);
    setLoading(false);
  }
};



  const createChat = async () => {
    const res = await axiosInstance.post("/chats/create/");
    await fetchChats();
    setSelectedChatId(res.data.chat_id);
    setMessages([]);
  };

  const renameChat = async (chatId, newName) => {
    await axiosInstance.post(`/chats/${chatId}/rename/`, { name: newName });
    await fetchChats();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) fetchMessages(selectedChatId);
  }, [selectedChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <div
      className={`flex h-screen transition-colors duration-700 ease-in-out font-sans
        ${darkMode ? "bg-gradient-to-b from-gray-900 via-black to-black text-gray-100" : "bg-gradient-to-b from-blue-100 via-white to-gray-200 text-gray-900"}
        relative overflow-hidden`}
    >
      {/* Starry Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(3px 3px at 50% 70%, white, transparent), radial-gradient(1px 1px at 80% 40%, white, transparent)",
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
            opacity: darkMode ? 0.15 : 0.05,
          }}
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`z-50 overflow-hidden shadow-2xl transition-width duration-500 ease-in-out
          ${menuOpen ? "w-80" : "w-0 md:w-80"}
          ${darkMode ? "bg-gray-900 border-r border-gray-700" : "bg-white border-r border-gray-300"}
          flex flex-col relative`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700 dark:border-gray-600 select-none">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            ArsenBot
          </motion.h1>
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode((prev) => !prev)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition
              ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition
              ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
              aria-label="Toggle Menu"
              title="Toggle Menu"
            >
              <MenuIcon size={20} />
            </motion.button>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createChat}
            className="mb-5 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg
            hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-transform duration-150 ease-in-out"
            aria-label="Create New Chat"
          >
            <PlusCircle size={20} /> Новый чат
          </motion.button>

          <div className="relative">
            <Search
              size={20}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-3xl border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              transition
              ${darkMode
                ? "bg-gray-800 border-gray-600 text-gray-300 placeholder-gray-500"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600"}`}
              aria-label="Search chats"
            />
          </div>

          <motion.div
            layout
            className="mt-5 flex flex-col gap-3 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
          >
            {chats
              .filter((chat) =>
                chat.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((chat) => (
                <motion.div
                  layout
                  key={chat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center justify-between px-6 py-3 rounded-3xl shadow-lg cursor-pointer
                    ${
                      chat.id === selectedChatId
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "bg-white text-gray-800 hover:bg-purple-100"
                    } transition-colors duration-300 ease-in-out select-none`}
                >
                  {editingChatId === chat.id ? (
                    <input
                      className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold
                      ${
                        darkMode
                          ? "bg-gray-700 border border-purple-600 text-white placeholder-purple-400"
                          : "bg-gray-100 border border-purple-400 text-gray-900 placeholder-purple-600"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
                      aria-label="Edit chat name"
                    />
                  ) : (
                    <button
                      onClick={() => setSelectedChatId(chat.id)}
                      className="flex-1 truncate text-left font-semibold focus:outline-none"
                      disabled={editingChatId !== null}
                      title={`Select chat: ${chat.name}`}
                    >
                      {chat.name}
                    </button>
                  )}

                  {editingChatId === chat.id ? (
                    <div className="flex gap-3 ml-4 text-white">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          renameChat(chat.id, newChatName);
                          setEditingChatId(null);
                        }}
                        aria-label="Save chat name"
                        title="Сохранить"
                        className="text-green-400 hover:text-green-500"
                      >
                        <Save size={18} />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingChatId(null)}
                        aria-label="Cancel edit"
                        title="Отмена"
                        className="text-red-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditingChatId(chat.id);
                        setNewChatName(chat.name);
                      }}
                      aria-label="Edit chat name"
                      title="Редактировать название"
                      className={`ml-4 text-purple-400 hover:text-purple-600
                      ${editingChatId !== null ? "pointer-events-none opacity-50" : ""}`}
                      disabled={editingChatId !== null}
                    >
                      <Edit size={18} />
                    </motion.button>
                  )}
                </motion.div>
              ))}
          </motion.div>
        </div>
      </aside>

    <main
  className={`flex flex-col flex-grow relative overflow-hidden items-center
    ${darkMode
      ? "bg-gradient-to-b from-gray-800 to-gray-900"
      : "bg-gradient-to-b from-white to-gray-100"
    }`}
>
      <div className="w-full max-w-5xl flex flex-col flex-grow p-6 gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent" style={{ overscrollBehavior: "contain" }}>
    <AnimatePresence initial={false}>
 {messages.map((msg, index) => (
  <div key={index}>
    <ChatMessage
      message={msg}
      isUser={msg.is_user}
      darkMode={darkMode}
    />
    {msg.type === "chart" && (
      <ChartComponent data={msg.chartData} />
    )}
  </div>
))}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="self-start flex items-center gap-2 p-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-3xl shadow-md"
        >
          <div className="dot-flashing" />
          <span>Bot is thinking...</span>
        </motion.div>
      )}
    </AnimatePresence>
    <div ref={messagesEndRef} />
  </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className={`flex items-center gap-4 p-4 border-t
            ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}
        >
          <input
            type="text"
            placeholder="Напишите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-grow rounded-3xl py-3 px-5 text-lg
              ${
                darkMode
                  ? "bg-gray-800 placeholder-gray-400 text-gray-100 focus:ring-2 focus:ring-purple-500"
                  : "bg-gray-100 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-purple-500"
              }
              border border-transparent focus:border-purple-500 transition`}
            aria-label="Message input"
          />
          <motion.button
            type="submit"
            disabled={!input.trim()}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full text-white
              ${
                input.trim()
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }
              transition-colors duration-200`}
            aria-label="Send message"
          >
            <Send size={24} />
          </motion.button>
        </form>
      </main>
    </div>
  );
}
