/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { getAllHeroes } from '../controllers/HeroController';
import Hero from '../models/Hero';
import HeroView from './HeroView';

export default class ListHeroesView extends Component<Props> {

    static navigationOptions = {
        title: 'List heroes',
    };

    showListHeroes = () => {
        let result;
        let heroes = getAllHeroes().result;
        result = heroes.map((hero: Hero) => 
            <HeroView hero={hero}/>
        )

        return result;
    }

    render() {
        return (
            <View style={styles.container}>
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
});