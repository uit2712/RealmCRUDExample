/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text, ToastAndroid } from 'react-native';
import CustomButton from './CustomButton';
import { updatePower } from '../controllers/PowerController';

export default class UpdatePowerView extends Component<Props> {

    static navigationOptions = {
        title: 'Update power',
    };

    constructor(props: Props) {
        super(props);

        let power, event;
        if (this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params) {
                power = this.props.navigation.state.params.power;
                event = this.props.navigation.state.params.event;
            }

        this.state = {
            power: power,
            event: event,
            disabledButtonUpdate: false,
        };
    }

    updateName = (name: string) => {
        if (!this.state.power)
            return;

        let power = this.state.power;
        if (!name || ''.includes(name)) {
            power.powerName = '';
            this.setState({ power, disabledButtonUpdate: true });
        } else {
            power.powerName = name;
            this.setState({ power, disabledButtonUpdate: false });
        }
    }

    updatePower = () => {
        let updatePowerResult = updatePower(this.state.power);
        ToastAndroid.show(updatePowerResult.message, ToastAndroid.SHORT);
        if (updatePowerResult.result) {
            if (this.state.event)
                this.state.event.emit('onUpdatePower');
        }
    }

    render() {
        if (!this.state.power)
            return <Text>Invalid power!</Text>

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.generalFontSize, styles.inputTitle]}>Power id:</Text>
                    <TextInput style={[styles.generalFontSize, styles.input]} value={`${this.state.power.powerId}`} editable={false}/>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.generalFontSize, styles.inputTitle]}>Power name:</Text>
                    <TextInput
                        style={[styles.generalFontSize, styles.input]}
                        value={this.state.power.powerName}
                        onChangeText={(text) => this.updateName(text)}
                    />
                </View>
                <CustomButton
                    title='Update'
                    disabled={this.state.disabledButtonUpdate}
                    enableColor='#841584'
                    disabledColor='#f76df7'
                    onPress={this.updatePower}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '90%',
        alignSelf: 'center',
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
        width: '65%',
        borderBottomColor: '#841584',
        borderBottomWidth: 1,
    },
    inputTitle: {
        width: '35%',
    },
});