import * as React from 'react';
import { match } from 'react-router-dom';

import { BasicTemplate } from 'components/template';
import { Navi, ContentsController, Aside } from 'containers/Common';
import {
  PagenationContainer,
  PostContainer,
} from 'containers/Notice/';

interface IProps {
  match: {
    params: {
      urlSlug: string;
    };
  } & match;
}

const NoticePost: React.SFC<IProps> = ({ match }) => {
  const urlSlug = match.params.urlSlug;
  return (
    <BasicTemplate
      Navi={<Navi />}
      Contents1={<ContentsController />}
      Contents2={<PostContainer urlSlug={decodeURI(urlSlug)}/>}
      Contents3={<PagenationContainer />}
      Aside={<Aside />}
    />
  );
};

export default NoticePost;