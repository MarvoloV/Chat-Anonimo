/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiFillEyeInvisible } from 'react-icons/ai';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import useBroadcastChannel from '../utils/useBroadcastChannel';
import { getChat } from '../store/actions/chatAction';
import { findUserinListUsers } from '../store/actions/userAction';
import { addedMessage, hiddendMessage } from '../utils/messageServices';
import { Button, Input, Title, Container } from '../components/Components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;
const ChatUser = styled.p`
  font-size: 25px;
  text-align: right;
  padding: 25px;
  cursor: pointer;
`;
const ChatFriend = styled.p`
  font-size: 25px;
`;
const ContainerFriend = styled.div`
  padding: 25px;
  margin: 10px 0px;
`;

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
    <Container>
      <SideBar />
      <ChatContainer>
        <div>
          <Title>
            {chat.category
              ? `chat Grupal ${chat.name}`
              : `chat con: ${friend.nickname}`}
          </Title>
          <div>
            {messages.map((message) => {
              if (message.user === user.nickname && message.hidden === true) {
                return '';
              }
              if (message.user === user.nickname) {
                return (
                  <div key={message.id}>
                    <ChatUser onClick={() => hiddenMessage(message.id)}>
                      {`${message.text} `}
                      <AiFillEyeInvisible />
                    </ChatUser>
                  </div>
                );
              }
              return (
                <ContainerFriend key={message.id}>
                  <ChatFriend>{`${message.user} : ${message.text}`}</ChatFriend>
                </ContainerFriend>
              );
            })}
          </div>
        </div>
        <div>
          <form onSubmit={handleSend}>
            <Input
              type="text"
              placeholder="Escribir Mensaje"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button type="submit">Enviar Mensaje</Button>
          </form>
        </div>
      </ChatContainer>
    </Container>
  );
};

export default ChatPage;
