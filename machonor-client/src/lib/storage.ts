
const st: any = typeof localStorage === 'object' ? localStorage : {};

interface IStorage {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
}

const storage: IStorage = {
  set(key, value) {
    st[key] = JSON.stringify(value);
  },
  get(key) {
    if (!st[key]) return null;
    const value = st[key];
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch (e) {
      return value;
    }
  },
  remove(key) {
    delete st[key];
  },
  clear() {
    if (st.clear) {
      st.clear();
    }
  },
};

export default storage;