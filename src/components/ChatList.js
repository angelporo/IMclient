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
  FlatList,
  Text,
  View,
  StatusBar,
  Modal,
  ScrollView
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
const ChatIcon = (<EIcon iconStyle={ {} }
    name="chat" size={ 80 }
    color={ Color.LightGrey } />);

/**
 * 聊天记录组件
 * Param: param
 * Return: {undefined}
 **/
class ChatList extends Component {
  static navigationOptions = ({navigation})  => {
      const headerRight = (<FIcon.Button
          onPress={ () => navigation.state.params.chatListSwitchMenu() }
          iconStyle={{zIndex: 1000}}
          backgroundColor={Color.Black}
          name="plus"
          size={ 20 }
          iconStyle={{ marginRight: 10 }}
          color={ Color.White }
          /> );
      return {
          tabBarLabel: '信信',
          tabBarIcon: ({ tintColor }) => (
              <AddPerson hintColor={ tintColor } />
          ),
          headerRight: headerRight ,
        headerTitle: "信信",
        lazy: true,
        headerLeft: (<View/>),
        gesturesEnabled: false
      };
  };
  constructor (props) {
    super(props);
    this.state = {
      openGroupChatRoom: false,
      menuData: [{
      icon: (<Icon name="ios-person-add" size={ 24 } color={ Color.White } />),
      text: '发起群聊',
      onPress: this._openGroupChat.bind(this)
    }, {
      icon: (<Icon name="ios-person-add" size={ 24 } color={ Color.White } />),
      text: '添加好友',
      onPress: this._openAddFriend.bind(this)
    }],
      isMenuShow: false
    };
  }

  _switchMenu () {
    this.setState({
      isMenuShow: !this.state.isMenuShow
    });

  }

  componentWillMount () {
    this.props.navigation.setParams({ chatListSwitchMenu: this._switchMenu.bind(this)});
  }
  _openGroupChat () {
    this.setState({
      openGroupChatRoom: true
    });
  }
  _openAddFriend () {
    this.props.navigation.navigate('AddFriend',{data: 'hah'});
  }
  newGroupChat ({friends})  {
    alert(friends.length);
  }
  _renderRow = ({item}) => {
    const newItem = Object.assign(item);
    return (
      <Swipeout
        key={newItem.key}
        rightButtons={[{
          title: '删除',
          type: 'Delete',
          onPress: () => {
          }
        }]}
        >
        <ConversationCell
          avatar={ newItem.avatar }
          unReadMessageCount={ newItem.unReadMessageCount }
          name={newItem.name}
          latestTime={ newItem.latestTime }
          latestMessage={ newItem.latestMessage }
          onPress={ () => {
            this.props.navigation.navigate('ChatRoom',{ info: newItem});
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
    // console.log(RecentChatData);
    if (RecentChatData.length) {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={ Color.Black }
            StatusBarAnimation="fade"
            />
            <MenuBox
              isShow={ this.state.isMenuShow }
              data={this.state.menuData }
              flatListData={ RecentChatData }
              renderItem={ this._renderRow.bind( this ) }
              />
          <Modal
          onRequestClose={ () =>
              this.setState({ openGroupChatRoom: !this.state.openGroupChatRoom})}
            animationType={ "slide" }
              transparent={ false }
              onShow={() => this.setState({ isMenuShow: false })}
            visible={ this.state.openGroupChatRoom }>
            {/*// NOTE: 发送红包type选项(群发和单发) */}
              <NewGroupChatRoom
                onSubmit={this.newGroupChat.bind(this)}
          closeModal={() => this.setState({ openGroupChatRoom: !this.state.openGroupChatRoom })}
              />
          </Modal>
        </View>
      );
    } else {
      return (
        <View>
          <StatusBar
            barStyle="light-content"
            backgroundColor={ Color.Black }
            StatusBarAnimation="fade"
            />
          <View
            style={ styles.emptyMessage }
            >
            { ChatIcon }
            <Text
              style={styles.emptyMessageText}
              >暂无消息</Text>
          </View>
          <Modal
            animationType={"slide"}
            transparent={ false }
            onRequestClose={() => this.setState({ openGroupChatRoom: false})}
            visible={this.state.openGroupChatRoom}>
            {/*// NOTE: 发送红包type选项(群发和单发) */}
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
    let { avatar,
          unReadMessageCount,
          name,
          latestTime,
          latestMessage,
          onPress } = this.props;
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

function MenuBox({data,
                  isShow,
                  flatListData,
                  renderItem
                 }) {
    const menubox = (
      <View style={{position: 'relative',
                    width: '100%',
            height: '100%'}}>
        <View style={ styles.upIcon } >
          <EIcon name="triangle-up"
                 size={ 22 }
                 color={ Color.LightBlack } />
        </View >
        {
          data.map( (n, i) => (
            <TouchableHighlight
              key={i}
              onPress={ n.onPress }
              delayPressIn={0}
              delayPressOut={ 200 }
              style={styles.menuBox}
              >
              <View style={styles.menuItem}>
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
      </View>
    );
    return (
      <View style={{position: 'relative',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent'
            }}>
        <View
          style={[ styles.menuContent , { zIndex: 10, position: 'absolute', right: 10, top: 14 } ]}>
          {
            isShow ? menubox : (<View/>)
          }
      </View>
        <ScrollView>
        <FlatList
      data={ flatListData }
      keyExtractor={ (item, index) => item.id }
      renderItem={ renderItem }
        />
        </ScrollView>
      </View>
    );
}

MenuBox.propTypes = {
  data: PropTypes.array
}

const styles = EStyleSheet.create({
  menuContent: {
    width: 120,
    borderRadius: 5,
    backgroundColor: Color.LightBlack,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
    upIcon: {
        zIndex: 800,
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
    height: '100%',
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
