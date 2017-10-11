/**
 * 用户个人中心(我的)页面
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { CachedImage } from "react-native-img-cache";
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);
import {
  FontSize,
  Button,
  Color,
  TextInput,
  ListItem
} from '../UiLibrary/';

const AddPerson = ({hintColor}) => (<Icon
                                   name="ios-chatbubbles"
                                   size={26}
                                   color={ hintColor }
                                   />);

class UserCenter extends Component {
  static navigationOptions = props => {
    const headerRight = (<Icon.Button
                         onPress={ () => _this._switchMenu.bind(_this)() }
                         backgroundColor={ Color.Black }
                         name="ellipsis-h"
                         size={ 26 }
                         color={ Color.White }
                         /> );
    return {
      title: '我',
      // headerRight: headerRight,
      tabBarIcon: ({ tintColor }) => (
        <AddPerson hintColor={ tintColor } />
      ),
      headerLeft: null
    };
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  _onPressWallet() {
    this.props.navigation.navigate('UserWallet');
  }

  componentDidMount() {
    _this = this;
  }

  render() {
    return (
      <ScrollView
        style={ styles.container }
        >
        <TouchableHighlight
          delayPressOut={ 200 }
          delayPressIn={ 0 }
          onPress={ () => this.props.navigation.navigate('UserInfo') }
          >
          <View
            style={[styles.cell]}
            >
            <View
              style={styles.leftBox}
              >
              <CachedImage
                component={ Image }
                source={{
                  uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                }}
                style={ styles.avatar }
                mutable
                />
              <View
                style={styles.userInfo}
                >
                <Text
                  style={styles.name}
                  >
                  liyuan
                </Text>

                <Text
                  style={ styles.info }
                  >
                  手机号: 167263453
                </Text>
              </View>
            </View>

            <EIcon name="chevron-thin-right" color={Color.Grey} />
          </View>
        </TouchableHighlight>

        <ListItem.Header/>

        <ListItem.Label
          onPress={this._onPressWallet.bind(this)}
          icon={(<EIcon name="wallet" color={ Color.Grey } size={ 28 }/>)}
      labelText="钱包"
        />
        <ListItem.Separator />
        <ListItem.Label
      onPress={this._onPressWallet.bind(this)}
      icon={(<FIcon name="gear" color={ Color.Grey } size={ 30 }/>)}
      labelText="设置"
        />
        <ListItem.Separator />
        </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BackgroundGrey,
    paddingTop: 20
  },
  cell: {
    backgroundColor: Color.White,
    borderWidth: 1,
    borderColor: Color.LittleGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  avatar: {
    borderWidth: 1,
    borderColor: Color.LightGrey,
    borderRadius: 6,
    marginRight: 15,
    height: 60,
    width: 60
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  userInfo: {
    justifyContent: 'space-between',
    marginVertical: 3
  },
  name: {
    fontSize: FontSize.Content,
    fontWeight: '500'
  },
  info: {
    fontSize: FontSize.Annotation
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter );
