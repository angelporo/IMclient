/**
 * 通讯录
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FontSize,
  Button,
  Color,
  TextInput
} from '../UiLibrary/';
const AddPerson = ({hintColor}) => (<Icon name="ios-chatbubbles" size={26} color={ hintColor } />);

class UserContackList extends Component {
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
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    _this = this;
  }

  render() {
    return (
      <View
        style={styles.container}
        >
        <Text>通讯录</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 70,
    paddingHorizontal: 20
  }
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserContackList);
