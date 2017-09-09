/**
 * 好友列表
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    ListView,
    RefreshControl,
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
    ListItem
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
        alert('change state');
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: function (r1, r2) {
                return r1.userId !== r2.userId;
            },
            // REVIEW: s1, s2 的返回值不确定，需要再次确认
            sectionHeaderHasChanged: function (s1, s2) {
                return s1 !== s2;
            }
        });
        this.state = {
            refreshing: false,
            friendData: this.props.friendListData
        };
    }
    componentDidMount() {
        _this = this;
    }

    _onRefresh() {
        this.setState({
            refreshing: true
        })
        this.timer = setTimeout( () => this.setState({refreshing: false}), 2000);

    }
    _renderRow (row) {
        return (
            <ListItem.Label
            icon={ row.avatar }
            labelText={ row.name }
            labelStyle={ row.status === 'online' ? styles.online : '' }
            onPress={()=>{
                this.props.navigation.navigate('ChatRoom',{ info: row });
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
            <ListView
            refreshControl={
                <RefreshControl
                refreshing={ this.state.refreshing }
                onRefresh={ this._onRefresh.bind(this) }
                />
            }
            style={styles.container}
            dataSource={this.ds.cloneWithRowsAndSections(this.state.friendData)}
            renderSectionHeader={this._renderSectionHeader}
            renderSeparator={this._renderSeparator}
            renderRow={this._renderRow.bind(this)}
            />
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    online: {
        color: Color.WechatGreen
    }
});

const mapStateToProps = state => ({
      friendListData: state.userReducer.friendList
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserContackList);
