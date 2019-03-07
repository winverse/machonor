import * as React from 'react';
import styled, { css } from 'styled-components';
import { shadow, media } from 'styles/styleUtils';
import { GoFile, GoOrganization, GoDiff } from 'react-icons/go';
import { IoIosPeople } from 'react-icons/io';
import oc from 'open-color';

interface IStyled {
  active?: boolean;
  visible?: boolean;
}

const Wrapper = styled.div`
  ${(props: IStyled) => {
    const active = css`
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.9);
    `;
    return css `
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      position: sticky;
      top: 0;
      width: 100%;
      margin-top: 2rem;
      background-color: white;
      ${props.active === true ? active : 'border-radius: 5px;'};
      ${shadow(1)};
      z-index: 99;
      opacity: 0.87;
      @media ${media.xxMobile} {
        position: static;
        ${props.visible === false ? css`position: sticky;` : ''};
      }
    `;
  }};
`;

const Nav = styled.ul`
  list-style: none;
  user-select: none;
  padding: 0;
  margin: 0;
  @media ${media.xxMobile} {
    display: flex;
    flex-flow: row nowrap;
  }
`;

const ItemWrapper = styled.li`
  position: relative;
  display: inline-flex;
  justify-content: center;
  flex-flow: row wrap;
  padding: 0rem 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: ${oc.gray[8]};
  svg {
    width: 100%;
  }
  &:hover {
    color: rgba(230, 0, 19, 0.949);
  }
  &:active {
    color: ${oc.red[7]};
  }
  & + & {
    border-left: 0.8px solid ${oc.gray[4]};
  }
  @media ${media.xxMobile} {
    font-size: 0.8rem;
  }
`;

const Item = styled.div`
  width: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0.5rem;
  @media ${media.xxMobile} {
    font-size: 0.7rem;
  }
`;

const Bar = styled.div`
  ${(props: IStyled) => {
    return css`
      display: none;
      position: absolute;
      background-color: rgba(230, 0, 19, 0.949);
      bottom: -0.5rem;
      height: 3px;
      width: 100%;
      border-radius: 1px;
      ${props.active && 'display: block;'}
    `;
  }};
`;

interface ITemsProps {
  text: string;
  value: string;
  bar: React.ReactNode;
  onScrollMove(e: any): void;
}

const providers = {
  buyer: {
    icon: IoIosPeople,
  },
  summary: {
    icon: GoFile,
  },
  withOZ: {
    icon: GoOrganization,
  },
  alike: {
    icon: GoDiff,
  },
};

const Items: React.SFC<ITemsProps> = ({
  text,
  bar,
  onScrollMove,
  value,
}) => {
  const { icon: Icon } = providers[value];
  return (
    <ItemWrapper onClick={onScrollMove} value={value}>
      <Icon />
      <Item>{text}</Item>
      {bar && bar}
    </ItemWrapper>
  );
};

interface IProps {
  navRef: React.RefObject<any>;
  active: boolean;
  buyerActive: boolean;
  summaryActive: boolean;
  withActive: boolean;
  alikeActive: boolean;
  navBarVisble: boolean;
  onScrollMove(e: any): void;
}

const PostMenu: React.SFC<IProps> = ({ 
  navBarVisble,
  navRef,
  active,
  alikeActive,
  buyerActive,
  summaryActive,
  withActive,
  onScrollMove,
}) => (
  <Wrapper className="PostMenu" ref={navRef} active={active} visible={navBarVisble}>
    <Nav>
      <Items
        text="구매자들"
        value="buyer"
        bar={<Bar active={buyerActive}/>}
        onScrollMove={onScrollMove}
      />
      <Items
        text="사건개요"
        value="summary"
        bar={<Bar active={summaryActive} />}
        onScrollMove={onScrollMove}
      />
      <Items
        text="함께하는 단체"
        value="withOZ"
        bar={<Bar active={withActive}/>}
        onScrollMove={onScrollMove}
      />
      <Items
        text="유사정의"
        value="alike"
        bar={<Bar active={alikeActive}/>}
        onScrollMove={onScrollMove}
      />
    </Nav>
  </Wrapper>
);

export default PostMenu;