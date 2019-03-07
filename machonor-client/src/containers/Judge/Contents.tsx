import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IModule } from 'store/modules';
import { ContentsWrapper } from 'components/common/Contents';
import { JudgeWrapper } from 'components/judge/Wrapper';
import {
  CardList,
} from 'components/judge/List';
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class Contents extends React.Component<IProps> {

  public render() {
    return (
      <ContentsWrapper>
        <JudgeWrapper>
          <CardList />
        </JudgeWrapper>
        <div style={{ height: '50px' }}/>
      </ContentsWrapper>
    );
  }
}

const mapStateToProps = ({ }: IModule) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Contents);