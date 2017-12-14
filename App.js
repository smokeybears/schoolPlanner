// Modules
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import store from './store'
// Components
import WeekView from './Views/WeekView';
import MonthView from './Views/MonthView'
import PlanView from './Views/PlanView'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    );
  }
}

const RootNavigation = StackNavigator({
  MonthCalendar: {
    screen: MonthView,
    navigationOptions: {
      header: null
    }
  },
  WeekCalendar: {
    screen: WeekView,
    navigationOptions: {
      header: null  
    }
  },
  Plan: {
    screen: PlanView,
    navigationOptions: {
      header: null
    }
  }
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
