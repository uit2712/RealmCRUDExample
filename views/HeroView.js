/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { deleteHeroById } from '../controllers/HeroController';

class HeroView extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hero: this.props.hero,
            event: this.props.event,
        }
    }

    updateHero = () => {
        if (!this.state.hero || !this.props.navigation)
            return;

        const { navigate } = this.props.navigation;
        navigate('UpdateHero', { hero: this.state.hero.clone() });
    }

    deleteHero = () => {
        if (!this.state.hero)
            return;

        let deleteHeroResult = deleteHeroById(this.state.hero.heroId);
        ToastAndroid.show(deleteHeroResult.message, ToastAndroid.SHORT);
        if (deleteHeroResult.result && this.state.event)
            this.state.event.emit('onDeleteHero');
    }

    render() {
        if (!this.state.hero)
            return <Text>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                <IconMaterialCommunityIcons
                    style={styles.icon}
                    name='delete-circle'
                    size={30}
                    color='red'
                    onPress={this.deleteHero}/>
                <IconFontAwesome
                    style={styles.icon}
                    name='edit'
                    size={30}
                    color='green'
                    onPress={this.updateHero}
                />
                <Text style={styles.generalFontSize}>{this.state.hero.heroName}</Text>
            </View>
        );
    }
}

export default withNavigation(HeroView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    generalFontSize: {
        fontSize: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
});