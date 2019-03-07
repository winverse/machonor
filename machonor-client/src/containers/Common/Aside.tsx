import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IModule } from 'store/modules';
import {
  AsideWrapper,
  Infomation,
  Rank,
} from 'components/common/Aside';
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type AsideContainerProps = StateProps & DispatchProps;

class AsideContainer extends React.Component<AsideContainerProps> {

  public render() {
    return (
      <AsideWrapper>
        <Infomation />
        <Rank />
      </AsideWrapper>
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
)(AsideContainer);