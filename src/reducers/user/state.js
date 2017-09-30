/**
 * 用户所有数据
 * Param: param
 * Return: {undefined}
 **/

import { DeviceStorage } from '../../utils.js';

const keyBoardHeight = DeviceStorage.get('keyBoardHeight');

const inintUserState = {
    keyBoardHeight: 220, // 手机接盘高度
    isLogged: true,
    isShowMune: false,
    avatar: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg',
    mobile: '17636999981',
    userid: '',
    userName: '李渊的信信',
    isFetch: false,
    isError: null, // 提示错误消息, null ? closeAlert : openAlert
    currentChatRoomPage: 1, // 当前获取聊天列表页码
    userRecentChat:[// 用户最近联系人
        { latestMessage: '最后的消息',
            latestTime: '2017-05-23',
            name: '李渊',
            id: '123',
            key: '234534534',
            type: "group",
            isTop: true ,
            groupMembers: [{ // 裙成员
                id: '2142534',  // 聊天是id
                members: [{ //群聊成员
                    avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                    id: '3453656423543',
                }, {
                    avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                    id: '3453656423543',
                }, {
                    avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                    id: '3453656423543',
                }]
            }],
            unReadMessageCount: '56',// 消息数量
            groupPageNum: 1,  // 查询群组成员页码
            members: [],
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
                to: '233564'  // 消息发送id 聊天房间id
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
    ],
    friendList: [],
};

/* frindListDemo: {
  1: [{"userId":363,"
  avatar":"http://image-2.plusman.cn/app/im-client/avatar/tuzki_17.png",
  "name":"11",
  "phone":"12222222222",
  "socketId":"1nGKBy0Cdpol9MToABvw",
  "status":"offline",
  "vibration":true
  }]
  }*/
export default inintUserState;
