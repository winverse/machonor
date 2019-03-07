import * as React from 'react';

// 서버사이드 렌더링 이후, 가장 첫 렌더링에서는 shouldCancel 이 true
// App 렌더링이 한번 마치고 나면, 그 다음부터는 false

let cancel = typeof window !== 'undefined' && !!(window as any).__PRELOADED_STATE__; // 초기 상태가 있으면 true

const shouldCancel = () => {
  return cancel;
};

export class Rendered extends React.Component {
  public componentDidMount() {
    cancel = false;
  }
  public render () {
    return null;
  }
}

export default shouldCancel;