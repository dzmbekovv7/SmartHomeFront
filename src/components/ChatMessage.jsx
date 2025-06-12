import { motion } from "framer-motion";

export default function ChatMessage({ message, isUser, darkMode }) {
  // Анимация появления
  const variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      className={`
        max-w-[75%] px-6 py-4 rounded-3xl shadow-lg
        break-words whitespace-pre-wrap
        relative select-text
        ${isUser
          ? `
            self-end
            bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
            text-white
            rounded-br-none
            hover:brightness-110 transition
          `
          : `
            self-start
            bg-gray-200 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            rounded-bl-none
            border border-gray-300 dark:border-gray-700
          `
        }
      `}
      style={{ wordBreak: "break-word" }}
    >
      {/* "Хвостик" облака */}
      <span
        className={`
          absolute bottom-0
          w-4 h-4 bg-inherit
          ${isUser
            ? "right-0 rounded-br-none translate-x-1/2 shadow-md"
            : "left-0 rounded-bl-none -translate-x-1/2 shadow-md"
          }
          rotate-45
        `}
        style={{ bottom: -8 }}
      />

      {message.text}

      {/* Если есть картинка от бота */}
      {message.image && !isUser && (
        <img
            src={`http://localhost:8000${message.image}`}
          alt="bot reply"
          className="mt-4 rounded-xl max-w-full shadow-xl border border-gray-300 dark:border-gray-700"
          loading="lazy"
          draggable={false}
        />
      )}
    </motion.div>
  );
}
