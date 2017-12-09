/**
 * 添加好友列表
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
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
  Color,
  TextInput
} from '../UiLibrary/';

class AddFriendComponent extends Component {
  static navigationOptions = props => {
    const headerRight = (<Icon.Button
                         onPress={ () => _this._switchMenu.bind(_this)() }
                         backgroundColor={Color.Black}
                         name="ellipsis-h"
                         size={ 26 }
                         color={ Color.White }
                         /> );
    return {
      title: '添加好友'
      // headerRight: headerRight
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.SerchIcon = (<EEcon iconStyle={ styles.searchIcon } name="search" size={ 30 } color="#4F8EF7" />);

  }
  componentDidMount() {

  }

  onSubMitEditing() {

  }

  onChangSearchValue (text) {
    this.setState({
      searchText: text
    });
  }
  render() {
    const { name } = this.props;
    return (
      <ScrollView
        style={styles.container}
        endFillColor={Color.backgroundGrey}
        >
        <TextInput.Search
          placeholder="输入对方手机号"
          isShowIcon={ false }
          style={ styles.searchBox }
          value={ this.state.searchText }
          onChangeValue={ this.onChangSearchValue.bind(this) }
          />
        <View style={styles.hintInfo}>
          <Text style={{fontSize: FontSize.Annotation}}>
            {`我的信信号:  ${ name }`}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundGrey
  },
  searchBox: {
    marginTop: 10
  },
  hintInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  }
});

const mapStateToProps = state => ({
  isFetch: state.userReducer.isFetch,
  name: state.userReducer.userName
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendComponent);
