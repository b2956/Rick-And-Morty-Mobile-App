import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import  CharactersList from '../../pages/CharactersList';

const StackNavigator = createStackNavigator();

const CharactersStackNavigator = () => {

    return (
        <StackNavigator.Navigator initialRouteName='CharactersList' headerMode='screen'>
            <StackNavigator.Screen name='CharactersList' component={CharactersList} />
        </StackNavigator.Navigator>
    )
}

export default CharactersStackNavigator;