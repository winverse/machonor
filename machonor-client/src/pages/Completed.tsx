import * as React from 'react';

import { BasicTemplate } from 'components/template';
import {
  Navi,
} from 'containers/Common';

const Completed: React.SFC = () => (
  <BasicTemplate
    Navi={<Navi />}
    Contents1="Completed"
  />
);

export default Completed;