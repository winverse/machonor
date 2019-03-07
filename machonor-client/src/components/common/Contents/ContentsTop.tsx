import * as React from 'react';
import styled from 'styled-components';
import { media } from 'styles/styleUtils';
import oc from 'open-color';
import { GoKebabHorizontal } from 'react-icons/go';

import { UserMenuContainer } from 'containers/Base';
import { ILoggedInfo } from 'store/modules/user';
const Wrapper = styled.div`
  width: 100%;
  padding-top: 3rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  @media ${media.Laptop} {
    padding-top: 0rem;
  }

  @media ${media.xxMobile} {
    
  }
`;

const AuthBox = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  flex-direction: row;

  @media ${media.xxMobile} {
    
  }
`;

const LoggedWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
`;

const Text = styled.div`
  color: #23242b;
  opacity: 0.8;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
`;

const LoggedSvg = styled(GoKebabHorizontal)`
  margin-left: 0.5rem;
  position: relative;
  cursor: pointer;
`;

const Border = styled.div`
  border-right: 1.2px solid ${oc.gray[7]};
  margin-left: 0.25rem;
  margin-right: 0.25rem;
`;

interface IProps {
  loggedInfo: ILoggedInfo;
  logged: boolean;
  onLogin(): void;
  onRegister(): void;
  onShowUserMenu(): void;
}

const ContentsTop: React.SFC<IProps> = ({
  loggedInfo,
  logged,
  onRegister,
  onLogin,
  onShowUserMenu,
}) => {
  const NotLogged = (
    <React.Fragment>
      <Text onClick={onLogin}>로그인</Text>
      <Border />
      <Text onClick={onRegister}>회원가입</Text>
    </React.Fragment>
  );
  const Logged = (
    <LoggedWrapper>
      <Text>{loggedInfo.displayname}님</Text>
      <LoggedSvg onClick={onShowUserMenu} />
      <UserMenuContainer />
    </LoggedWrapper>
  );
  return(
    <Wrapper className="ContentsTop">
      <AuthBox>
        {logged ? Logged : NotLogged}
      </AuthBox>
    </Wrapper>
  );
};

export default ContentsTop;