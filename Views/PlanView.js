import React, { Component } from 'react'
import { View, Text, 
	ScrollView, 
	ActivityIndicator,
	TouchableOpacity  } from 'react-native'
import { Button, List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import M from 'moment'
import actions from '../actions/assignmentActions'
import _ from 'lodash'

class PlanView extends Component {
	state = {
		month: M(this.props.cMonth[0].date).month(),
		planDays: {}
	}

	getMonth(){
		let localMonth = this.state.month // int
		let monthDayComponents = [] 
		for (let d = 1; d <= M().month(this.state.month).daysInMonth(); d++){
			monthDayComponents.push(
				<TouchableOpacity
					onPress={() => {
						this.state.planDays[d] ? this.removeDayFromPlan(d) : this.addDayToPlan(d)
						console.log('add plan day',localMonth, '-', d, 'to assignment', 1)
					}}
					style={this.state.planDays[d] ? styles.planDayStyle: styles.dayStyle}
					>
					<Text>
						{d}
					</Text>
				</TouchableOpacity>
			)
		}
		return monthDayComponents
	}

	addDayToPlan = (d) => {
		return this.setState({
			planDays: Object.assign(this.state.planDays, {
				[d]: {
					workPercentage: 0
				}
			})
		})
	}

	removeDayFromPlan = (d) => {
		// probably a better not mutating way to do this but whatever its 5am
		delete this.state.planDays[d]
		return this.setState({
			planDays: Object.assign({}, this.state.planDays)
		})		
	}

	// listPlanDays(){
	// 	let { planDays } = this.state
	// 	return Object.keys(this.state.planDays).map(date => {
	// 		return (
	// 			<ListItem
	// 				title={`${M(date).format('MMM')}. ${M(date).date()}`}
	// 				key={date}
	// 				/>
	// 			)
	// 	})
	// }

	render(){
		if (!this.props.aID){
			return (
				<View style={styles.screenContainer}>
					<ActivityIndicator />
				</View>
			)
		}

		return (
			<View style={styles.screenContainer}>
				<View style={styles.headerContainer}>
					<TouchableOpacity 
						onPress={() => this.props.navigation.navigate('WeekCalendar')}
						style={styles.backButton}
					>
						<Text style={styles.sectionHeader}>{'< Back'}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.monthContainer}>
					<Text style={{...styles.sectionHeader, marginTop: 10}}>
						{M(this.state.month).format('MMMM')}
					</Text>
					{_.chunk(this.getMonth(), 7).map(week => {
						return (
							<View style={styles.weekStyle}>
								{week}
							</View>
						)
					})}
				</View>
				<Button 
					title='Create Plan'
					onPress={() => console.log('create plan')}
					/>
			</View>
		)
	}
}

const MapStateToProps = (state) => {
	let { assignmentID } = state.AssignmentState
	let { cMonth } = state.CalendarState
	return {aID: assignmentID, cMonth: cMonth}
}

export default connect(MapStateToProps, actions)(PlanView);


const styles = {
	planDayStyle: {
		flex: 1,
		margin: '2%',
		borderRadius: 50,
		backgroundColor: 'rgb(250, 128, 114)',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	monthContainer: {
		flex: 1,
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionHeader: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'left',
		justifyContent: 'center',
		alignItems: 'center'
	},
	workDistContainer: {
		flex: 1
	},
	weekStyle: {
		flexDirection: 'row',
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	backButton: {
		flex: 1,
		justifyContent: 'flex-start',
		marginTop: 20
	},
	dayStyle: {
		flex: 1,
		margin: '2%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	screenContainer: {
		flex: 1,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
}
