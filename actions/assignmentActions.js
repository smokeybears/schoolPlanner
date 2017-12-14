import {
	CREATE_ASSIGNMENT_PLAN,
	GO_TO_PLAN_VIEW
} from './types'

const ROOT_URL = 'http://localhost:8090'

const createAssignmentPlan = (planInfo) => {
	return {type: CREATE_ASSIGNMENT_PLAN, payload: planInfo}
}

const goToAssignmentPlanView = (aID) => {
	return {type: GO_TO_PLAN_VIEW, payload: aID}
}

export default {
	createAssignmentPlan,
	goToAssignmentPlanView
}
