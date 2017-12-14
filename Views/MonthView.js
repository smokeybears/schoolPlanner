import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Helpers from '../Helpers'
import M from 'moment'
import _ from 'lodash'
import actions from '../actions/calendar_actions'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class MonthView extends Component {
	getCalendarDays(){ // Days in preceding and following months to have even week rows
		let fd = this.props.cMonth[0].date
		let startDate = M(fd).startOf('month').startOf('week') 
		let endDate = M(fd).endOf('month').endOf('week')
		const dayComponents = []
		for (let d = M(startDate); d <= endDate; d.add(1, 'd')){
			if (M(fd).startOf('month') <= d && d <= M(fd).endOf('month')){
				dayComponents.push(
					inMonthDay(
						this.props.cMonth[d.date() - 1], 
						this.goToDay.bind(this)
					)
				) 
			} else {
				dayComponents.push(outOfMonthDay(d))
			}
		}
		return dayComponents
	}

	goToDay(day){
		this.props.updateCurrentDay(day)
		this.props.navigation.navigate('WeekCalendar')
	}

	navButtons(){
		const prevMonth = M(this.props.cMonth[0].date).subtract(1, 'M')
		const nextMonth = M(this.props.cMonth[0].date).add(1, 'M')
		return (
			<View style={styles.navContainer}>
				<TouchableOpacity
					onPress={() => this.props.updateCurrentMonth(prevMonth.month())}
					style={styles.navButton}
				>
					<Text style={styles.changeMonthText}> {`<`} </Text>
				</TouchableOpacity>
				<View style={styles.monthName}>
					<Text style={{fontSize: 30, fontWeight: 'bold'}}>
						{M(this.props.cMonth[0].date).format('MMMM')}
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => this.props.updateCurrentMonth(nextMonth.month())}
					style={styles.navButton}
				>
					<Text style={styles.changeMonthText}> {`>`} </Text>
				</TouchableOpacity>
			</View>
		)
	}

	render(){
		return (
			<View style={styles.screenContainer}>
				{this.navButtons()}
				<View style={styles.monthContainer}>
					{_.chunk(this.getCalendarDays(), 7).map((week, idx) => {
						return (
							<View 
								style={styles.weekStyle}
								key={`week-${idx}-${week[0].date}`}
								>
								{week}
							</View>
						)
					})}

				</View>
			</View>
		)
	}
}

const	outOfMonthDay = (date) => {
	return (
	 	<View key={date.toString()} style={styles.dayContainer}>
			<Text style={styles.nonMonthDay}>{date.date()}</Text>
		</View>
	)
}

const inMonthDay = (day, onPress) => {
 	return (
		<TouchableOpacity 
			onPress={() => onPress(day)}
			style={styles.dayContainer}
			key={day.date}
			> 		
		 	<View style={styles.workPrevContainer}>
		 		<View 
		 			style={{
		 				...styles.workPrevItem,
		 				backgroundColor: 'rgba(135, 206, 250, 0.7)'
		 			}}>
		 			<Text>{day.planWork.length}</Text>
		 		</View>
		 		<View 
		 			style={{
		 				...styles.workPrevItem, 
		 				backgroundColor: 'rgba(250, 128, 114, 0.7)'
		 			}}>
		 			<Text>{day.assignments.length}</Text>
		 		</View>
		 	</View>
			<Text style={styles.monthDay}>{M(day.date).date()}</Text>
		</TouchableOpacity>
	)
}

const MapStateToProps = (state) => {
	const { cMonth } = state.CalendarState
	return { cMonth }
}


const styles = {
	dayContainer: {
		margin: '2%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'nowrap'
	},
	workPrevContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		// alignItems: 'center'
	},
	workPrevItem: {
		borderRadius: 50,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	navButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nonMonthDay: {
		fontSize: 18
	},
	monthDay: {
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: 18
	},
	navContainer: {
		position: 'absolute',
		top: 30,
		left: 0,
		right: 0,
		flexDirection: 'row',
		height: '7%',
		margin: '1%'
	},
	weekStyle: {
		flexDirection: 'row'
	},
	changeMonthText: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	screenContainer: {
		flex: 1,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	monthContainer: {
		// borderStyle: 'solid',
		// borderWidth: 2,
		// borderColor: 'rgba(100, 100, 100, 0.5)',
		alignSelf: 'center',
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 'auto'
	}
}

export default connect(MapStateToProps, actions)(MonthView);

