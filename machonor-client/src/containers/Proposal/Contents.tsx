import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { IModule } from 'store/modules';
import { ContentsWrapper } from 'components/common/Contents';
import { 
  Button,
} from 'components/proposal';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps & RouteComponentProps;

class Contents extends React.Component<IProps> {
  public onWriteStart = () => {
    const { userId, history } = this.props;
    if (userId === '') {
      alert('로그인을 해주세요!');
      return;
    }
    history.push('/justice/write');
  }
  public render() {
    return (
      <ContentsWrapper>
        <Button 
          onClick={this.onWriteStart}
        />
      </ContentsWrapper>
    );
  }
}

const mapStateToProps = ({ user }: IModule) => ({
  userId: user.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Contents));