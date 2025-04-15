
/* localStorage 관리 */
export class LocalStorageUtility {
    /**
     * localStorage에 stringify된 값 저장.
     * @param key    localStorage key
     * @param value  localStorage value
     */
    static setItem<T>(key:string, value:T): void {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    /**
     * localStorage에 저장된 값을 파싱하여 반환.
     * 저장된 값이 없는 경우 defaultValue를 반환.
     * @param   key           localStorage key
     * @param   defaultValue  저장된 값이 없을 때 반환하는 값
     * @returns               저장된 값 || defaultValue      
     */
    static getItem<T>(key:string, defaultValue:T):T {
      const jsonValue = window.localStorage.getItem(key);
      return jsonValue? JSON.parse(jsonValue): defaultValue
    }
  }