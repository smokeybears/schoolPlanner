import Faker from 'faker'
import M from 'moment'

const genRandomPlanWork = () => {
	const n = Faker.random.number(5)
	const c = []
	for (let i = 0; i < n; i++){
		c.push({
			id: Faker.random.uuid(),
			title: Faker.lorem.sentence(), 
			assignment_title: Faker.lorem.sentence(),
			numSections: Faker.random.number(4) + 1
		})
	}
	return c
}

const genRandomAssignments = () => {
	const n = Faker.random.number(4)
	const t = [];
	for (let i = 0; i < n; i++ ){
		t.push({
			id: Faker.random.uuid(),
			title: Faker.lorem.sentence()
		})
	}
	return t
}

const genMonthDummyData = (month = M().month()) => {
	const monthDays = []
	let startDate = M().month(month).startOf('month')
	let endDate = M().month(month).endOf('month')
	for (let d = startDate; d <= endDate; d.add(1, 'd')){
		monthDays.push({
			date: d.toISOString(),
			planWork: genRandomPlanWork(),
			assignments: genRandomAssignments()
		})
	}
	return monthDays
}

export default genMonthDummyData