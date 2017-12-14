import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import actions from '../actions/assignmentActions'

class WeekDayCard extends Component {
	dueHomeWork(){
		return this.props.assignments.map(hwItem => {
			return (
				<ListItem
					title={hwItem.title}
					key={hwItem.id}
					rightIcon={
						<Button
							title='Plan'
							onPress={() => {
								this.props.navigation.navigate('Plan')
								this.props.goToAssignmentPlanView(hwItem.id)
							}}
						/>
					}
				/>
			)
		})
	}

	planWork(){
		return this.props.planWork.map(planItem => {
			return (
				<ListItem
					title={planItem.title}
					key={planItem.id}
					rightIcon={
						<Button
							title={`1/${planItem.numSections}`}
						/>
					}
				/>
			)
		})
	}
	
 	render(){
 		return (
	 		<View>
	 			<Text style={styles.listHeader}>Due</Text>
	 			<ScrollView>
		 			<List containerStyle={styles.listContainer}>
		 				{this.props.assignments.length ? this.dueHomeWork() : <Text>No Homework found for this day</Text>}
		 			</List>
		 		</ScrollView>
	 			<Text style={styles.listHeader}>Plan Work</Text>
	 			<ScrollView>
		 			<List containerStyle={styles.listContainer}>
		 				{ this.props.planWork.length ? this.planWork() : <Text>No planed Homework for this day</Text>}
		 			</List>
	 			</ScrollView>
	 		</View>
 		)
	}
}



const mapStateToProp = (state) => {
	const { assignments, planWork } = state.CalendarState.cDay
	return { assignments, planWork }
}

export default connect(mapStateToProp, actions)(WeekDayCard)
const styles = {
	listHeader: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	listContainer: {
		flex: 1,
		height: '100%',
	}
}