import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation';


import WeekView from './Views/WeekView';
import MonthView from './Views/MonthView'

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
  }
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
})

const appWithNavigationState = ({dispatch, nav}) => {
	return <RootNavigation navigation={addNavigationHelpers({dispatch, state: nav})} />
}

const mapStateToProps = state => {nav: state.nav}

export default connect(mapStateToProps)(appWithNavigationState);