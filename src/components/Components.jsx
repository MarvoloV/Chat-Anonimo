import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Input = styled.input`
  width: 50%;
  margin: 25px 30px;
  height: calc(2.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;
export const Button = styled.button`
  width: 400px;
  color: #fff;
  font-size: 1.5rem;
  height: calc(2.5em + 0.75rem + 2px);
  background-color: #23272b;
  border-color: #23272b;
  cursor: pointer;
  &:hover {
    background: blue;
  }
  &:disabled {
    background: #575757;
    cursor: default;
  }
`;
export const Title = styled.h2`
  font-size: 40px;
  background: yellow;
  padding: 5px;
  margin-bottom: 20px;
`;
export const ItemList = styled.li`
  font-size: 25px;
  padding: 25px;
  list-style: none;
  &:hover {
    background: green;
  }
  cursor: pointer;
`;
export const ChatContainer = styled.div`
  width: 90%;
`;
