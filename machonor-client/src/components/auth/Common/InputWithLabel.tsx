import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;

  &:first-child{
    margin-top: 0;
  }
`;

const Label = styled.div`
  font-size: 1rem;
	color: ${oc.gray[8]};
  font-weight: 600;
  @media ${media.xxMobile} {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  margin-top: 1rem;
  border-radius: 5px;
  padding: 0.75rem 0.85rem;
  font-size: 1rem;
  border: 1px solid ${oc.red[5]};
  background-color: white;
  outline: none;
  &:focus {
    outline: none;
    border-color: ${oc.red[5]};
    box-shadow: 0 0 0 0.1rem Rgba(230, 0, 19, 0.549);    
  }

  &::placeholder {
    color: ${oc.gray[5]};
    font-size: 0.9rem;
  }

  @media ${media.xxMobile} {
    margin-top: 0.8rem;
    font-size: 0.9rem;
    padding: 0.55rem 0.5rem;
    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;

interface IProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange(e: any): void;
}

const InputWithLabel: React.SFC<IProps> = ({ 
  label, 
  placeholder,
  type,
  value,
  name,
  onChange,
}) => (
  <Wrapper className="InputWithLabel">
    <Label>{label}</Label>
    <Input 
      placeholder={placeholder} 
      type={type}
      value={value}
      name={name}
      onChange={onChange}
    />
  </Wrapper>
);

export default InputWithLabel;