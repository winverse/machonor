import * as React from 'react';
import styled from 'styled-components';
import { FaBars, FaAngleDoubleRight } from 'react-icons/fa';
import { media } from 'styles/styleUtils';

const Positioner = styled.div`
  display: none;
  transition: all 0.5s cubic-bezier(0.49, 0.01, 0.14, 0.86);
  @media ${media.xxMobile} {
    display: inline-flex;
    position: absolute;
    bottom: 1rem;
    left: 0;
  }
`;

const IconWrapper = styled.div`
    font-size: 1.7rem;
    line-height: 1.7rem;
    border-radius: 5px;
    padding: 0.15rem;
    margin-left: 0.5rem;
`;

interface IProps {
  onShowNav(): void;
  onShowNavBar(): void;
}

const NaviBarControl: React.SFC<IProps> = ({
  onShowNav,
  onShowNavBar,
}) => (
  <Positioner className="NaviBarControl">
    <IconWrapper onClick={onShowNav}>
      <FaBars/>
    </IconWrapper>
    <IconWrapper onClick={onShowNavBar}>
      <FaAngleDoubleRight />
    </IconWrapper>
  </Positioner>
);

export default NaviBarControl;