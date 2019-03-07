declare module 'redux-pender';
declare module 'react-click-outside';
declare module 'date-fns/locale/ko';
declare module 'lib/react-loadable.json'

type Color = string

declare module 'open-color' {
  interface OpenColor {
    white: Color
    black: Color
    gray: Color[]
    red: Color[]
    pink: Color[]
    grape: Color[]
    violet: Color[]
    indigo: Color[]
    blue: Color[]
    cyan: Color[]
    teal: Color[]
    green: Color[]
    lime: Color[]
    yellow: Color[]
    orange: Color[]
  }
  const oc: OpenColor
  export default oc;
}