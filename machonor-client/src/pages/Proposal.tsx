import * as React from 'react';
import { BasicTemplate } from 'components/template';
import { Navi, Aside, ContentsController } from 'containers/Common';
import { Contents } from 'containers/Proposal';

const Proposal: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1={<ContentsController />}
    Contents2={<Contents />}
    Aside={<Aside />}
  />
);

export default Proposal;