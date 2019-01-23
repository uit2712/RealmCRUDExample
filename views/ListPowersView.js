/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid } from 'react-native';
import Power from '../models/Power';
import PowerView from './PowerView';
import CreatePowerView from './CreatePowerView';

export default class ListPowersView extends Component<Props> {

    static navigationOptions = {
        title: 'List powers',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            powers: [],
        };
    }

    showListPowers = () => {
        let result;
        result = this.state.powers.map((power: any) =>
            <PowerView key={power['powerId']} power={new Power(power['powerId'], power['powerName'])} event={this.updateEvent}/>
        )

        return <ScrollView style={styles.listViewContainer}>{result}</ScrollView>
    }

    render() {
        return (
            <View style={styles.container}>
                <CreatePowerView event={this.updateEvent}/>
                {this.showListPowers()}
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
    listViewContainer: {
        flex: 1,
        width: '100%',
    },
});