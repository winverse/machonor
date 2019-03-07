import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { throttle } from 'lodash';

import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { 
  PostWithNGO,
} from 'components/post/WithNGO';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

class WithNGOContainer extends React.Component<IProps> {
  public NGORef: any;
  constructor(props: IProps) {
    super(props);
    this.NGORef = React.createRef();
  }
  public onScroll = throttle(() => {
    const { PostsActions } = this.props;
    const height = this.NGORef.current && this.NGORef.current.offsetTop;
    if (!height) return;
    PostsActions.setScrollHeight({
      name: 'NGOTop',
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
      <PostWithNGO 
        NGORef={this.NGORef}
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
)(WithNGOContainer);