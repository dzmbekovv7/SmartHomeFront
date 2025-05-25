import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  updateUserLastMessageTime: (userId) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user._id === userId
          ? { ...user, lastMessageTime: new Date().toISOString() }
          : user
      );
      updatedUsers.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
      return { users: updatedUsers };
    });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      const usersWithUnread = res.data.map(user => ({
        ...user,
        hasUnread: user.hasUnread || false
      }));
      set({ users: usersWithUnread });
    } catch (error) {
      toast.error(error.response?.data?.message || "Ошибка при загрузке пользователей");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Ошибка при загрузке сообщений");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, updateUserLastMessageTime } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
      updateUserLastMessageTime(selectedUser._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Ошибка при отправке сообщения");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) {
      console.warn("Socket is null in subscribeToMessages");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages, users } = get();
      const isFromCurrentChat = newMessage.senderId === selectedUser?._id;

      set({ messages: isFromCurrentChat ? [...messages, newMessage] : messages });

      const updatedUsers = users.map(user =>
        user._id === newMessage.senderId
          ? { ...user, hasUnread: !isFromCurrentChat }
          : user
      );
      set({ users: updatedUsers });
    });

    socket.on("messageRead", (messageId) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg
        )
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("messageRead");
  },

  setSelectedUser: (selectedUser) => {
    const users = get().users;
    const updatedUsers = users.map(user =>
      user._id === selectedUser._id ? { ...user, hasUnread: false } : user
    );
    set({ selectedUser, users: updatedUsers });
  }
}));
