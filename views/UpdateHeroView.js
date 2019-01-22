/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, ToastAndroid } from 'react-native';
import CustomButton from './CustomButton';
import CustomPicker from './CustomPicker';
import { getAllPowers } from '../controllers/PowerController';

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
            powers: getAllPowers().result, // all current powers
            heroPowers: [],
            disabledButtonUpdate: false,
        };
    }

    initHeroPowersArray = () => {
        if (!this.state.hero)
            return;

        let heroPowers = [];
        for (let i = 0; i < this.state.hero.powers.length; i++) {
            let powerId = this.state.hero.powers[i]['powerId'];
            if (powerId != null && powerId != undefined)
                heroPowers.push(powerId);
        }


        this.setState({ heroPowers });
    }

    initAllPowersArray = () => {
        this.setState({ powers: getAllPowers().result });
    }

    componentWillMount() {
        this.initAllPowersArray();
        this.initHeroPowersArray();
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

    displayHeroNameAndId = () => {
        if (!this.state.hero)
            return null;

        return (
            <View style={styles.heroNameAndId}>
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
            </View>
        );
    }

    getPickerItemData = () => {
        let powersPickerData = [];

        if (this.state.powers) {
            for (let i = 0; i < this.state.powers.length; i++) {
                if (this.state.powers[i])
                    powersPickerData.push({
                        label: this.state.powers[i]['powerName'],
                        value: this.state.powers[i]['powerId']
                    })
            }
        }

        return powersPickerData;
    }

    displayListHeroPowers = () => {
        let result;
        let powersPickerData = this.getPickerItemData();
        result = this.state.heroPowers.map((powerId: number) => {
            return  (
                <CustomPicker
                    key={powerId}
                    data={powersPickerData}
                    title="Hero power:"
                    selectedValue={powerId}
                />
            )
        });

        return result;
    }

    addNewPower = () => {
        if (this.state.powers.length <= 0)
            return;

        let heroPowers = this.state.heroPowers;
        let powerId = this.state.powers[0]['powerId'];
        if (powerId != null && powerId != undefined) {
            heroPowers.push(powerId);
            this.setState({ heroPowers });
        }
    }

    render() {
        if (!this.state.hero)
            return <Text>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                { this.displayHeroNameAndId() }
                { this.displayListHeroPowers() }
                <CustomButton
                    title='Add more power'
                    enableColor='green'
                    disabledColor='#7bf19e'
                    onPress={this.addNewPower}
                />
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
        marginHorizontal: 10,
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
    pickerContainer: {
        width: '100%',
    },
    input: {
        width: '70%',
        borderBottomColor: '#841584',
        borderBottomWidth: 1,
    },
    inputTitle: {
        width: '30%',
    },
});