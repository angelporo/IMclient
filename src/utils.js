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

export let timeDifference = (tmpTime) => {
  // console.log('聊天时间', typeof(tmpTime))
  if (tmpTime == 'undefined' || tmpTime == 'null') {
    return ''
  }
  var mm=1000;//1000毫秒 代表1秒
  var minute = mm * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var ansTimeDifference=0;//记录时间差
  var tmpTimeStamp = tmpTime ? Date.parse(tmpTime.replace(/-/gi, "/")) : new Date().getTime();//将 yyyy-mm-dd H:m:s 进行正则匹配
  var nowTime = new Date().getTime();//获取当前时间戳
  var tmpTimeDifference = nowTime - tmpTimeStamp;//计算当前与需要计算的时间的时间戳的差值
  if (tmpTimeDifference < 0) {                //时间超出，不能计算
    return "刚刚";
  }
  /**
   * 通过最开始强调的各个时间段用毫秒表示的数值，进行时间上的取整，为0的话，则没有到达
   * */
  var DifferebceMonth = tmpTimeDifference / month;    //进行月份取整
  var DifferebceWeek = tmpTimeDifference / (7 * day);//进行周取整
  var DifferebceDay = tmpTimeDifference / day;//进行天取整
  var DifferebceHour = tmpTimeDifference / hour;//进行小时取整
  var DifferebceMinute = tmpTimeDifference / minute;//进行分钟取整
  if (DifferebceMonth >= 1) {
    return tmpTime;                 //大于一个月 直接返回时间
  } else if (DifferebceWeek >= 1) {
    ansTimeDifference= parseInt(DifferebceWeek) + "个星期前";
  } else if (DifferebceDay >= 1) {
    ansTimeDifference = parseInt(DifferebceDay) + "天前";
  } else if (DifferebceHour >= 1) {
    ansTimeDifference = parseInt(DifferebceHour) + "个小时前";
  } else if (DifferebceMinute >= 1) {
    ansTimeDifference = parseInt(DifferebceMinute) + "分钟前";
  } else {
    ansTimeDifference = "刚刚";
  }
  return ansTimeDifference;
}
