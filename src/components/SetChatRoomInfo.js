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
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);
import {
    getGroupMemberByGroupID,
    switchIsTopChat
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
      // headerRight: headerRight
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetch: false,
        bringToTop: false,
        isMenuShow: false,
        openGroupChatRoom: false,
    };
      const { getAdminIdByGroupu } = props;
  }
  handleDeleteAndExitGroup () {
    alert('delete');
  }
  componentDidMount() {
    _this = this;
    const { getGroupMemberByGroupID } = this.props;
    // 获取群成员
    getGroupMemberByGroupID( this.props.navigation.state.params.info.id );
  }
  intoSetGroupName () {
    this.props.navigation.navigate("SetInputComponent", {
      title: '群聊名称',
      value: this.props.navigation.state.params.info.name});
  }
  intoSetUserNameAsGroup() {
    this.props.navigation.navigate("SetInputComponent", {
      title: '设置我在群内昵称',
      value: this.props.navigation.state.params.info.groupMembers.myUserNameAsGroup});
  }
    openAddfriendsToGroupMember () {
        this.setState({
            openGroupChatRoom: true
        });
    }
    _switchIsTopGroup () {
        // 切换顶置聊天功能
        this.setState({bringToTop: !this.state.bringToTop})

    }
  render () {
    const { groupMembers, name } = this.props.navigation.state.params.info;
      return (
          <ScrollView>
          <GroupMembers
          data={ groupMembers.members }
          handleAddFriends={ this.openAddfriendsToGroupMember.bind(this) }
          />
          <View style={styles.utilBar}>
          <View style={ styles.ListItemLableBox }>
          <ListItem.Label
          labelText="群聊名称"
          style={ styles.ListItemLabel }
          labelStyle={{ fontSize: 16 }}
          rightComponent={() => ( <Text style={{ color: Color.LightGrey }}>{ name }</Text> )}
          onPress={ this.intoSetGroupName.bind(this)}/>
          </View>
          <View style={styles.ListItemLableBox}>
          <ListItem.Label
          labelText="顶置聊天"
          style={styles.ListItemLabel}
          labelStyle={{fontSize: 16}}
          rightComponent={() => (
              <SwitchTools
              value={ this.state.bringToTop }
              onValueChange={ this._switchIsTopGroup.bind(this)}
              /> )}
          />
          </View>
          <View style={ styles.ListItemLableBox }>
          <ListItem.Label
          labelText="我在本群的昵称"
          style={ styles.ListItemLabel }
          labelStyle={{ fontSize: 16 }}
          rightComponent={() => ( <Text style={{color: Color.LightGrey}}>{ groupMembers.myUserNameAsGroup }</Text> )}
          onPress={ this.intoSetUserNameAsGroup.bind(this)}
          />
          </View>
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
              groupMembers.type ===  'group' ? (
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
          />
          </Modal>
          </ScrollView>
      );
  }
}

/**
 * 切换选择
 * Param: param
 * Return: {undefined}
 **/
class SwitchTools extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { onValueChange, value } = this.props;
    return (
      <Switch
        onValueChange={ onValueChange }
        value={ value }
        thumbTintColor={value ? Color.White : Color.LightGrey }
        tintColor={ Color.LightGrey }
        onTintColor={ Color.WechatGreen }
        {...this.props}
        />
    )
  }
}


export class GroupMembers extends Component{
  constructor(props) {
    super(props);
  }
  _renderItem ({item}) {
    if(__DEV__) {
      if(!item.avatar) throw new Error('群成员头像字段出错');
      if(!item.id) throw new Error('群成员id字段出错');
      if(!item.userName) throw new Error('群成员id字段出错');
    }
    return (
      <View style={styles.groupMembersItemBox}>
        <Image
          resizeMode={ Image.resizeMode.contain }
          source={ {uri: item.avatar} }
          style={ styles.groupMemberItemAvatar }
          />
        <Text style={{ marginTop: 8 }}>{ item.userName }</Text>
      </View>
    );
  }
  _addGroupItem () {
    const { handleAddFriends } = this.props;
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
        <Text style={{marginTop: 8}}></Text>
      </View>
    );
  }
  render () {
    const { data } = this.props;
    return (
      <View style={ styles.groupMembers }>
        {
          data.map( (n, i) => {
            return this._renderItem({item: n});
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    getGroupMemberByGroupID: compose( dispatch, getGroupMemberByGroupID),
    switchIsTopChat: compose( dispatch, switchIsTopChat),
});

export default connect( mapStateToProps, mapDispatchToProps )( SectChatRoomInfoAndDisplayGroupMember );