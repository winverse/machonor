import * as React from 'react';
import styled, { css } from 'styled-components';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import oc from 'open-color';

interface IStyled {
  inVisible?: boolean;
  active?: boolean;
}

const Positioner = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 30px;
  justify-content: center;
`;

const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid ${oc.gray[3]};
`;

const ContentBox = styled.div`
  ${(props: IStyled) => {
    return css`
      ${props.inVisible && css`display: none;`};
      ${props.active && css`background-color: ${oc.gray[1]};`};
    `;
  }}
  text-align: center;
  padding: 0.5rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  cursor: pointer;
  font-size: 0.8rem;
  & + & {
    border-left: 1px solid ${oc.gray[3]};
  }
  svg {
    & + & {
      margin-left: -1rem;
    }
  }
`;

interface IProps {
  page: number;
  lastPage: number;
  onSetPage(e: any): void;
}

const PageNumber: React.SFC<IProps> = ({ onSetPage, page, lastPage }) => {
  const pageList = [];
  if (!lastPage) return null;
  if (lastPage > 5) {
    for (let i = page > 2 ? ((page + 2) >= lastPage ? lastPage - 4 :(page - 2)) : 1; i <= (page > 2 ? ((page + 2) >= lastPage ? lastPage : (page + 2)) : 5); i += 1) {
      const component = <ContentBox key={i} onClick={onSetPage} title={String(i)} active={page === i}>{i}</ContentBox>;
      pageList.push(component);
    }
  } else {
    for (let i = 1; i <= lastPage; i += 1) {
      const component = <ContentBox key={i} onClick={onSetPage} title={String(i)} active={page === i}>{i}</ContentBox>;
      pageList.push(component);
    }
  }
  return (
    <Positioner className="PageNumber">
      <Pagenation>
        <ContentBox onClick={onSetPage} title="1"><FaAngleDoubleLeft/></ContentBox>
        <ContentBox onClick={onSetPage} title={String(page - 1)} inVisible={page === 1}><FaAngleLeft/></ContentBox>
        {pageList}
        <ContentBox onClick={onSetPage} title={String(page + 1)} inVisible={page === lastPage}><FaAngleRight/></ContentBox>
        <ContentBox onClick={onSetPage} title={String(lastPage)}><FaAngleDoubleRight/></ContentBox>
      </Pagenation>
    </Positioner>
  );
};

export default PageNumber;