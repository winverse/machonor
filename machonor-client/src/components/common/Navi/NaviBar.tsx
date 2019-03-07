import * as React from 'react';
import styled, { css } from 'styled-components';
import { FaAmazon, FaApple, FaFoursquare, FaCodepen, FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { media } from 'styles/styleUtils';
import ICon, { Wrapper as IconWrapper } from './ICon';
import NaviBuying from './NaviBuying';

interface IStyled {
  scrollTop: number;
}

const Wrapper = styled.div`
  background-color: #E70D1E;
  position: absolute;
  top: 0;
  bottom: -10px;
  width: 50px;
  z-index: 200;
  @media ${media.xxMobile} {
    width: 32px;
  }
`;

const DesktopContents = styled.div`
  ${(props: IStyled) => { 
    return css`
      position: fixed;
      top: 0;
      left: auto;
      bottom: 0;
      padding-top: 10rem;
      color: white;
      font-size: 1.7rem;
      width: 50px;
      svg {
        width: 100%;
        margin-top: 3rem;
        &:first-child {
          margin-top: 0;
        }
        &:hover {
        cursor: pointer;
        }
      }
      @media ${media.xxMobile} {
        display: none;
      }
    `;
  }}
`;

const MobileContents = styled.div`
  position: fixed;
  display: none;
  user-select: none;
  width: 32px;
  height: 100vh;
  @media ${media.xxMobile} {
    display: block;
  }
`;

const Menu = styled(FaBars)`
  font-size: 1.5rem;
  border: 1px solid white;
  border-radius: 3px;
`;

const Exit = styled(IoMdClose)`
  padding: 0 auto !important;
  /* padding-top: 2rem;
  padding-bottom: 3rem; */
`;

interface IProps {
  visible: boolean | null;
  scrollTop: number;
  pathname: string;
  offsetTop: any;
  onControlNav(): void;
  onReduceNav(): void;
}

const NaviBar: React.SFC<IProps> = ({ 
  visible, 
  onControlNav, 
  scrollTop, 
  pathname, 
  offsetTop,
  onReduceNav,
}) => (
  <Wrapper className="NaviBar">
    <DesktopContents scrollTop={scrollTop}>
      <FaAmazon/>
      <FaApple/>
      <FaCodepen />
      <FaFoursquare />
    </DesktopContents>
    {/* 모바일 전용 */}
    <MobileContents>
      {visible === true ? <IconWrapper><Exit onClick={onControlNav}/></IconWrapper> : <IconWrapper><Menu onClick={onControlNav}/></IconWrapper>}
      <ICon
        type="arrow"
        text=""
        onClick={onReduceNav}
      />
      <ICon
        type="buying"
        text="구매"
      />
      <ICon
        type="judging"
        text="심사"
      />
      <ICon 
        type="completed"
        text="완료"
      />
      <ICon 
        type="proposal"
        text="제안"
      />
      <NaviBuying
        offsetTop={offsetTop}
        pathname={pathname}
      />
    </MobileContents>
  </Wrapper>
);

export default NaviBar;