/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import DetailScreen from './src/layout/DetailScreen';
import HomeScreen from './src/layout/HomeScreen';
import AuthLoadingScreen from './src/layout/AuthLoadingScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params ? navigation.state.params.name : '',
      headerTransparent: true,
      headerTintColor: '#fff',
    }),
  },
});

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default App;
