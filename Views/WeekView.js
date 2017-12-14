import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import WeekDayCard from '../components/WeekDayCard'
import { connect } from 'react-redux'
import Actions from '../actions/calendar_actions'
import M from 'moment'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class WeekView extends Component {
	renderWeekNavDays(){
		return this.props.cWeek.map(day => {
			return (
				<View>
					<TouchableOpacity
						key={day.date}
						onPress={() => this.props.updateCurrentDay(day)}
						style={styles.weekNavOption}
						>
						<Text style={styles.navText}>{M(day.date).format('dd')}</Text>
					</TouchableOpacity>
				</View>
			)
		})
	}

	render(){
		const { assignments, planWork } = this.props.cDay
		return (
			<View style={styles.screenContainer}>
				<View style={styles.weekDayContainer}>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('MonthCalendar')}
						style={styles.backToMonth}
						>
						<Text>Month</Text>
					</TouchableOpacity>	
					<View style={styles.weekNav}>
						{this.renderWeekNavDays()}
					</View>
					<View style={styles.weekDayCard}>
						<WeekDayCard navigation={this.props.navigation} />
					</View>

				</View>
			</View>
			)
	}
}


//	<TouchableOpacity style={styles.weekNavButton}>
	//	<Text style={styles.largeBoldFont}>{'<'}</Text>
//	</TouchableOpacity>
	// <TouchableOpacity style={styles.weekNavButton}>
		// <Text style={styles.largeBoldFont}>{'>'}</Text>
	// </TouchableOpacity>

const mapStateToProps = (state) => {
	const {cDay, cWeek} = state.CalendarState
	return { cDay, cWeek }
}

export default connect(mapStateToProps, Actions)(WeekView)

const styles = {
	backToMonth: {
		margin: '2%'
	},
	screenContainer: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
		marginTop: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	weekDayContainer: {
		flex: 1,
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	largeBoldFont: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	weekNav: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'black',
		width: '80%',
		justifyContent: 'center',
		margin: 'auto',
		maxHeight: 50,
		borderRadius: 50
	},
	weekNavOption: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 50,
		margin: '2%'
	},
	weekDayCard: {
		flex: 1,
		minWidth: '80%'
	},
	navText: {
		color: 'black',
		// fontSize: 20
	},
	navContainer: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		width: '100%',
		flexWrape: 'nowrap'
	},
	weekNavButton: {
		flex: 1,
	}
}

