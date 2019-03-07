import { css } from 'styled-components';

const size = {
  xxWide: '2000px',
  xWide: '1800px',
  Wide: '1600px',
  xxLaptop: '1400px',
  xLaptop: '1200px',
  Laptop: '1024px',
  Tablet: '768px',
  xxMobile: '425px',
  xMobile: '385px',
  Mobile: '320px',
};

export const media = {
  xxWide: `(max-width: ${size.xxWide})`,
  xWide: `(max-width: ${size.xWide})`,  // 1800px;
  Wide: `(max-width: ${size.Wide})`,
  xxLaptop: `(max-width: ${size.xxLaptop})`, // 1400px;
  xLaptop: `(max-width: ${size.xLaptop})`,
  Laptop: `(max-width: ${size.Laptop})`,
  Tablet: `(max-width: ${size.Tablet})`,
  xxMobile: `(max-width: ${size.xxMobile})`,
  xMobile: `(max-width: ${size.xMobile})`,
  Mobile: `(max-width: ${size.Mobile})`,
};

export const shadow = (weight: number) => {
  const shadows = [
    css`box-shadow: 0 0px 0px rgba(0,0,0,0), 0 0px 0px rgba(0,0,0,0);`,
    css`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`,
    css`box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`,
    css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
    css`box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`,
    css`box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`,
  ];
  return shadows[weight];
};
