import * as React from 'react';

import { BasicTemplate } from 'components/template';
import { Contents } from 'containers/Main';
import { Navi, Aside, ContentsController } from 'containers/Common';

const MainPage: React.SFC = () => {
  return (
    <BasicTemplate
      Navi={<Navi/>}
      Contents1={<ContentsController />}
      Contents2={<Contents/>}
      Aside={<Aside/>}
    />
  );
};
export default MainPage;
