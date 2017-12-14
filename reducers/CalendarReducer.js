import M from 'moment'
import _ from 'lodash'
import { NavigationActions } from 'react-navigation'
import {
	UPDATE_CURRENT_DAY,
	UPDATE_CURRENT_MONTH
} from '../actions/types'

import genDummyData from '../dummyData.js'

/// basically everything trickles down from the month state
/// there is no update current week because it's just automatically calulated 
/// from the Month / cDay
/// cMonth = [] containing all days in month
/// cWeek = [] a chunk of current month (shallow copy) based on the current day
/// cDay = {date:planWork:assignments}


export default (state = {}, action) => {
	if (action.type === UPDATE_CURRENT_DAY){		
		let startWeekIdx = M(action.payload.date).startOf('week').date() - 1
		let endWeekIdx = M(action.payload.date).endOf('week').date()
		return {
			...state, 
			cDay: action.payload,
			cWeek: state.cMonth.slice(startWeekIdx, endWeekIdx)
		}
	}

	if (action.type === UPDATE_CURRENT_MONTH) {
		// get some shit from the server
		return {
			...state,
			cMonth: genDummyData(action.payload)
		}
	}

	if (!state.cMonth){ // initial state
		return {
			...state,
			cDay: null,
			cWeek: null,
			cMonth: genDummyData()
		}
	}
	return state
}