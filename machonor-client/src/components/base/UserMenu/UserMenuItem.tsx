import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { FaUserCircle, FaFileAlt, FaCog, FaPowerOff } from 'react-icons/fa';
// import { TiPower } from 'react-icons/ti';

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  color: #37474f;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  &:hover {
    background-color: ${oc.gray[0]};
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

const providers = {
  profile: {
    icon: FaUserCircle,
  },
  mypage: {
    icon: FaFileAlt,
  },
  config: {
    icon: FaCog,
  },
  logout: {
    icon: FaPowerOff,
  },
};

interface IProps {
  type: 'profile' | 'mypage' | 'logout' | 'config';
  onClick?(e: any): void;
  children: React.ReactNode;
}

const UserMenuItem: React.SFC<IProps> = ({ children, type, onClick }) => {
  const { icon: Icon } = providers[type];
  return (
    <MenuItem className="UserMenuItem" onClick={onClick}>
      <Icon />
      {children}
    </MenuItem>
  );
};

export default UserMenuItem;