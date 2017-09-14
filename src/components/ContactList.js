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
  ListView,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Text
} from 'react-native';
import * as userAction from '../reducers/user/userAction';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import WebIM from '../Lib/WebIM.js';
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
      title: '信信',
      headerLeft: null,
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
    await this.props.refresh();
    this.setState({ refreshing: false });
  }
  _renderRow ({item}) {
    return (
      <ListItem.Label
        icon={ item.avatar }
        labelText={ item.name }
        labelStyle={ item.status === 'online' ? styles.online : '' }
        iconPress={ () => alert('avatar perssed') }
        onPress={()=>{
          this.props.navigation.navigate('ChatRoom',{ info: item });
        }}
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
    return (
      <View style={styles.pageContainer}>
        <FlatList
          style={ styles.container }
          initialNumToRender={ 10 }
          data={ this.props.friendListData }
          renderItem={this._renderRow.bind(this)}
          refreshing={ this.state.refreshing }
          onRefresh={ this._onRefresh.bind(this) }
          ItemSeparatorComponent={ this._renderSeparator }
          />
      </View>
    );
  }
}




const styles = EStyleSheet.create({
  container: {
    height: '100%'
  },
  online: {
    color: Color.WechatGreen
  }
});

const mapStateToProps = state => ({
  friendListData: state.userReducer.friendList
});

const mapDispatchToProps = dispatch => ({
  refresh: compose( dispatch, userAction.getRosterByIM)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContackList);
