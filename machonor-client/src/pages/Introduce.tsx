import * as React from 'react';

import { BasicTemplate } from 'components/template';
import {
  Navi,
} from 'containers/Common';

const Introduce: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1="Introdue"
  />
);

export default Introduce;