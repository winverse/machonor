import * as dns from 'dns';
import * as os from 'os';
import * as ipCountry from 'ip-country';

export const getIpCountry = () => {
  ipCountry.init({
    fallbackCountry: 'US',
    exposeInfo: false,
  });
  const hostname = os.hostname();
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err: any, address: any): void => {
      if (err) reject(err);
      const country = ipCountry.country(address);
      resolve(country);
    });
  });
};

export const getIpAddress = () => {
  const hostname = os.hostname();
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err: any, address: any): void => {
      if (err) reject(err);
      resolve(address);
    });
  });
};