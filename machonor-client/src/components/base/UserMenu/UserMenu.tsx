import * as React from 'react';
import styled from 'styled-components';

import oc from 'open-color';
import { shadow } from 'styles/styleUtils';

const Positioner = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  z-index: 200;
`;

const MenuWrapper = styled.div`
  background-color: white;
  min-width: 140px;
  ${shadow(0)};
  border-radius: 5px;
  border: 1px solid ${oc.gray[2]};
`;

interface IProps {
  children: React.ReactNode;
}

class UserMenu extends React.Component<IProps> {
  public render() {
    const { children } = this.props;
    return(
      <Positioner className="UserMenu">
        <MenuWrapper>
          {children}
        </MenuWrapper>
      </Positioner>
    );
  }
}

export default UserMenu;