import * as React from 'react';
import styled from 'styled-components';
import { shadow } from 'styles/styleUtils';
import { TiTrash, TiEdit } from 'react-icons/ti';
import oc from 'open-color';

const Positioner = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  position: absolute;
  right: -10px;
  top: 20px;
  color: #37474f;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  ${shadow(0)};
  svg {
    position: absolute;
    top: 50%;
    left: 0.375rem;
    transform: translateY(-50%);
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  width: 100%;
  padding: 0.55rem 0.5rem;
  padding-left: 1.5rem;
  background-color: white;
  &:hover {
    background-color: ${oc.gray[0]};
  }
  & + & {
    border-top: 1px solid ${oc.gray[2]};
  }
`;

interface IProps {
  visible: boolean;
  deleted: boolean;
  onEdit(): void;
  onRemove(): void;
}

const CommentMenu: React.SFC<IProps> = ({ deleted, visible, onEdit, onRemove }) => {
  if (!visible || deleted) return null;
  return (
    <Positioner className="CommentMenu">
      <Wrapper onClick={onEdit}><TiEdit />수정</Wrapper>
      <Wrapper onClick={onRemove}><TiTrash />삭제</Wrapper>
    </Positioner>
  );
};

export default CommentMenu;