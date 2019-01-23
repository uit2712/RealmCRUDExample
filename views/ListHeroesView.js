/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import Hero from '../models/Hero';
import HeroView from './HeroView';
import CreateHeroView from './CreateHeroView';

export default class ListHeroesView extends Component<Props> {

    static navigationOptions = {
        title: 'List heroes',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            heroes: [],
        };
    }

    showListHeroes = () => {
        let result;
        result = this.state.heroes.map((hero: any) => {
            let newHero = new Hero(hero['heroId'], hero['heroName'], hero['powers']);
            return <HeroView key={newHero.heroId} hero={newHero} event={this.event}/>
        });

        return <ScrollView style={styles.listViewContainer}>{result}</ScrollView>
    }

    render() {
        return (
            <View style={styles.container}>
                <CreateHeroView event={this.event}/>
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