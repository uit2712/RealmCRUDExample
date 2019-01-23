/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ToastAndroid,
    Keyboard
} from 'react-native';
import CustomButton from './CustomButton';
import Power from '../models/Power';

export default class CreatePowerView extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            power: new Power(),
            event: this.props.event,
            disableButtonAdd: true,
        }
    }

    setPowerName = (powerName: string) => {
        if (!this.state.power)
            return;

        let power = this.state.power;
        power.powerName = powerName;
        if (powerName == null || ''.includes(powerName))
            this.setState({ power, disableButtonAdd: true });
        else this.setState({ power, disableButtonAdd: false });
    }

    resetPowerInfo = () => {
        this.setState({ power: new Power(), disableButtonAdd: true });
        Keyboard.dismiss();
    }

    createPower = () => {

    }

    render() {
        if (!this.state.power)
            return <Text>Invalid power!</Text>

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.infoTitle, styles.generalFontSize]}>Power name:</Text>
                    <TextInput
                        style={[styles.input, styles.generalFontSize]}
                        value={this.state.power.powerName}
                        onChangeText={(text) => this.setPowerName(text)}
                        onSubmitEditing={this.createPower} />
                    <CustomButton 
                        title='Create'
                        width={'20%'}
                        onPress={this.createPower}
                        disabled={this.state.disableButtonAdd}
                        enableColor='#841584'
                        disabledColor='#f76df7' />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: '10%',
        marginTop: 10,
    },
    generalFontSize: {
        fontSize: 20,
    },
    infoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        width: '40%',
        borderBottomWidth: 1,
        borderBottomColor: '#841584',
        marginHorizontal: 10,
    },
    infoTitle: {
        width: '30%',
    },
});