/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import { getAllHeroes } from '../controllers/HeroController';
import Hero from '../models/Hero';
import HeroView from './HeroView';
import CreateHeroView from './CreateHeroView';

export default class ListHeroesView extends Component<Props> {

    static navigationOptions = {
        title: 'List heroes',
    };

    showListHeroes = () => {
        let result;
        let heroes = getAllHeroes().result;
        result = heroes.map((hero: any) =>
            <HeroView key={hero['heroId']} hero={new Hero(hero['heroId'], hero['heroName'], hero['powers'])}/>
        )

        return <ScrollView style={styles.listViewContainer}>{result}</ScrollView>
    }

    render() {
        return (
            <View style={styles.container}>
                <CreateHeroView/>
                {this.showListHeroes()}
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