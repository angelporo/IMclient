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
  View
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
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
const AddPerson = ({hintColor}) => (<Icon name="ios-chatbubbles" size={26} color={ hintColor } />);
const ChatIcon = (<EIcon iconStyle={ {} } name="chat" size={ 80 } color={ Color.LightGrey } />);
/**
 * 聊天记录组件
 * Param: param
 * Return: {undefined}
 **/
class ChatList extends Component {
  static navigationOptions = props  => {
    const headerRight = (<Icon.Button
                         onPress={ () => _this._switchMenu.bind(_this)() }
                         backgroundColor={Color.Black}
                         name="ios-person-add"
                         size={ 24 }
                         color={ Color.White }
                         /> );
    return {
      tabBarLabel: '通讯录',
      tabBarIcon: ({ tintColor }) => (
        <AddPerson hintColor={ tintColor } />
      ),
      headerRight: headerRight,
      title: '通讯录',
      headerLeft: null,
      gesturesEnabled: false
    };
  };
  _switchMenu () {
    alert('change state');
  }

  constructor () {
    super();
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
          <FlatList
             data={ RecentChatData }
            renderItem={ this._renderRow.bind(this) }
            />
        </View>
      );
    } else {
      return (
        <View
          style={styles.emptyMessage}
          >
          { ChatIcon }
          <Text
            style={styles.emptyMessageText}
            >暂无消息</Text>
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

const styles = EStyleSheet.create({
  container: {
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
