import * as Sequelize from 'sequelize';
import * as Moment from 'moment';
import * as shortid from 'shortid';

export const primaryUUID = {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
  primaryKey: true,
};

export const generateSlugId = (): string => {
  // return `${Math.floor(36 + Math.random() * 1259).toString(36)}${Date.now().toString(36)}`;
  return shortid.generate();
};

export const escapeForUrl = (text: string): string => {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      '',
    )
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export const formatFileName = (name: string) => {
  const date = Moment().format('YYYYMMDD');
  const randomString = Math.random().toString(36).substring(2, 7);
  const claenFileName = name.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-.');
  const newFilename = `justice-${date}-${randomString}-${claenFileName}`;
  return newFilename.substring(0, 70);
};