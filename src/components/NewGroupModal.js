/**
 * 新建群聊(只是一个Modal, 并不是screen)
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Modal,
  StatusBar,
  FlatList,
  Image
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);
import {
  FontSize,
  Button,
  Color,
  TextInput,
  PageHeader,
  CheckBoxItem
} from '../UiLibrary/';

class NewGroupChatRoom extends Component {
  constructor(props) {
    super(props);
    console.log('haoyou', props.friendList);
    this.state = {
      touchDisabled: true,
      friendList: props.friendList,
      checkBoxIconName: "ios-checkmark-circle-outline",
      checkedFriend: [],  // 选中好友发起群聊
      searchValue: '',
      checkState: false
    };
  }
  componentDidMount() {

  }
  onSubmitGroupChatRooms () {
    alert('submit');
  }
  selectFriendAddGroupChat() {
    alert('ok');
  }

  switchCheckedBox(item) {
    let list = this.state.friendList;
    const IndexFromItem = list.findIndex( e => e.userId === item.userId );
    const ischeck = !item.ischeck;
    list[ IndexFromItem ].ischeck = ischeck;
    console.log(list);
    console.log(Array.from( list ) === list);
    if ( item.ischeck ) {
      // 添加列表
      this.setState({
        friendList: Array.from(list)
      });
    }else {
      // 删除列表
      this.deleteItemFriendList(item);
    }
  }
  deleteItemFriendList (item) {
      const list = this.state.checkedFriend;
      const IndexFromItem = list.findIndex( e => e.userId === item.userId);
      this.setState({
        checkedFriend: list.slice(0,
                                  IndexFromItem).
          concat(list.slice(IndexFromItem,
                            list.length - 1))
      });
  }
  handleDeleteSelectItem(item) {
    this.deleteItemFriendList.bind(this)(item);
  }
  _seletFriendRow ({ item }) {
    return (
      <TouchableOpacity
        onPress={() => this.deleteItemFriendList.bind(this)(item)}
        style={styles.selectListBox}>
        <Image
          source={{uri: item.avatar}}
          style={ styles.selectFriendFace }
          resizeMode={ Image.resizeMode.content }
          />
      </TouchableOpacity>
    );
  }
  _renderRow ({item}) {
    return (
      <TouchableHighlight style={styles.itemsBox}>
        <View style={styles.items}>
          <View
            style={ styles.checkboxIcon }>
            <CheckBoxItem
              checked={ item.ischeck }
              style={ styles.checkBoxIcon }
              onChange={ () => this.switchCheckedBox.bind(this)(item)}/>
          </View>
          <Image
            source={{ uri: item.avatar}}
            style={styles.avatar}
            />
          <Text> {item.name}{ item.ischeck } </Text>
        </View>
      </TouchableHighlight>
    );
  }

  onChangSearchValue (text) {
    this.setState({
      searchValue: text
    })
  }
  _separator = () => {
    return <View style={{height: '100%',backgroundColor:Color.White, width: 4}}/>;
    }
  // TODO: 添加搜索定位功能
  // TODO : 添加选中列表组件
  render() {
    const { closeModal } = this.props;
    const CloseButton = (<TouchableOpacity
                         style={styles.closeBtn}
                         onPress={ closeModal }>
                         <Text style={{color: Color.White}}>取消</Text>
                         </TouchableOpacity>);
    const openMune = ( <TouchableOpacity
                       style={ styles.MuneIcon }
                       disabled={ this.state.touchDisabled }
                       onPress={ this.onSubmitGroupChatRooms.bind(this)}>
                       <Text style={this.state.touchDisabled ?
                                    {color: Color.Grey, fontWeight: 'bold'} :
                                    {color: Color.White, fontWeight: 'bold'}
                                   }>完成</Text>
                       </TouchableOpacity> );
    const Textcomponent = (
      <Text style={ styles.title }>选择联系人</Text>
    );
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor={ "#E95F38" }
          StatusBarAnimation="fade"
          />
        <PageHeader
          style={{backgroundColor: Color.Black }}
          LeftComponent={ CloseButton }
          RightComponent={ openMune }
          TextComponent={ Textcomponent }
          />
          <TextInput.Search
            placeholder="输入对方手机号"
            style={ styles.searchBox }
            value={ this.state.searchValue }
            onChangeValue={ this.onChangSearchValue.bind(this) }
            />
        { /* 选中好友展示列表 */}
          <FlatList
            data={ this.state.checkedFriend }
            style={ styles.selectedFriendContainer }
            horizontal={true}
            renderItem={ this._seletFriendRow.bind(this) }
            getItemLayout={(data, index) => ( {length: 50, offset: 50 * index, index} )}
            ItemSeparatorComponent={this._separator}
            />
        <View style={styles.friendListTitl}>
          <Text style={{color: Color.Grey}}>选择加入的好友</Text>
        </View>
        <FlatList
          data={ this.state.friendList }
          style={styles.flatlist}
          renderItem={ this._renderRow.bind(this) }
          />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingLeft: FontSize.White
  },
  selectedFriendContainer: {
  },
  seachContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  selectListBox: {
    width: 50,
    height: 50,
  },
  selectFriendFace: {
    width: 40,
    height: 40,
    overflow: 'hidden'
  },
  closeBtn: {
    padding: 9
  },
  MuneIcon: {
    padding: 9
  },
  friendListTitl: {
    backgroundColor: Color.BackgroundGrey,
    paddingLeft: 16,
    paddingVertical: 4
  },
  title: {
    color: Color.White,
    fontSize: FontSize.Content,
    fontWeight: 'bold'
  },
  searchBox: {
    borderColor: Color.BackgroundGrey,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexShrink: 1,
  },
  flatlist: {
    height: '100%',
    backgroundColor: Color.BackgroundGrey
  },
  itemsBox: {
    backgroundColor: Color.White,
    paddingLeft: 16
  },
  items :{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    borderColor: Color.BackgroundGrey,
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  checkboxIcon: {
    alignItems: 'flex-start'
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 16
  },
  checkBoxIcon: {
    paddingVertical: 10,
    paddingRight: 16
  }
});

const mapStateToProps = state => ({
  isFetch: state.userReducer.isFetch,

  friendList: state.userReducer.friendList
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupChatRoom );
