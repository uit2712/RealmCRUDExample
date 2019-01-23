/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class PowerView extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            power: this.props.power,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ power: nextProps.power || this.state.power });
    }

    deletePower = () => {

    }

    updatePower = () => {
        if (!this.state.power || !this.props.navigation)
            return;

        const { navigate } = this.props.navigation;
        navigate('UpdatePower', { power: this.state.power });
    }

    render() {
        if (!this.state.power)
            return <Text>Invalid power!</Text>

        return (
            <View style={styles.container}>
                <IconMaterialCommunityIcons
                    style={styles.icon}
                    name='delete-circle'
                    size={30}
                    color='red'
                    onPress={this.deletePower}/>
                <IconFontAwesome
                    style={styles.icon}
                    name='edit'
                    size={30}
                    color='green'
                    onPress={this.updatePower}
                />
                <Text style={styles.generalFontSize}>{this.state.power.powerName}</Text>
            </View>
        );
    }
}

export default withNavigation(PowerView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    generalFontSize: {
        fontSize: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
});