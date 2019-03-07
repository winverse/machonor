import * as React from 'react';
import styled from 'styled-components';
import { TiArrowBack, TiTrash } from 'react-icons/ti';
import oc from 'open-color';

const Positioner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  justify-content: flex-end;
  text-align: center;
  font-size: 0.875rem;
`;

const Cancel = styled.div`
  position: relative;
  padding: 0.5rem 0.875rem;
  padding-left: 2rem;
  background-color: ${oc.gray[8]};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.15s ease-in;
  user-select: none;
  &:hover {
    background-color: ${oc.gray[7]};
  }
  &:active {
    transform: translateY(2px);
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0.8rem;
    font-size: 1.25rem;
    transform: translateY(-50%);
  }
`;

const Confirm = styled.div`
  position: relative;
  margin-left: 0.5rem;
  padding: 0.5rem 0.875rem;
  padding-left: 2rem;
  background-color: Rgba(230, 0, 19, 0.949);
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.15s ease-in;
  user-select: none;
  &:hover {
    filter: brightness(120%);
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0.8rem;
    font-size: 1.25rem;
    transform: translateY(-50%);
  }
  &:active {
    transform: translateY(2px);
  }
`;

interface IProps {
  mode: string;
  onRemove(): void;
  onConfirm(): void;
}

const ModalButton: React.SFC<IProps> = ({
  mode,
  onConfirm,
  onRemove,
}) => (
  <Positioner className="ModalButton">
    <Cancel onClick={onRemove}>
      <TiArrowBack /> 
      취소
    </Cancel>
    <Confirm onClick={onConfirm}>
      <TiTrash /> 
      {mode === 'edit' ? '수정' : '삭제'}
    </Confirm>
  </Positioner>
);

export default ModalButton;