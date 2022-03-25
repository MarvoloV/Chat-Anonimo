import uuid from 'react-uuid';
import { getChat } from '../store/actions/chatAction';

export const addedMessage = (uuidChat, message, nickname) => {
  const tmpmessage = {
    id: uuid(),
    text: message,
    date: new Date().toISOString(),
    user: nickname,
  };

  const chat = getChat(uuidChat);
  if (chat) {
    const { messages } = chat;
    messages.push(tmpmessage);
    chat.messages = messages;
    localStorage.setItem(chat.id, JSON.stringify(chat));
  }

  return tmpmessage;
};
export const hiddendMessage = (uuidChat, uuidMessage) => {
  const chat = getChat(uuidChat);
  const messages = chat.messages ? chat.messages : [];
  const index = messages.findIndex((msg) => msg.id === uuidMessage);
  chat.messages[index].hidden = true;
  localStorage.setItem(chat.id, JSON.stringify(chat));
  return chat.messages;
};
