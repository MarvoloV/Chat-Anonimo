/* eslint-disable no-undef */
import {
  ADD_CHAT,
  LOAD_CHAT,
  UPDATE_CHAT,
  UPDATE_CHATS,
} from '../types/chatTypes';

const initialState = {
  chat: [],
  chats: JSON.parse(window.localStorage.getItem('chats')) || [],
};
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT:
      return { ...state, chat: [...state.chat, action.payload] };
    case LOAD_CHAT:
      return state;
    case UPDATE_CHAT: {
      const newChats = state.chat.map((el) => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
      return { ...state, chat: newChats };
    }
    case UPDATE_CHATS:
      return state;
    default:
      return state;
  }
};

export default chatReducer;
/* {
    id: uuid(),
    users: [],
    messages: [],
    tipo,
    category,
  } */
