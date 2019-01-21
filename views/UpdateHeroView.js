/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text, ToastAndroid } from 'react-native';
import CustomButton from './CustomButton';

export default class UpdateHeroView extends Component<Props> {

    static navigationOptions = {
        title: 'Update hero',
    };

    constructor(props: Props) {
        super(props);

        let hero;
        if (this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params)
                hero = this.props.navigation.state.params.hero;

        this.state = {
            hero: hero,
            disabledButtonUpdate: false,
        };
    }

    updateName = (name: string) => {
        if (!this.state.hero)
            return;

        let hero = this.state.hero;
        if (!name || ''.includes(name)) {
            hero.heroName = '';
            this.setState({ hero, disabledButtonUpdate: true });
        } else {
            hero.heroName = name;
            this.setState({ hero, disabledButtonUpdate: false });
        }
    }

    render() {
        if (!this.state.hero)
            return <Text>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.generalFontSize, styles.inputTitle]}>Hero id:</Text>
                    <TextInput style={[styles.generalFontSize, styles.input]} value={`${this.state.hero.heroId}`} editable={false}/>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.generalFontSize, styles.inputTitle]}>Hero name:</Text>
                    <TextInput
                        style={[styles.generalFontSize, styles.input]}
                        value={this.state.hero.heroName}
                        onChangeText={(text) => this.updateName(text)}
                    />
                </View>
                <CustomButton
                    title='Update'
                    disabled={this.state.disabledButtonUpdate}
                    enableColor='#841584'
                    disabledColor='#f76df7'
                    onPress={() => {}}
                />
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
        width: '90%',
        alignSelf: 'center',
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
        width: '65%',
        borderBottomColor: '#841584',
        borderBottomWidth: 1,
    },
    inputTitle: {
        width: '35%',
    },
});