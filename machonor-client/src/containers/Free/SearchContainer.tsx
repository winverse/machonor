import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { baseActions } from 'store/modules/base';
import { postsActions } from 'store/modules/posts';

import { IModule } from 'store/modules';
import { OptionItems, OptionWrapper } from 'components/base/SearchOptions';
import {
  NameWithSearch,
  SearchWrapper,
  Optional,
  Input,
  Button,
} from 'components/community/NameWithSearch';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = StateProps & DispatchProps;

interface IState {
  option: string;
  criteria: string;
  value: string;
}

interface IOwnProps {
  urlSlug?: string;
}

class SearchContainer extends React.Component<IProps, IState> {
  public state = {
    option: '제목',
    criteria: 'title',
    value: '',
  };
  public onInputChange = (e: any) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  }
  public onInputKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.onSearch();
      return;
    }
  }
  public onControlOptions = () => {
    const { BaseActions, visible } = this.props;
    BaseActions.setSearchOptionVisible(!visible);
  }
  public onCloseOptions = (e: any) => {
    const { BaseActions } = this.props;
    if (!e) return;
    const { innerHTML, title } = e.target;
    BaseActions.setSearchOptionVisible(false);
    this.setState({
      option: innerHTML,
      criteria: title,
    });
  }
  public onSearch = async () => {
    const { PostsActions, page } = this.props;
    const { criteria, value } = this.state;
    if (value.length < 2) {
      alert('검색어가 너무 짧습니다.');
      return;
    }
    const pattern = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if (!pattern.test(value)) {
      alert('2~10사이의 단어로 검색해주세요!');
      return;
    }
    try {
      await PostsActions.searchPost({
        page,
        criteria,
        category: 'free',
        word: value.trim(),
      });
    } catch (e) {
      console.log(e);
    }
  }
  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { mode } = this.props;
    if (prevState.value !== this.state.value) {
      const { value } = this.state;
      const { PostsActions } = this.props;
      if (!mode) {
        if (value !== '') {
          PostsActions.searchMode(true);
        }
        return;
      }
      if (mode) {
        if (value === '') {
          PostsActions.searchMode(false);
        }
        return;
      }
    }
    if ((prevProps.page !== this.props.page) && mode) {
      this.onSearch();
    }
  }
  public render() {
    const { option, value } = this.state;
    const { visible } = this.props;
    return (
      <NameWithSearch>
        <SearchWrapper>
          <Optional 
            onClick={this.onControlOptions}
            option={option}
          />
          <Input
            value={value}
            onChange={this.onInputChange}
            onKeyPress={this.onInputKeyPress}
          />
          <Button 
            onClick={this.onSearch}
          />
          <OptionWrapper visible={visible} onClose={this.onCloseOptions}>
            <OptionItems onClick={this.onCloseOptions} title="title">제목</OptionItems>
            <OptionItems onClick={this.onCloseOptions} title="titleWithContent">제목 + 내용</OptionItems>
            <OptionItems onClick={this.onCloseOptions} title="displayname">글쓴이</OptionItems>
          </OptionWrapper>
        </SearchWrapper>
      </NameWithSearch>
    );
  }
}

const mapStateToProps = ({ base, post }: IModule, ownProps: IOwnProps) => ({
  visible: base.searchOption,
  mode: post.searchMode,
  page: post.page,
  urlSlug: ownProps.urlSlug,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseActions, dispatch),
  PostsActions: bindActionCreators(postsActions, dispatch),
});

export default connect<StateProps, DispatchProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);