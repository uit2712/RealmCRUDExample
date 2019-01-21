/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';

export default class HeroView extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hero: this.props.hero,
        }
    }

    render() {
        if (!this.state.hero)
            return <Text>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                <Text>{this.state.hero.heroName}</Text>
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