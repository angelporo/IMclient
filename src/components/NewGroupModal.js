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
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  PixelRatio
} from 'react-native';
import * as Animatable from 'react-native-animatable';
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
    this.state = {
      touchDisabled: true,
      friendList: props.friendList,
      checkBoxIconName: "ios-checkmark-circle-outline",
      checkedFriend: [],  // 选中好友发起群聊
      searchValue: '',
      checkState: false,
      displaySelectBoxWidth: 0,
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
    let IndexFromItem = list.findIndex( e => e.userId === item.userId );
    list[IndexFromItem].ischeck = !list[IndexFromItem].ischeck;
    const newList = list.filter(n => n.ischeck);
    if ( item.ischeck ) {
      // 添加列表
      this.setState({
        friendList: Array.from(list),
        checkedFriend: Array.from(newList),
        displaySelectBoxWidth: newList.length  * 44 > Dimensions.get('window').width * 7 ? this.state.displaySelectBoxWidth : newList.length * PixelRatio.get() * 44
      }, () => {
        if (newList.length > 1) {
          this._displayFlatList.scrollToEnd();
        }
      });
    }else {
      // 删除列表
      this.deleteItemFriendList.bind(this)(item);
    }
  }

  deleteItemFriendList (item) {
    const list = this.state.checkedFriend;
    let friendList = this.state.friendList;
    const IndexFromItem = list.findIndex( e => e.userId === item.userId);
    let friendIndex = this.state.friendList.findIndex( e => e.userId === item.userId);
    friendList[friendIndex].ischeck = false;
    const newSelecetFriendList = friendList.filter(n => n.ischeck);
    this.setState({
      friendList: Array.from( friendList ),
      checkedFriend: Array.from( newSelecetFriendList ),
      displaySelectBoxWidth: newSelecetFriendList.length * PixelRatio.get() * 44
    });
  }
  _keyExtractor = (item, index) => item.key
  _seletFriendRow ({ item, index }) {
    return (
      <View>
      <TouchableOpacity
        delayPressIn={ 200 }
        delayPressOut={ 200 }
        onPress={ () => this.deleteItemFriendList.bind(this)(item) }
        style={ styles.selectListBox }>
        <Image
          source={{uri: item.avatar }}
          style={ styles.selectFriendFace }
          resizeMode={ Image.resizeMode.content }
          />
      </TouchableOpacity>
      </View>
    );
  }
  _renderRow ({item, index}) {
    return (
      <TouchableHighlight
        underlayColor={Color.LightGrey}
        delayPressIn={0}
        delayPressOut={100}
        onPress={() => this.switchCheckedBox.bind(this)(item)}
        style={styles.itemsBox}>
        <View style={styles.items}>
          <View
            style={ styles.checkboxIcon }>
            <CheckBoxItem
              checked={ item.ischeck }
              onPress={() => this.switchCheckedBox.bind(this)(item)}
              style={ styles.checkBoxIcon }
              />
          </View>
          <Image
            source={{ uri: item.avatar }}
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
    });
  }
  _separator () {
    return <View style={{height: '100%',backgroundColor:Color.White, width: 4}}/>;
  }
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
        { /* 选中好友展示列表 */}
        <View style={ styles.selectFriendBox }>
          {
              /*
          <Animatable.View
            transition={["width"]}
            style={{width: this.state.displaySelectBoxWidth} }>
            <ScrollView
              contentContainerStyle={ styles.selectedFriendContainer}
              horizontal={ true }
              showsHorizontalScrollIndicator={true}
              ref={ ref => this.dispalyItem = ref}
                >
                */
                }
              <FlatList
                data={ this.state.checkedFriend }
                horizontal={true}
                style={[styles.selectedFriendContainer, { width: this.state.displaySelectBoxWidth }]}
                renderItem={ this._seletFriendRow.bind(this) }
                ref={(flatList) => this._displayFlatList = flatList }
                keyExtractor={ this._keyExtractor }
                scrollToEnd={ () => {}}
                getItemLayout={(data, index) => ( {length: 44, offset: 44 * index, index} )}
                ItemSeparatorComponent={this._separator}
                />
                {/*

              </ScrollView>
              </Animatable.View>
            */}

          <TextInput.Search
            placeholder="搜索手机号"
            style={ styles.searchBox }
            isShowIcon={this.state.checkedFriend.length === 0}
            value={ this.state.searchValue }
            onChangeValue={ this.onChangSearchValue.bind(this) }
            />
        </View>
        <View style={styles.friendListTitl}>
          <Text style={{color: Color.Grey}}>选择加入的好友</Text>
        </View>
        <View>
        <FlatList
          data={ this.state.friendList }
          style={styles.flatlist}
          keyExtractor={this._keyExtractor}
          renderItem={ this._renderRow.bind(this) }
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingLeft: FontSize.White
  },
  selectFriendBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectedFriendContainer: {

  },
  seachContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  selectListBox: {
    width: 40,
    height: 40,
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
    flexShrink: 1
  },
  flatlist: {
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
  friendList: state.userReducer.friendList.map((n, i) => {
    n.ischeck = false;
    n.key = i;
    return n;})
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupChatRoom );
