import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const IsInput = styled.input`
  flex: 1;
  padding-left: 0.5rem;
  outline: none;
  border: 1px solid ${oc.gray[5]};
  border-radius: 5px;
  &::placeholder {
    color: ${oc.gray[4]};
    font-size: 0.875rem;
  }
  &:focus {
    border-color: ${oc.red[5]};
  }
  & + & {
    margin-left: 1rem;
  }
`;

interface IProps {
  value: any;
  placeholder: string;
  name: string;
  onChange(e: any): void;
  type: string;
}

const Input: React.SFC<IProps> = ({ value, placeholder, onChange, type, name }) => (
  <IsInput 
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    type={type}
    name={name}
  />
);

export default Input;