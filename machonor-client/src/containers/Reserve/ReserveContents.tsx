import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IModule } from 'store/modules';
import { ContentsWrapper, BannerImage } from 'components/common/Contents';
import { PostsList } from 'components/reserve/List';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class ReseveContents extends React.Component<IProps> {

  public render() {
    return (
      <ContentsWrapper>
        <BannerImage />
        <PostsList />
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
)(ReseveContents);