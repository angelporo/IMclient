/**
 * 输入框组件
 */

import TextInputLabel from './TextInputLabel.js';
import TextInputLine from './TextInputLine.js';
import ZBnumberLabel from './ZBnumberLabel.js';
import SearchText from './SearchText.js';
import Password from "./PassWord.js";

export default class TextInput {
  static Label = TextInputLabel;      
  static Line = TextInputLine;        
  static number = ZBnumberLabel; // 红包输入金额表单
  static Search = SearchText; //  搜索输入框
  static Password = Password; // 输入密码
}
