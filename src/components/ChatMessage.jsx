export default function ChatMessage({ message, isUser, darkMode }) {
  return (
    <div className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          isUser
            ? darkMode
              ? "bg-blue-700 text-white"
              : "bg-blue-300 text-black"
            : darkMode
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-300 text-gray-800"
        }`}
      >
        {message.image && (
          <img
            src={`http://localhost:8000${message.image}`}
            alt="bot"
            className="mb-2 max-w-full rounded"
          />
        )}
        <p>{message.text}</p>
      </div>
    </div>
  );
}
