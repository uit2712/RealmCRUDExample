/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
} from 'react-native';
import CustomButton from './CustomButton';
import Hero from '../models/Hero';

export default class CreateHeroView extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hero: new Hero(),
            disableButtonAdd: true,
        }
    }

    setHeroName = (heroName: string) => {
        let hero = this.state.hero;
        hero.heroName = heroName;
        if (heroName == null || ''.includes(heroName))
            this.setState({ hero, disableButtonAdd: true });
        else this.setState({ hero, disableButtonAdd: false });
    }

    render() {
        if (!this.state.hero)
            return <Text>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.infoTitle, styles.generalFontSize]}>Hero name:</Text>
                    <TextInput
                        style={[styles.input, styles.generalFontSize]}
                        value={this.state.hero.heroName}
                        onChangeText={(text) => this.setHeroName(text)}
                        onSubmitEditing={() => {}} />
                    <CustomButton
                        title='Create'
                        width={'20%'}
                        onPress={() => {}}
                        disabled={this.state.disableButtonAdd}
                        enableColor='#841584'
                        disabledColor='#f76df7' />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: '10%',
        marginTop: 10,
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
        width: '40%',
        borderBottomWidth: 1,
        borderBottomColor: '#841584',
        marginHorizontal: 10,
    },
    infoTitle: {
        width: '30%',
    },
});