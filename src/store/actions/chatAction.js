/* eslint-disable operator-linebreak */
import { ADD_CHAT, UPDATE_CHAT } from '../types/chatTypes';

const addChat = (chat) => ({
  type: ADD_CHAT,
  payload: chat,
});
const updateChat = (chat) => ({
  type: UPDATE_CHAT,
  payload: chat,
});
export const getChats = () => {
  const chats = JSON.parse(localStorage.getItem('chats'));
  return chats;
};
export const getChat = (uuid) => {
  const chat = JSON.parse(localStorage.getItem(uuid));
  return chat;
};
const saveChatinListChat = (id) => {
  const chats = getChats() ? getChats() : [];
  chats.push(id);
  localStorage.setItem('chats', JSON.stringify(chats));
};
export const addedChat = (id, tipo, category = null) => {
  const chat = {
    id,
    users: [],
    messages: [],
    tipo,
    category,
  };
  localStorage.setItem(chat.id, JSON.stringify(chat));
  saveChatinListChat(chat.id);
  return addChat(chat);
};
export const addUserToChat = (uuidChat, uuidUser) => {
  const chat = JSON.parse(localStorage.getItem(uuidChat));
  const usersChat = chat.users;
  usersChat.push(uuidUser);
  chat.users = usersChat;
  localStorage.setItem(chat.id, JSON.stringify(chat));
  return updateChat(chat);
};
export const findChat = (idFriend, idUser) => {
  const chats = getChats();
  let chatId;

  if (!chats) {
    return null;
  }
  chats.forEach((element) => {
    const chat = getChat(element);
    if (
      chat.tipo === 'privado' &&
      chat.users.find((user) => user === idFriend) &&
      chat.users.find((user) => user === idUser)
    ) {
      chatId = chat.id;
    }
  });
  return chatId;
};
export const findChatsOfUser = (idUser, tipo = 'privado') => {
  const chats = getChats();
  if (!chats) {
    return null;
  }
  const chatPrivado = chats.map((idChat) => {
    const chat = getChat(idChat);
    if (chat.tipo === tipo && chat.users.find((user) => user === idUser)) {
      return chat;
    }
    return null;
  });
  return chatPrivado;
};
