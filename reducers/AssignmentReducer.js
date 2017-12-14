import M from 'moment'
import _ from 'lodash'
import { NavigationActions } from 'react-navigation'
import {
	GO_TO_PLAN_VIEW,
	CREATE_ASSIGNMENT_PLAN
} from '../actions/types'


export default (state = {}, action) => {
	console.log('atleast this runs', action)
	if (action.type === GO_TO_PLAN_VIEW){
		console.log('sending aID', action.payload)
		return {...state, assignmentID: action.payload}
	}

	return state
}