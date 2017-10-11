/**
 * 修改手机号页面
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Modal,
  TouchableOpacity
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
  PageHeader
} from '../UiLibrary/';

class AmendUserMobile extends Component {
  static navigationOptions = props => {
    return {
      title: '绑定手机号',
      // headerRight: headerRight
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      changeMobileSwitch: false,
      newMobile: ''
    };
    this.mobileIcon = (<FIcon name="mobile-phone" size={200} color={Color.Grey}/>);
  }
  componentDidMount() {
    _this = this;
  }
  onChangeMobileBtn() {
    this.setState({
      changeMobileSwitch: true
    });
  }
  onChangeValue (newMobile) {
    // 手动修改手机号码
    this.setState({newMobile});
  }
  onSubMitEditingMobile () {
    // 手动提交页面
  }
  closeModal () {
    this.setState({
      changeMobileSwitch: false
    });
  }
  handleSendMobileVerify () {
    alert('ok');
  }
  render() {
    const { mobile } = this.props;
  const CloseButton = (<TouchableOpacity
                       style={styles.closeBtn}
                       onPress={ this.closeModal.bind(this) }>
                       <Text style={{color: Color.White}}>取消</Text>
                       </TouchableOpacity>);
    const openMune = this.state.newMobile ?
          ( <TouchableOpacity
                     onPress={ this.handleSendMobileVerify.bind(this) }>
                     <Text style={{color: Color.WechatGreen}}>下一步</Text>
            </TouchableOpacity> )
          :
          (<TouchableOpacity style={{width: 40}}></TouchableOpacity>);
  const Textcomponent = (
    <Text style={{color: Color.White, fontSize:FontSize.Main}}>更换手机号</Text>
  );

    return (
      <View
        style={ styles.container }
        >
        <View style={styles.MobileIcon}>
          {
            this.mobileIcon
          }
          <Text style={styles.mobile}>{`你的手机号: ${ mobile }`}</Text>
        </View>
        <Button
          style={styles.changeMobileBtn}
          textStyle={ styles.changeMobileBtnText }
          onPress={ this.onChangeMobileBtn.bind(this) }
          >
          更改手机号
        </Button>
        <Modal
          animationType={"slide"}
          onRequestClose={ () => this.setState({isShowModal: false}) }
          transparent={ false }
          style={{backgroundColor: Color.BackgroundGrey}}
          visible={this.state.changeMobileSwitch}>
          <View style={{height: '100%', backgroundColor: Color.BackgroundGrey}}>
          <PageHeader
            style={{ backgroundColor: Color.Black }}
            LeftComponent={ CloseButton }
            RightComponent={ openMune }
            TextComponent={ Textcomponent }
            />
          <View style={styles.changeNameBgd}>
            <Text style={styles.changeMobilHintText}>
              更改手机后, 下次登录使用新手机号登录</Text>
            <TextInput.Search
              placeholder={ '请填写手机号码' }
              value={ this.state.newMobile }
              style={{backgroundColor: Color.White}}
              onChangeValue={ this.onChangeValue.bind(this) }
              onSubmitEditing={ this.onSubMitEditingMobile.bind(this) }
              keyboardType
              />
          </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BackgroundGrey,
    paddingHorizontal: 20
  },
  MobileIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mobile: {
    fontSize: FontSize.Main
  },
  changeMobileBtn: {
    marginVertical: 40,
    borderColor: Color.WechatGreen,
    backgroundColor: Color.WechatGreen,
    paddingVertical: 5
  },
  changeMobileBtnText: {
    color: Color.White,
    fontSize: FontSize.Main
  },
  changeMobilHintText: {
    fontSize: FontSize.Main,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginVertical: 12,
    lineHeight: 24,
    color: Color.LightBlack
  }
});

const mapStateToProps = state => ({
  mobile: state.userReducer.mobile
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)( AmendUserMobile );
