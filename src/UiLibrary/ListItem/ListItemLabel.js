/**
 *
 * 标签样式 Item
 */
import React, { PropTypes } from 'react';
import {
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';
import Color from '../Color';
import FontSize from '../FontSize';
import ListItemArrow from './ListItemArrow.js';

export default class Label extends React.Component {
    static propTypes = {
        style: PropTypes.any,
        icon: PropTypes.element,
        iconStyle: PropTypes.any,
        labelText: PropTypes.string,
        labelStyle: PropTypes.any,
        rightComponent: PropTypes.any,
        // rightComponent 为文本时候生效
        textStyle: PropTypes.any,
        onPress: PropTypes.func,
        iconPress: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    _renderIcon = () => {
        let { icon, iconStyle, iconPress } = this.props;
        if ( icon ) {
            if(iconPress) {
                return (
                    <TouchableWithoutFeedback onPress={ iconPress }>
                      <View style={[styles.iconStyle,
                            iconStyle]}>
                          { icon }
                    </View>
                    </TouchableWithoutFeedback>
                );
            }
          return (
            <View style={[styles.iconStyle, iconStyle]}>
              { icon }
            </View>
            );
        } else {
            return null;
        }
    }

    _renderRightCompoent = () => {
        let { rightComponent, textStyle } = this.props;
        if (typeof rightComponent === 'string' || typeof rightComponent === 'number') {
            return (
                <Text
                    style={[
                        styles.textStyle,
                        textStyle
                    ]}
                >{rightComponent}</Text>
            );
        } else if (typeof rightComponent === 'function') {
            return rightComponent();
        }

        return null;
    }

    _renderRightArrow() {
        let { onPress } = this.props;
        if (onPress) {
          return (
            <View style={styles.rightArrowIconBox}>
              <EIcon name="chevron-thin-right" color={Color.Grey} />
            </View>
            );
        }

        return null;
    }

    render() {
        let { labelText, labelStyle, onPress, style } = this.props;

        let displayView = (
            <View
                style={[
                    styles.labelContainer,
                    style
                ]}
            >
                <View
                    style={styles.labelLeftComponent}
                >
                    {this._renderIcon()}
                    <Text
                        style={[
                            styles.labelStyle,
                            labelStyle
                        ]}
                    >
                        { labelText }
                    </Text>
                </View>
                <View
                    style={styles.labelRightComponent}
                >
                    {this._renderRightCompoent()}
                    {this._renderRightArrow()}
                </View>
            </View>
        );


        if (onPress) {
            return (
                <TouchableHighlight
                delayPressOut={ 200 }
                delayPressIn={ 0 }
                    onPress={onPress}
                >
                    { displayView }
                </TouchableHighlight>
            );
        } else {
            return displayView;
        }
    }
}

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        backgroundColor: Color.White,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 6
    },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    },
    labelLeftComponent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    labelStyle : {
        fontSize: FontSize.Main,
      color: Color.Black,
    },
    labelRightComponent: {
        flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textStyle: {
        color: Color.LightBlack,
        fontSize: FontSize.Content
    },
  rightArrowIconBox: {
    marginTop: 1
  }
});
