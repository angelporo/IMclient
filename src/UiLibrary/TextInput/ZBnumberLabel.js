/**
 * 发红包输入金额表单
 * Param: param
 * Return: { undefined }
 **/
import React, { PropTypes } from 'react';
import {
    StyleSheet,
    TextInput as TextInputOffical,
    Text,
    View
} from 'react-native';

import FontSize from '../FontSize';
import Color from '../Color';

export default class ZBnumberLabel extends React.Component {
    static propTypes = {
        // style: PropTypes.any,
        // labelText: PropTypes.string,
        // labelStyle: PropTypes.any,
      // textInputStyle: PropTypes.any,
      // type: PropTypes.string, // "message" or "money"
    }

    render() {
        let { style, labelStyle, labelText, textInputStyle, placeholder, type, unit} = this.props;

        return (
            <View
                style={[
                    styles.labelInput,
                    style
                ]}
            >
                <Text
                    style={[
                        styles.label,
                        labelStyle
                    ]}
                >
                    { labelText }
                </Text>

                <TextInputOffical
                    {...this.props}
                    style={[
                        styles.textInput,
                        textInputStyle
                    ]}
                  underlineColorAndroid="transparent"
                  />
                {
                  type === 'message' ? (<Text>{ unit }</Text>) : null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
  labelInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Color.White
  },
  label: {
    width: 90,
    textAlign: 'left',
    fontSize: FontSize.Annotation,
    paddingHorizontal: 10,
    color: Color.Black
  },
  textInput: {
    flex: 1,
    fontSize: FontSize.Content,
    textAlign: 'right',
    paddingRight: 6
  }
});
