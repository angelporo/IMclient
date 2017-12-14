/**
 * 输入设置页面(左上角为完成按钮, 主要内容只有一个input)
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput
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
} from '../UiLibrary/';

class SetInputComponent extends Component {
    static navigationOptions = (props, navigator) => {
        const headerRight = (
            <TouchableOpacity
            style={styles.submitButton}
            onPress={ () => props.navigation.state.params.onHandleSubmit() }
            >
            <Text style={{ color: Color.WechatGreen }}>完成</Text>
            </TouchableOpacity>);
        return {
            title: props.navigation.state.params.title,
            headerRight: headerRight
        };
    }

    constructor(props) {
      super(props);
        if (__DEV__) {
            if (typeof props.navigation.state.params.value !== 'string') {
                throw new Error('设置单个字符串属性value必须为 String');
            }
        }
        this.state = {
            value: props.navigation.state.params.value
        };
    }
    onHandleSubmit () {
        console.log(this.props);
        this.props.navigation.state.params.onSubmit({value:this.state.value})
    }

    componentWillMount() {
        if(__DEV__) {
            if(typeof this.props.navigation.state.params.title !== 'string'){
                throw new Error('设置单个属性出入title不正确');
            }
        }

        this.props.navigation.setParams({
            onHandleSubmit: this.onHandleSubmit.bind(this),
            title: this.props.navigation.state.params.title
        });
    }

    componentDidMount() {
        _this = this;
    }
    onChangeValue (value) {
        this.setState({
            value,
        });
    }
    render() {
        return (
            <View
            style={styles.container}
            >
            <TextInput
            style={ styles.textInput }
            underlineColorAndroid='transparent'
            value={ this.state.value }
            onChangeText={ this.onChangeValue.bind(this) }
            />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: Color.White
    },
    submitButton: {
        backgroundColor: Color.Black,
        marginRight: 16
    },
    textInput: {
        flex: 1,
        height: 45
    },
});

const mapStateToProps = state => ({
    isFetch: state.userReducer.isFetch
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)( SetInputComponent );
