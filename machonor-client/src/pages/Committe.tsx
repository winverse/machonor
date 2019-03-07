import * as React from 'react';

import { BasicTemplate } from 'components/template';
import {
  Navi,
} from 'containers/Common';

const Commitee: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1="Commite"
  />
);

export default Commitee;