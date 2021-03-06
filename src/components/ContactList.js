/**
 * 好友列表
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  View,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import * as userAction from '../reducers/user/userActions';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import WebIM from '../Lib/WebIM.js';
import config from "../config";
import {
  FontSize,
  Button,
  Color,
  ListItem
} from '../UiLibrary/';
const AddPerson = ({hintColor}) => (<Icon name="ios-chatbubbles" size={26} color={ hintColor } />);

class UserContackList extends Component {
  static navigationOptions = ({navigation})  => {
    const headerRight = (<Icon.Button
                         onPress={ () => navigation.state.params.chatListSwitchMenu() }
                         backgroundColor={Color.Black}
                         name="md-person-add"
                         size={ 20 }
                         color={ Color.White }
                         /> );
    return {
      tabBarLabel: '信信',
      tabBarIcon: ({ tintColor }) => (
        <AddPerson hintColor={ tintColor } />
      ),
      headerRight: headerRight,
      title: '好友',
      headerLeft: (<View/>),
      gesturesEnabled: false
    };
  };

  _switchMenu () {
    this.props.navigation.navigate('AddFriend',{data: 'hah'});
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }
  componentWillMount() {
    this.props.navigation.setParams({ chatListSwitchMenu:this._switchMenu.bind(this)});
  }

  async _onRefresh() {
    this.setState({
      refreshing: true
    });
    // await this.props.refresh();
    this.setState({ refreshing: false });
  }


  _handleIntoChatRoom ({item}) {
    const { addRecnentChatUnshift, rencentChatList } = this.props;
    // NOTE: 构建最近聊天数据结构, 添加到本地最近聊天数据中
    const has = rencentChatList.findIndex( n => n.id == item.name)
    const recentStruct = {
      latestMessage: "",
      latestTime: undefined,
      name: item.name,
      id: item.name,
      type: item.type,
      isTop: false,
      affiliations: 1,
      recentKey: undefined,
      groupMembers: [{
        userName: item.name,
        avatar: item.avatar,
      }],
      avatar: item.avatar,
      chatRoomHistory: []
    }
    if (has == -1) {
      // 不存在则添加到最近联系人列表中
      addRecnentChatUnshift({ content: recentStruct})
    }
    this.props.navigation.navigate('ChatRoom',{ info : recentStruct });
  }
  
  // 好友item
  _renderRow ({item}) {
    const avatar = (
      <Image
        source={{uri: `${config.domain}${item.avatar}`}}
        style={styles.avatar}
        />
    );
    item.type = "users"; // 设置进入聊天房间类型
    item.userid = item.name;
    return (
      <ListItem.Label
        icon={ avatar }
        labelText={ item.name }
        key={item.id}
        labelStyle={ item.status === 'online' ? styles.online : '' }
        iconPress={ () => alert('avatar perssed') }
        onPress={() => this._handleIntoChatRoom.bind(this)({item:item})}
        />
    );
  }

  _renderSectionHeader = (sectionData, sectionID, rowId) => {
    return (
      <ListItem.Header
        title={sectionID.toUpperCase()}
        />
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <ListItem.Separator
        key={`${sectionID}-${rowID}`}
        />
    );
  }
  render() {
    console.log(this.props)
    return (
      <FlatList
        style={ styles.container }
        initialNumToRender={ 10 }
        data={ this.props.friendListData }
        renderItem={this._renderRow.bind(this)}
        refreshing={ this.state.refreshing }
        onRefresh={ this._onRefresh.bind(this) }
        ItemSeparatorComponent={ this._renderSeparator }
        />
    );
  }
}




const styles = EStyleSheet.create({
  container: {
    height: '100%'
  },
  avatar: {
    borderRadius: 4,
    width: 45,
    height: 45
  }, 
  online: {
    color: Color.WechatGreen
  }
});

const mapStateToProps = state => ({
  friendListData: state.userReducer.friendList,
  rencentChatList: state.userReducer.userRecentChat, 
});

const mapDispatchToProps = dispatch => ({
  refresh: compose( dispatch, userAction.getRosterByIM),
  addRecnentChatUnshift: compose( dispatch, userAction.addRecnentChatUnshift),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContackList);
