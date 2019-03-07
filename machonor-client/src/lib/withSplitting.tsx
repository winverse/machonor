import * as React from 'react';

const withSplitting = (getComponent: any) => {
  class WithSplitting extends React.Component<any, any> {
    public state = {
      Splitted: null,
    };
    constructor(props: any) {
      super(props);
      getComponent().then(({ default: Splitted }: any) => {
        this.setState({
          Splitted,
        });
      });
    }
    public render() {
      const { Splitted } = this.state;
      if (!Splitted) return null;
      return (
        React.createElement(Splitted, { ...this.props })
      );
    }
  }
  return WithSplitting;
};

export default withSplitting;