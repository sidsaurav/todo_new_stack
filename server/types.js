const zod = require('zod')

const addTodoPayload = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
})

module.exports = {
  addTodoPayload,
}
