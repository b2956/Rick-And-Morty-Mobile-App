import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import  EpisodesList from '../../pages/EpisodesList';

const StackNavigator = createStackNavigator();

const EpisodesStackNavigator = () => {

    return (
        <StackNavigator.Navigator initialRouteName='EpisodesList' headerMode='none'>
            <StackNavigator.Screen name='EpisodesList' component={EpisodesList} />
        </StackNavigator.Navigator>
    )
}

export default EpisodesStackNavigator;