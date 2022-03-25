/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkOption = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Li = styled.li`
  font-size: 25px;
  padding: 25px;
  list-style: none;
  &:hover {
    background: green;
  }
`;

const ListOptions = ({ title, source }) => (
  <LinkOption to={source}>
    <Li>{title}</Li>
  </LinkOption>
);

export default ListOptions;
