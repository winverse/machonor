import * as React from 'react';

import { BasicTemplate } from 'components/template';
import { Navi, ContentsController, Aside } from 'containers/Common';
import {
  BoardContainer,
  PagenationContainer,
} from 'containers/Notice/';
const Notice: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1={<ContentsController />}
    Contents2={<BoardContainer />}
    Contents3={<PagenationContainer />}
    Aside={<Aside />}
  />
);

export default Notice;