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
import EventEmitter from 'events';

export default class ListHeroesView extends Component<Props> {

    static navigationOptions = {
        title: 'List heroes',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            heroes: [],
        };

        this.updateEvent = new EventEmitter();
    }

    initHeroes = () => {
        this.setState({ heroes: getAllHeroes().result });
    }

    componentWillMount() {
        this.initHeroes();
        this.updateEvent.addListener('onUpdateHero', () => this.initHeroes());
    }

    componentWillUnmount() {
        this.updateEvent.removeAllListeners();
    }

    showListHeroes = () => {
        let result;
        result = this.state.heroes.map((hero: any) => {
            let newHero = new Hero(hero['heroId'], hero['heroName'], hero['powers']);
            return <HeroView key={newHero.heroId} hero={newHero}/>
        });

        return <ScrollView style={styles.listViewContainer}>{result}</ScrollView>
    }

    render() {
        return (
            <View style={styles.container}>
                <CreateHeroView event={this.updateEvent}/>
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