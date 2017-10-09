import Faker from 'faker'

function initData (count) {
  const items = []

  for (let i = 0; i < count; i++) {
    items.push({
      id: i,
      title: Faker.random.word(),
      description: Faker.random.words(),
      dueDate: new Date(),
      status: getRandomStatus()
    })
  }

  return items
}

const status = ['Not Started', 'In Progress', 'Done']

function getRandomStatus () {
  const i = Math.floor(Math.random() * (status.length))

  return status[i]
}

export default initData
