import CalendarState from './CalendarReducer'
import AssignmentState from './AssignmentReducer'
import { combineReducers } from 'redux'

export default combineReducers({
	CalendarState,
	AssignmentState
})