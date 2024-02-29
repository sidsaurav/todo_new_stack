const zod = require('zod')

const addTodoPayload = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
})

const updateTodoPayload = zod.object({
  id: zod.string(),
})

const deletePayload = zod.object({
  id: zod.string(),
})

module.exports = {
  addTodoPayload,
  updateTodoPayload,
  deletePayload,
}
