/**
 * 聊天会话列表
 * Param: param
 * Return: {undefined}
 **/
import React, { Component } from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ListView,
  FlatList,
  Text,
  View,
  StatusBar,
  Modal
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FontSize,
  Swipeout,
  Color,
  Badge,
  ListItem
} from '../UiLibrary/';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from 'react-native-animatable';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import NewGroupChatRoom from './NewGroupModal';
const AddPerson = ({hintColor}) => (<Icon name="ios-chatbubbles" size={26} color={ hintColor } />);
const ChatIcon = (<EIcon iconStyle={ {} } name="chat" size={ 80 } color={ Color.LightGrey } />);

/**
 * 聊天记录组件
 * Param: param
 * Return: {undefined}
 **/
class ChatList extends Component {
  static navigationOptions = ({navigation})  => {
    const headerRight = (<FIcon.Button
                         onPress={ () => navigation.state.params.chatListSwitchMenu() }
                         backgroundColor={Color.Black}
                         name="plus"
                         size={ 20 }
                         iconStyle={{marginRight: 10}}
                         color={ Color.White }
                         /> );
    return {
      tabBarLabel: '信信',
      tabBarIcon: ({ tintColor }) => (
        <AddPerson hintColor={ tintColor } />
      ),
      headerRight: headerRight,
      title: '信信',
      headerLeft: null,
      gesturesEnabled: false
    };
  };
  _switchMenu () {
    this.setState({menuIsShow: !this.state.menuIsShow});
  }

  constructor () {
    super();
    this.menuData = [{
      icon: (<Icon name="ios-person-add" size={ 24 } color={ Color.White } />),
      text: '发起群聊',
      onPress: this._openGroupChat.bind(this)
    }, {
      icon: (<Icon name="ios-person-add" size={ 24 } color={ Color.White } />),
      text: '添加好友',
      onPress: this._openAddFriend.bind(this)
    }];
    this.state = {
      menuAnimation: 'fadeInDownBig',
      menuIsShow: false,
      openGroupChatRoom: false
    };
  }
  componentWillMount () {
    this.props.navigation.setParams({ chatListSwitchMenu:this._switchMenu.bind(this)});
  }
  _openGroupChat () {
    this.setState({
      openGroupChatRoom: true,
      menuIsShow: false
    });
  }
  _openAddFriend () {
    this.setState({
      menuIsShow: false
    });
    this.props.navigation.navigate('AddFriend',{data: 'hah'});
  }

  _renderRow = ({item}) => {
    return (
      <Swipeout
        key={item.key}
        rightButtons={[{
          title: '删除',
          type: 'Delete',
          onPress: () => {

          }
        }]}
        >
        <ConversationCell
          avatar={ item.avatar }
          unReadMessageCount={ item.unReadMessageCount }
          name={item.name}
          latestTime={ item.latestTime }
          latestMessage={ item.latestMessage }
          onPress={ () => {
            this.props.navigation.navigate('ChatRoom',{ info: item});
          }}
          />
      </Swipeout>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <ListItem.Separator
        paddingLeft={10}
        key={`${sectionID}-${rowID}`}
        />
    );
  }

  render() {
    let { RecentChatData } = this.props;
    if (true) {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={ "#E95F38" }
            StatusBarAnimation="fade"
            />
          <MenuBox
            animation={ this.state.menuAnimation }
            isShow={ this.state.menuIsShow }
            data={this.menuData}/>
          <FlatList
            data={ RecentChatData }
            renderItem={ this._renderRow.bind(this) }
            />
          <Modal
            animationType={"slide"}
            transparent={ false }
            visible={this.state.openGroupChatRoom}>
            {/*// NOTE: 发送红type选项(群发和单发) */}
            <NewGroupChatRoom
            closeModal={() => this.setState({ openGroupChatRoom: false})}
            />
            </Modal>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={styles.emptyMessage}
            >
            { ChatIcon }
            <Text
              style={styles.emptyMessageText}
              >暂无消息</Text>
          </View>
          <Modal
            animationType={"slide"}
            transparent={ false }
            visible={this.state.openGroupChatRoom}>
            {/*// NOTE: 发送红type选项(群发和单发) */}
            <NewGroupChatRoom
            closeModal={() => this.setState({ openGroupChatRoom: false})}
            />
            </Modal>
        </View>
      );
    }
  }
}

