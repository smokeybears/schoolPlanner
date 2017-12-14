import {
	UPDATE_CURRENT_DAY,
	UPDATE_CURRENT_WEEK,
	UPDATE_CURRENT_MONTH,
} from './types'

import thunk from 'redux-thunk'

const updateCurrentDay = (dayObject) => {
	// dayObject = {date:planWork:assignments}
	return {
		type: UPDATE_CURRENT_DAY, 
		payload: dayObject
	}
}

const updateCurrentMonth = (newMonth) => { 
	// newMonth: int 
	return {type: UPDATE_CURRENT_MONTH, payload: newMonth}
}

const updateCurrentWeek = (dateString) => { 
	// newMonth: int
	return {type: UPDATE_CURRENT_WEEk, payload: dateString}
}


export default {
	updateCurrentDay,
	updateCurrentMonth,
	updateCurrentWeek
}
