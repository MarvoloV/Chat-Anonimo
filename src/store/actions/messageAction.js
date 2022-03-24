/* eslint-disable no-unused-vars */
import uuid from 'react-uuid';
import { ADD_MESSAGE, HIDDEN_MESSAGE } from '../types/messageTypes';
import { getChat } from './chatAction';

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});
const HiddeMessage = (message) => ({
  type: HIDDEN_MESSAGE,
  payload: message,
});
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
