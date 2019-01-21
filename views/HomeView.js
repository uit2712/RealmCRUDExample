/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';

export default class HomeView extends Component<Props> {

    static navigationOptions = {
        title: 'Home',
    };

    goToScreenListHeroes = () => {
        if (!this.props.navigation)
            return;

        const { navigate } = this.props.navigation;
        navigate('ListHeroes');
    }

    goToScreenListPowers = () => {
        if (!this.props.navigation)
            return;

        const { navigate } = this.props.navigation;
        navigate('ListPowers');
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomButton title='List heroes' fontSize={20} onPress={this.goToScreenListHeroes}/>
                <CustomButton title='List powers' fontSize={20} onPress={this.goToScreenListPowers}/>
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
    },
});