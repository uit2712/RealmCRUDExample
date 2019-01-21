import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ToastAndroid
} from 'react-native';

export default class CustomButton extends Component<Props> {
    constructor(props: Props) {
        super(props);

        let enableColor = this.props.enableColor || '#841584';
        let disabledColor = this.props.disabledColor || '#f76df7';
        let disabled = this.props.disabled || false;

        this.state = {
            title: this.props.title || 'Default button title',
            textColor: this.props.textColor || 'white',
            enableColor: enableColor,
            fontSize: this.props.fontSize || 20,
            onPressEvent: this.props.onPress || this.onPress,
            width: this.props.width || '80%',
            disabled: disabled,
            disabledColor: disabledColor,
            buttonColor: disabled ? disabledColor : enableColor,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title || this.state.title,
            textColor: nextProps.textColor || this.state.textColor,
            enableColor: nextProps.enableColor || this.state.enableColor,
            fontSize: nextProps.fontSize || this.state.fontSize,
            onPressEvent: nextProps.onPress || this.state.onPressEvent,
            width: nextProps.width || this.state.width,
            disabled: nextProps.disabled || false,
            disabledColor: nextProps.disabledColor || this.state.disabledColor,
            buttonColor: nextProps.disabled ? this.state.disabledColor : this.state.enableColor,
        });
    }

    onPress = () => {

    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: this.state.buttonColor, width: this.state.width }]}
                onPress={this.state.onPressEvent}
                disabled={this.state.disabled}>
                <Text style={{ color: this.state.textColor, fontSize: this.state.fontSize }}>{this.state.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {

    },
});