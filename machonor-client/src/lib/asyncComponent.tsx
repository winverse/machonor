/* tslint:disable */
import * as React from 'react';

export default function asyncComponent(getComponent: any) {
  class AsyncComponent extends React.Component<any, any> {
    static Component = null;
    public state = {
      Component: AsyncComponent.Component,
    };

    constructor(props: any) {
      super(props);
      if (AsyncComponent.Component) return;
      getComponent().then(({ default: Component }: any) => {
        AsyncComponent.Component = Component;
        this.setState({ 
          Component,
        });
      });
    }

    public render() {
      const { Component } = this.state;
      return Component ? React.createElement(Component, { ...this.props }) : null;
    }
  };

  (AsyncComponent as any).preloadComponent = () => {
    return getComponent().then(({ default: Component }: any) => {
      AsyncComponent.Component = Component;
    });
  };
  return AsyncComponent;
}