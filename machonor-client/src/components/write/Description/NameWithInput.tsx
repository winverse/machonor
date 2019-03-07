import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  width: 100%;
  & + & {
    margin-top: 2rem;
  }
`;

const Name = styled.div`
  font-size: 1.15rem;
  font-weight: 600;

`;

const Input = styled.input`
  margin-top: 0.8rem;
  border-radius: 5px;
  outline: none;
  letter-spacing: 0px;
  max-width: 400px;
  border: 2px solid ${oc.red[3]};
  &:focus {
    border: 2px solid rgba(230, 0, 19, 0.949);
  }

  &::placeholder {
    color: ${oc.gray[4]};
    font-size: 0.9rem;
  }
`;

interface IProps {
  title: string;
  name: string;
  placeholder: string;
  onChange(e: any): void;
}

const NameWithInput: React.SFC<IProps> = ({ title, name, placeholder, onChange }) => (
  <Wrapper className="NameWithInput">
    <Name>{title}</Name>
    <Input name={name} placeholder={placeholder} onChange={onChange}/>
  </Wrapper>
);

export default NameWithInput;