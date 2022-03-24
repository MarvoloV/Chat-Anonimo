/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardPage from './DashboardPage';
import useBroadcastChannel from '../utils/useBroadcastChannel';
import { getChat } from '../store/actions/chatAction';
import { findUserinListUsers } from '../store/actions/userAction';
import { addedMessage, hiddendMessage } from '../store/actions/messageAction';

const ChatPage = () => {
  const { chatid } = useParams();
  const chat = getChat(chatid);
  const broadCast = useBroadcastChannel(chatid);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState(chat.messages);
  const user = useSelector((state) => state.userReducer.user);
  const uuidFriend = chat.users.find((userF) => userF !== user.id);
  const friend = uuidFriend
    ? findUserinListUsers(uuidFriend)
    : { nickname: '' };
  const handleBroadcast = useCallback(
    (e) => {
      setMessages([...messages, e.data]);
    },
    [messages],
  );
  useEffect(() => {
    if (broadCast) {
      broadCast.onmessage = handleBroadcast;
    }
  }, [broadCast, handleBroadcast]);
  const handleSend = (e) => {
    e.preventDefault();
    const tmpmsg = addedMessage(chatid, msg, user.nickname);
    broadCast.postMessage(tmpmsg);
    setMessages([...messages, tmpmsg]);
    setMsg('');
  };
  const hiddenMessage = (idMessage) => {
    const message = hiddendMessage(chatid, idMessage);
    setMessages(message);
  };
  return (
    <div>
      <DashboardPage />
      <h1>
        {chat.category
          ? `chat ${chat.category}`
          : `chat con: ${friend.nickname}`}
      </h1>
      {messages.map((message) => {
        if (message.user === user.nickname && message.hidden === true) {
          return '';
        }
        if (message.user === user.nickname) {
          return (
            <div key={message.id}>
              <h1>{message.user}</h1>
              <h2 onClick={() => hiddenMessage(message.id)}>{message.text}</h2>
            </div>
          );
        }
        return (
          <div key={message.id}>
            <h1>{message.user}</h1>
            <h2>{message.text}</h2>
          </div>
        );
      })}
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Escribir Mensaje"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default ChatPage;
