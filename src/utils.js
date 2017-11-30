/**
 * 针对操作reducer的工具
 **/
import {
  AsyncStorage
}from 'react-native';

/**
 * 通过数组下标删除数组指定下标的元素
 * Param: { index: Number, arr: Array}
 * Return: { Array }
 **/
export let deleteArrayByIndex = (index, arr) => {
  return arr.slice(0, index).concat(arr.slice(parseInt(index) + 1, arr.length));
}

export class DeviceStorage {
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */

  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }


  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }


  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    return DeviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }


  /**
   * 更新
   * @param key
   * @returns {*}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}


  /**
     * 获取当前string时间
     * 格式:yyyy-MM-dd HH:MM:SS
     **/
  export let getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
  }
