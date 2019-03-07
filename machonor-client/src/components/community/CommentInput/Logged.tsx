import * as React from 'react';
import styled from 'styled-components';
import { IoIosAt } from 'react-icons/io';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import { ILoggedInfo } from 'store/modules/user';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const Username = styled(Link)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${oc.gray[7]};
  font-size: 0.85rem;
`;

const Input = styled.input`
  flex: 1;
  padding-left: 0.5rem;
  outline: none;
  background-color: white;
  border: 1px solid #dee2e6;
  &::placeholder {
    color: ${oc.gray[4]};
    letter-spacing: -1px;
    font-size: 0.8rem;
    @media ${media.xxMobile} {
      font-size: 0.7rem;
    }
  }
  &:focus {
    border-color: #dee2e6;
  }
  & + & {
    margin-left: 1rem;
  }
`;

interface IProps {
  logged: boolean;
  loggedInfo: ILoggedInfo;
  displayname: string;
  password: string;
  onChange(e: any): void;
}

const Logged: React.SFC<IProps> = ({ 
  logged, 
  loggedInfo,
  displayname,
  password, 
  onChange,
}) => {
  if (!logged) {
    return (
      <Positioner>
        <Input 
          name="displayname" 
          placeholder="닉네임"
          type="text"
          value={displayname}
          onChange={onChange}
        />
        <Input 
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={onChange}
        />
      </Positioner>
    );
  }
  return (
    <Positioner className="Logged">
      <Username to={`/@${loggedInfo.displayname}`}>
        <IoIosAt />
        {loggedInfo.displayname}
      </Username>
    </Positioner>
  );
};

export default Logged;