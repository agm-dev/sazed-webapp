const get = (key) => {
  try {
    const rawValue = localStorage.getItem(key);
    const value = JSON.parse(rawValue);
    console.log(`get ${key} from storage with value ${value}`);
    return value;
  } catch (err) {
    console.warn("trying to parse a value which is not JSON from storage: ", err.message);
    return null;
  }
};

const set = (key, value) => {
  try {
    const toStore = JSON.stringify(value);
    localStorage.setItem(key, toStore);
    console.log(`saved ${toStore} into storage with key ${key}`);
    return true;
  } catch (err) {
    console.warn(`failed on saving ${key} into storage: `, err.message);
    return false;
  }
};

export {
  get,
  set
};
