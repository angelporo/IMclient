/**
 * @prettier
 * 是指聊天房间信息 包括群聊显示群成员
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Switch,
    ScrollView,
    Modal
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import { CachedImage } from "react-native-img-cache";
import config from "../config"
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);
import {
    getGroupMemberByGroupID,
    switchIsTopChat,
    setGroupName,
    setUserNameAsGroupChat
} from '../reducers/user/userActions';
import NewGroupChatRoom from './NewGroupModal';
import {
  FontSize,
  Button,
  Color,
  TextInput,
  ListItem
} from '../UiLibrary/';

class SectChatRoomInfoAndDisplayGroupMember extends Component {
  static navigationOptions = props => {
    return {
        title: '信息',
        // headerRight: headerRight,
        headerBackTitle: '返回',
        headerTruncatedBackTitle: '返回',
        lazy: true,
    };
  }

  constructor(props) {
    super(props);
    const { id } = props.navigation.state.params.info
    this.groupIndex = props.userRecentChat.findIndex( n => id === n.id );
    const { userRecentChat } = this.props;
    // const { isTop } = userRecentChat[ this.groupIndex ]
    this.state = {
      isFetch: false,
      isMenuShow: false,
      openGroupChatRoom: false,
      // isTop: isTop,
    };
  }
  handleDeleteAndExitGroup () {
    alert('delete');
  }
  componentDidMount() {
    _this = this;
    // 获取群成员
  }
  intoSetGroupName () {
    const { userRecentChat } = this.props;
    const { name } = userRecentChat[ this.groupIndex ]
    this.props.navigation.navigate("SetInputComponent", {
      title: '群聊名称',
      value: name,
      onSubmit: this.handleAmendGroupChatName.bind(this)
    }
                                  );
  }
  intoSetUserNameAsGroup() {
    const { userRecentChat } = this.props;
    const { myUserNameAsGroup } = userRecentChat[ this.groupIndex ];
    this.props.navigation.navigate("SetInputComponent", {
      title: '设置我在群内昵称',
      value: myUserNameAsGroup,
      onSubmit: this.handleAmendUserNameAsGroupChat.bind( this )
    });
  }

    openAddfriendsToGroupMember () {
        this.setState({
            openGroupChatRoom: true
        });
    }
    handleAmendUserNameAsGroupChat ({value}) {
        // 提交设置群聊名称
        const { setUserNameAsGroupChat } = this.props;
        setUserNameAsGroupChat({
            setType: 'setUserNameByGroup',
            content: value,
            index: this.groupIndex
        })
    }
    _switchIsTopGroup () {
        // 切换顶置聊天功能
        const { userRecentChat, switchIsTopChat } = this.props;
      const { isTop } = userRecentChat[ this.groupIndex ];
        switchIsTopChat({
            index: this.groupIndex,
            isTop: !isTop
        });
    }

    handleAmendGroupChatName ({value}) {
        // 提交设置群聊名称
        const { setGroupName } = this.props;
        setGroupName({
            setType: 'setGroupName',
            content: value,
            index: this.groupIndex
        })
    }
    handleAddFriendToGroupChat({ friends }) {
        /**
         * 选择联系人添加到群聊中
         * 发送请求到后台 添加
         * Param: param
         * Return: { undefined }
         **/
        alert( '添加到列表', friends.length );
  }

    componentWillUpdate(props, nextProps) {

    }

  render () {
    const { userRecentChat, userName } = this.props;
    const { name, isTop, groupMembersEntity, myUserNameAsGroup, groupMembers, type, owner } = userRecentChat[ this.groupIndex ]
    return (
      <ScrollView>
        {/*渲染群成员*/}
        <GroupMembers
          data={ groupMembersEntity }
          type={type}
          handleAddFriends={ this.openAddfriendsToGroupMember.bind(this) }
          />
        <View style={styles.utilBar}>
          {
            type == config.chatgroups ?
              (
                <View style={ styles.ListItemLableBox }>
                  <ListItem.Label
                    labelText="群聊名称"
                    style={ styles.ListItemLabel }
                    labelStyle={{ fontSize: 16 }}
                    rightComponent={() => ( <Text style={{ color: Color.LightGrey }}>{ name }</Text> )}
                onPress={ this.intoSetGroupName.bind(this)}/>
                  </View>
                ) : null
            }

        <View style={styles.ListItemLableBox}>
        <ListItem.Label
      labelText="顶置聊天"
      style={styles.ListItemLabel}
      labelStyle={{fontSize: 16}}
      rightComponent={() => (
        <Switch
          onValueChange={ this._switchIsTopGroup.bind(this)}
          value={ isTop }
          thumbTintColor={ isTop ? Color.White : Color.LightGrey }
          tintColor={ Color.LightGrey }
          onTintColor={ Color.WechatGreen }
          /> )}
        />
        </View>
        {
          type == config.chatgroups ?
            (
              <View style={ styles.ListItemLableBox }>
                <ListItem.Label
                  labelText="我在本群的昵称"
                  style={ styles.ListItemLabel }
                  labelStyle={{ fontSize: 16 }}
                  rightComponent={() => ( <Text style={{color: Color.LightGrey}}>{ myUserNameAsGroup }</Text> )}
              onPress={ this.intoSetUserNameAsGroup.bind(this)}
                />
                </View>
            ) : null
        }

        <View style={ styles.ListItemLableBox }>
        <ListItem.Label
      labelText="投诉"
      style={ styles.ListItemLabel }
      labelStyle={{ fontSize: 16 }}
      onPress={ () => alert('enen') }
        />
        </View>
        </View>
            {
/**
 * groupMembers.affiliations > 1 (群聊) 否则单聊
 */
                type == config.chatgroups && owner == userName  ? (
                    <View style={{marginVertical: 30}}>
                      <Button
                        style={styles.deleteGroup}
                        textStyle={styles.whiteText}
                        onPress={ this.handleDeleteAndExitGroup.bind(this) }
                        >
                        删除并退出
                      </Button>
                    </View>
                ) : null
            }

            <Modal
            onRequestClose={ () =>
                this.setState({ openGroupChatRoom: !this.state.openGroupChatRoom})}
            animationType={ "slide" }
            transparent={ false }
            onShow={() => this.setState({ isMenuShow: false })}
            visible={ this.state.openGroupChatRoom }>
            {/*// NOTE: 发送红包type选项(群发和单发) */}
            <NewGroupChatRoom
            closeModal={() => this.setState({
                openGroupChatRoom: !this.state.openGroupChatRoom
            })}
          onSubmit={ this.handleAddFriendToGroupChat.bind(this)}
            />
            </Modal>
            </ScrollView>
    );
  }
}

