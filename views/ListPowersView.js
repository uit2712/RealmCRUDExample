/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid } from 'react-native';
import { getAllPowers } from '../controllers/PowerController';
import Power from '../models/Power';
import PowerView from './PowerView';
import CreatePowerView from './CreatePowerView';
import EventEmitter from 'events';

export default class ListPowersView extends Component<Props> {

    static navigationOptions = {
        title: 'List powers',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            powers: [],
        };

        this.updateEvent = new EventEmitter();
    }

    initPowers = () => {
        this.setState({ powers: getAllPowers().result });
    }

    componentWillMount() {
        this.initPowers();
        this.updateEvent.addListener('onUpdatePower', () => this.initPowers());
        this.updateEvent.addListener('onDeletePower', () => this.initPowers());
    }

    componentWillUnmount() {
        this.updateEvent.removeAllListeners();
    }

    showListPowers = () => {
        let result;
        result = this.state.powers.map((power: any) =>
            <PowerView key={power['powerId']} power={new Power(power['powerId'], power['powerName'])} event={this.updateEvent}/>
        )

        return <ScrollView style={styles.listViewContainer}>{result}</ScrollView>
    }

    displayModalUpdate = () => {
        return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.updating}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setState({ updating: !this.state.updating });
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>);
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