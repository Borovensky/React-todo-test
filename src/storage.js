class LocalStorageUtil {
  static setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error while setItem in localStorage', error);
    }
  }

  static getItem (key) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : [];
    } catch (error) {
      console.error('Error while getItem from localStorage', error);
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error while remove item from localStorage', error);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error while clear localStorage', error);
    }
  }
}

export default LocalStorageUtil;
