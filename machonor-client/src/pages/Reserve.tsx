import * as React from 'react';

import { BasicTemplate } from 'components/template';
import { Navi, Aside, ContentsController } from 'containers/Common';
import { ReserveContents } from 'containers/Reserve';

const Reserve: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1={<ContentsController />}
    Contents2={<ReserveContents />}
    Aside={<Aside />}
  />
);

export default Reserve;