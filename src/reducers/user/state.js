/**
 * 用户所有数据
 * Param: param
 * Return: {undefined}
 **/

import { AsyncStoreage } from 'react-native';

const inintUserState = {
  keyBoardHeight: 220, // 最好保存到手机内部
  isLogged: false,
  isShowMune: false,
  userid: '23455553',
  userRecentChat:[// 用户最近联系人
    { latestMessage: '最后的消息',
      latestTime: '2017-05-23',
      name: '李渊',
      id: '123',
      key: '234534534',
      unReadMessageCount: '56',// 消息数量
      avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
      chatInfo: {
        name: '王宇飞',
        avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',//对方头像
        userId: '34545645'// 对方聊天用户id
      },
      chatData: [{
          msg: {
            content: 'haha',
            type: 'text'
          },
          avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
          name: 'liyuan',
          from: '24354', // 消息来源id
          to: '233564'  // 消息发送id
      }]
    }, { latestMessage: '最后的消息',
         latestTime: '2017-05-23',
         name: '王宇飞',
         id: '123',
         key: 'wer53453234534534',
         unReadMessageCount: '88',// 消息数量
         avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
         chatInfo: {
           name: '小白',
           avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',//对方头像
           userId: '23455553'// 对方聊天用户id
         },
         chatData: [{// 集体聊天记录
             msg: {
               content: 'haha',
               type: 'text'
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '23455553', // 消息来源id
             to: '233564'  // 消息发送id
         }, {// 集体聊天记录
             msg: {
               content: 'haha',
               type: 'text'
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '23455553', // 消息来源id
             to: '233564'  // 消息发送id
         }, {
             msg: {
               content: '一会就吃饭了, 想想今天吃什么!',
               type: 'text'
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '223455553', // 消息来源id
             to: '233564'  // 消息发送id
         }, {// 集体聊天记录
             msg: {
               content: 'haha',
               type: 'text'
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '23455553', // 消息来源id
             to: '233564'  // 消息发送id
         }, {
             msg: {
               content: '一会就吃饭了, 想想今天吃什么!',
               type: 'text'
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '223455553', // 消息来源id
             to: '233564'  // 消息发送id
         }, {// 集体聊天记录
             msg: {
               content: 'haha',
               type: 'text'
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '23455553', // 消息来源id
             to: '233564'  // 消息发送id
         }, {
             msg: {
               content: '',
               type: 'redPackage',
               redPackageData: [2, 3, 4, 5, 4]
             },
             avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
             name: 'liyuan',
             from: '23455553', // 消息来源id
             to: '233564'  // 消息发送id
         }]
       }
  ]
};

export default inintUserState;
