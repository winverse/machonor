import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { IoIosAt } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import defaultImage from 'static/image/default_thumbnail1.png';
import oc from 'open-color';

import PostMenu from './PostMenu';

interface IStyled {
  unDisplay?: any;
  inactive?: string;
}
const Positioner = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 35px;
`;

const ImageWrapper = styled(Link)`
  ${(props: IStyled) => {
    return css`
      ${props.inactive === 'true' ? css`pointer-events: none;` : ''}
    `;
  }}
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: contain;
`;

const NameMeta = styled(Link)`
  ${(props: IStyled) => {
    return css`
      ${props.inactive === 'true' ? css`pointer-events: none;` : ''}
    `;
  }}
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  margin-top: 0.175rem;
`;

const Displayname = styled.div`
  display: flex;
  align-items: center;
  color: ${oc.gray[8]};
  font-size: 0.9rem;
  flex: 1;
  letter-spacing: -1px;
  svg {
    margin-top: 0.175rem;
    margin-right: -0.125rem;
  }
`;

const MenuOption = styled(MdMoreHoriz)`
  margin-left: auto;
  cursor: pointer;
  font-size: 1.2rem;
`;

const ShortBio = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.unDisplay === false ? css`display: none;` : css`display: flex;`};
      color: ${oc.gray[6]};
      font-size: 0.6rem;
      flex: 1;
      margin-top: 0.25rem;
      letter-spacing: 0px;
      justify-content: flex-end;
    `;
  }};
`;

interface IProps {
  displayname: string;
  thumbnail: string;
  shortBio: string;
  ipAddress: string;
  anonymous: boolean;
  visible: boolean;
  isOwn: boolean;
  showMenu(): void;
  onEdit(): void;
  onRemove(): void;
}

const PostHead: React.SFC<IProps> = ({
  displayname,
  thumbnail,
  shortBio,
  ipAddress,
  anonymous,
  showMenu,
  visible,
  isOwn,
  onEdit,
  onRemove,
}) => {
  const unDisplay = shortBio || (anonymous === true ? ipAddress : null);
  return (
    <Positioner className="PostHead">
      <ImageWrapper to={`/@${displayname}`} inactive={anonymous.toString()}>
        <Img src={thumbnail || defaultImage} alt="thumbnail"/>
      </ImageWrapper>
      <NameMeta to={`/@${displayname}`} inactive={anonymous.toString()}>
        <Displayname><IoIosAt />{displayname}</Displayname>
        <ShortBio unDisplay={unDisplay}>{shortBio || (anonymous === true ? `(${ipAddress})` : null)}</ShortBio>
      </NameMeta>
      {
        isOwn &&
        <React.Fragment>
          <MenuOption onClick={showMenu}/>
          <PostMenu 
            visible={visible} 
            onEdit={onEdit}
            onRemove={onRemove}
          />
        </React.Fragment>
      }
    </Positioner>
  );
};

export default PostHead;