class ConversationCell extends React.Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.any.isRequired,
    latestTime: PropTypes.string.isRequired,
    latestMessage: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { avatar, unReadMessageCount, name, latestTime, latestMessage, onPress } = this.props;
    return (
      <TouchableHighlight
        delayPressIn={ 0 }
        delayPressOut={ 130 }
        onPress={ onPress }
        >
        <View
          style={ styles.ConversationCell }
          >
          <View
            style={styles.leftBox}
            >
            <Image
              source={{
                uri: avatar
              }}
              style={styles.avatar}
              />

            <Badge
              style={styles.cellBadge}
              unReadMessageCount={unReadMessageCount}
              height={18}
              />
          </View>
          <View
            style={styles.boxRight}
            >
            <View
              style={styles.boxCeil}
              >
              <Text
                style={styles.sessionName}
                numberOfLines={1}
                >{name}</Text>
              <Text
                style={styles.latestTime}
                >{latestTime}</Text>
            </View>
            <Text
              style={styles.boxFloor}
              numberOfLines={1}
              >{latestMessage}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

function MenuBox ({data, animation, duration, isShow}) {
  if(!isShow) return null;
  return (
    <Animatable.View
      animation={ animation }
      duration={ duration || 600 }
      style={[styles.menuContent]}>
      <View style={styles.upIcon}>
        <EIcon name="triangle-up"
               size={ 22 }
               color={ Color.LightBlack } />
      </View>
      {
        data.map( (n, i) => (
          <TouchableHighlight
            key={i}
            onPress={n.onPress}
            style={styles.menuBox}
            >
            <View style={styles.menuItem}
                  >
              { n.icon }
              <Text style={{color: Color.White,
                            textAlign: 'center',
                            marginLeft: 12,
                            fontSize: 16
                    }}>{ n.text }</Text>
            </View>
          </TouchableHighlight>
        ))
      }
    </Animatable.View>
  )
}

MenuBox.propTypes = {
  data: PropTypes.array,
  animation: PropTypes.string,
  duration: PropTypes.number,
  isShow: PropTypes.bool
}

const styles = EStyleSheet.create({
  menuContent: {
    opacity: 0,
    width: 120,
    borderRadius: 5,
    backgroundColor: Color.LightBlack,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 14,
    zIndex: 20
  },
  upIcon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 12,
    top: -16
  },
  menuBox: {
    paddingVertical: 6,
    width: '100%'
  },
  menuItem: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Color.BackgroundGrey
  },
  ConversationCell: {
    flexDirection: 'row',
    backgroundColor: Color.White
  },
  leftBox: {
    padding: 6
  },
  avatar: {
    borderRadius: 4,
    width: 50,
    height: 50
  },
  cellBadge: {
    position: 'absolute',
    top: 2,
    right: 0
  },
  boxRight: {
    flex: 1,
    padding: 10
  },
  boxCeil: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sessionName: {
    fontSize: FontSize.Content,
    color: Color.Black
  },
  boxFloor: {
    fontSize: FontSize.Annotation,
    color: '#9A9A9A'
  },
  latestTime: {
    fontSize: FontSize.Annotation,
    color: '#B3B3B3'
  },
  emptyMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyMessageImage: {
    opacity: 0.6
  },
  emptyMessageText: {
    color: Color.LightBlack,
    fontSize: FontSize.Annotation
  }
});
const mapStateToProps = state =>({
  RecentChatData: state.userReducer.userRecentChat
});


const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
