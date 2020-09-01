import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import CharactersStackNavigator from '../CharactersStackNavigator';

const Icon = createIconSetFromIcoMoon(require('../../config/selection.json'));
const TabNavigator = createBottomTabNavigator();

const EpisodesScreen: React.FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Episodes</Text>
    </View>
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <TabNavigator.Navigator
      initialRouteName="Characters"
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          borderTopWidth: 0,
        },
        tabStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 25,
          height: 25,
        },
        labelStyle: {
          fontFamily: 'WorkSans-Regular',
          fontSize: 12,
          marginTop: 6,
        },
        inactiveBackgroundColor: '#9a9797',
        activeBackgroundColor: '#4d4b4b',
        inactiveTintColor: '#222831',
        activeTintColor: '#fff',
      }}>
      <TabNavigator.Screen
        name="Characters"
        component={CharactersStackNavigator}
        options={{
          tabBarTestID: 'characterScreenIcon',
          title: 'Personagens',
          tabBarLabel: 'Personagens',
          tabBarIcon: () => < Icon  name='icons8-morty-smith' size={30} />
        }}
      />
      <TabNavigator.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          tabBarTestID: 'episodesScreenIcon',
          title: 'Episódios',
          tabBarLabel: 'Episódios',
          tabBarIcon: () => < Icon  name='icons8-rick-sanchez' size={30} />
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default BottomTabNavigator;
