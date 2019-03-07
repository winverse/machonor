import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import {
  PostSummary,
} from 'components/post/Summary';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class SummaryContainer extends React.Component<IProps> {
  public summaryRef: any;
  constructor(props: IProps) {
    super(props);
    this.summaryRef = React.createRef();
  }
  public onScroll = throttle(() => {
    const { PostsActions } = this.props;
    const height = this.summaryRef.current && this.summaryRef.current.offsetTop;
    if (!height) return;
    PostsActions.setScrollHeight({
      name: 'summaryTop',
      height,
    });
  }, 500);
  public componentDidMount() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  public render() {
    return (
      <PostSummary 
        summaryRef={this.summaryRef}
      />
    );
  }
}

const mapStateToProps = ({ }: IModule) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SummaryContainer);