import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IModule } from 'store/modules';

import styled from 'styled-components';

import {
  AsideWrapper,
  ContentsWrapper,
  NaviWrapper,
} from './Wrapper';

import { media } from 'styles/styleUtils';

const Wrapper = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  @media ${media.xxWide} {
    max-width: 1920px;
    margin: 0;
    justify-content: flex-start;
  }
  @media ${media.xxLaptop} {
    width: 95%;
  }

  @media ${media.xLaptop} {
    width: 98%;
  }
  @media ${media.Laptop} {
    width: 99%;
  }

  @media ${media.xxMobile} {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  }
`;

interface IOriginProps {
  Navi?: React.ReactNode;
  Contents1?: React.ReactNode & any;
  Contents2?: React.ReactNode;
  Contents3?: React.ReactNode;
  Contents4?: React.ReactNode;
  Contents5?: React.ReactNode;
  Contents6?: React.ReactNode;
  Contents7?: React.ReactNode;
  Aside?: React.ReactNode;
}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = IOriginProps & RouteComponentProps & StateProps & DispatchProps;

class BaseTemplate extends React.Component<IProps> {
  public render() {
    const { 
      Aside,
      Navi,
      Contents1,
      Contents2,
      Contents3,
      Contents4,
      Contents5,
      Contents6,
      Contents7,
      visible,
      navibar,
    } = this.props;
    const path = this.props.match.path;
    return(
      <Wrapper>
      <NaviWrapper 
        visible={visible}
        showNavibar={navibar}
      >
        {Navi}
      </NaviWrapper>
      <ContentsWrapper 
        path={path}
        showNavibar={navibar}
      >
        {Contents1}
        {Contents2}
        {Contents3}
        {Contents4}
        {Contents5}
        {Contents6}
        {Contents7}
      </ContentsWrapper>
      <AsideWrapper>
        {Aside}
      </AsideWrapper>
    </Wrapper>
    );
  }
}

const mapStateToProps = ({ core, base }: IModule) => ({
  visible: base.navi,
  width: core.width,
  navibar: base.navibar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BaseTemplate));
