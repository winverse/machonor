import * as React from 'react';
import styled, { css } from 'styled-components';
import { fromNow } from 'lib/common';
import { Date, Likes, TitleWrapper, ViewCount } from './BoardTop';
import { Link } from 'react-router-dom';

import oc from 'open-color';
import { media } from 'styles/styleUtils';

interface IStyled {
  active?: boolean;
  anonymous?: any;
}

const ListWrapper = styled.div`
  width: 100%;
`;

const BoardItemWrapper = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.active && css`
      background-color: ${oc.red[0]};
      `}
    `;
  }}
  display: flex;
  align-items: center;
  height: 43px;
  border-bottom: 1px solid ${oc.gray[3]};
  div {
    text-align: center;
    font-size: 0.8rem;
  }
  @media ${media.xxMobile} {
    height: 50px;
  }
`;

const LikesText = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: rgba(230, 0, 19, 0.949);
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 0.8rem;
  padding-left: 0.1rem;
  padding-right: 0.2rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  min-width: 21px;
`;

const Writer = styled(Link)`
  ${(props: IStyled) => {
    return css`
      ${props.anonymous && css`color: ${oc.gray[6]};`};
    `;
  }}
  flex: 2;
  font-size: 0.8rem;
  text-align: center;
  @media ${media.xxMobile} {
    display: none;
  }
`;

const TitleWithCount = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled(Link)`
  display: inline-block;
  text-align: left !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  color: #2b2b2b;
  max-width: 420px;
  cursor: pointer;
  font-size: 13px;
  font-family: "돋움",Dotum,sans-serif,Arial;
  letter-spacing: -1.5px;
  &:visited {
    color: ${oc.gray[4]};
  }
  @media ${media.xxMobile} {
    font-size: 0.8rem;
    max-width: 250px;
    line-height: 1rem;
    padding-top: 0.5rem;
  }
`;

const CommentCount = styled.span`
  color: rgba(230, 0, 19, 0.949);
  font-weight: 600;
  margin-left: 0.5rem;
  letter-spacing: -1px;
  @media ${media.xxMobile} {
    padding-top: 0.5rem;
  }
`;

const DetailWrapper = styled.div`
  display: none;
  width: 100%;
  flex-flow: row nowrap;
  margin-top: 0.25rem;
  color: ${oc.gray[8]};
  font-size: 5px !important;
  font-weight: 300 !important;
  letter-spacing: 0px;
  .name {

  }
  .time {
    margin-left: 0.5rem;
  }
  .views {
    margin-left: 0.5rem;
    span {
      margin-left: 0.5rem;
    }
  }
  @media ${media.xxMobile} {
    display: flex;
  }
`;

const NotFound = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${oc.gray[5]};
  letter-spacing: 0px;
`;

interface IProps {
  isNotice: boolean;
  title: string;
  list: any[];
}

const BoardList: React.SFC<IProps> = ({ list, title, isNotice }) => {
  const List = list && list.map((data) => {
    return (
      <BoardItemWrapper key={data.id} active={title === data.title}>
        <Likes isNotice={isNotice}>
          <LikesText>{data.likesCount}</LikesText>
        </Likes>
        <TitleWrapper>
          <TitleWithCount>
            <Title to={isNotice ? `/community/notice/${data.urlSlug}` : `/community/free/${data.urlSlug}`}>{data.title}</Title>
            {isNotice ? null : <CommentCount>[{data.commentsCount}]</CommentCount>}
          </TitleWithCount>
          <DetailWrapper>
            <div className="name">{data.displayname}</div>
            <div className="time">{fromNow(data.createdAt)}</div>
            <div className="views">조회수<span>{data.totalViews}</span></div>
          </DetailWrapper>
        </TitleWrapper>
        <Writer to={`/@${data.displayname}`} anonymous={data.anonymous ? 1 : 0}>{data.displayname}</Writer>
        <Date>{fromNow(data.createdAt)}</Date>
        <ViewCount>{data.totalViews}</ViewCount>
      </BoardItemWrapper> 
    );
  });
  return (
    <ListWrapper className="BoardList">
      {List}
      {(List && List.length === 0) && <NotFound>검색된 글이 없습니다.</NotFound>}
    </ListWrapper>
  );
};

export default BoardList;