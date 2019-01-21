import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeView from '../views/HomeView';
import ListHeroesView from '../views/ListHeroesView';
import ListPowersView from '../views/ListPowersView';
import UpdatePowerView from '../views/UpdatePowerView';

const StackHero = createStackNavigator({
    Home: { screen: HomeView },
    ListHeroes: { screen: ListHeroesView },
    ListPowers: { screen: ListPowersView },
    UpdatePower: { screen: UpdatePowerView }
});

const StackHeroContainer = createAppContainer(StackHero);

export default class App extends Component<Props> {
    render() {
        return <StackHeroContainer/>
    }
}