const zod = require('zod')

const addTodoPayload = zod.object({
    title: zod.string(),
    description: zod.string()
})

module.exports = {
    addTodoPayload
}