// 群成员组件
export class GroupMembers extends Component{
  constructor(props) {
    super(props);
  }
  _renderItem ({item}) {
    if(!__DEV__) {
      if(!item.avatar) throw new Error('群成员头像字段出错');
      if(!item.id) throw new Error('群成员id字段出错');
      if(!item.userName) throw new Error('群成员用户名出错');
    }
    return (
      <View
        key={item.id}
        style={styles.groupMembersItemBox}>
        <CachedImage
          component={ Image }
          source={{
            uri: `${config.domain}${item.avatar}`
          }}
          style={ styles.groupMemberItemAvatar }
          resizeMode={ Image.resizeMode.contain }
          mutable
          />
        <Text style={{ marginTop: 8, fontSize: 12 }}>{ item.userName }</Text>
      </View>
    );
  }
  _addGroupItem () {
    const { handleAddFriends, type } = this.props;
    if (type == config.chatgroups) {
      return (
        <View style={styles.addGroupMembersItem}>
          <TouchableOpacity
            style={ styles.AddGroupMemberItemIcon }
            onPress={ handleAddFriends }
            >
            <Icon
              color={ Color.LightGrey }
              name="ios-add"
              size={20}/>
          </TouchableOpacity>
          <Text style={{marginTop: 8}}>添加</Text>
        </View>
      );
    }
    return null;
  }
  render () {
    const { data } = this.props;
    return (
      <View style={ styles.groupMembers }>
        {
          data.map( (n, i) => {
            return this._renderItem({item: n, key: n.id})
          } )
        }
        {
          this._addGroupItem()
        }
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
  },
  utilBar: {
    marginTop: 15,
  },
  groupMembersItemBox: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  addGroupMembersItem: {
    marginTop: 15,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListItemLabel: {
    height: 45,
    borderColor: Color.LightGrey,
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  ListItemLableBox: {
    backgroundColor: Color.White
  },
  AddGroupMemberItemIcon: {
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.LightGrey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupMemberItemAvatar: {
    borderRadius: 4,
    overflow: 'hidden',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteGroup: {
    paddingVertical: 5,
    borderColor: Color.WechatGreen ,
    backgroundColor: Color.WechatGreen ,
    marginHorizontal: 20
  },
  whiteText: {
    color: Color.White,
    fontSize: FontSize.Main
  },
  AddGroupMemberItem: {
    width: 40,
    height: 40,
  },
  groupMembers: {
    paddingVertical: 10,
    backgroundColor: Color.White,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

let mapStateToProps = state => ({
  userRecentChat: state.userReducer.userRecentChat,
  userName: state.userReducer.userName
});

let mapDispatchToProps = dispatch => ({
    switchIsTopChat: compose( dispatch, switchIsTopChat ),
    setGroupName: compose( dispatch, setGroupName),
    setUserNameAsGroupChat: compose( dispatch, setUserNameAsGroupChat),
});

export default connect( mapStateToProps, mapDispatchToProps )( SectChatRoomInfoAndDisplayGroupMember );
