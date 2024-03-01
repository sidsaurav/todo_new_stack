import { useEffect, useState } from 'react'
import { Todo } from './components/Todo'

function App() {
  const fetchData = async () => {
    let data = await fetch('http://localhost:5000/todos', {
      method: 'GET',
    })
    data = await data.json()
    return data
  }

  const postData = async () => {
    let res = await fetch('http://localhost:5000/todo', {
      method: 'POST',
      body: JSON.stringify({ title: title, description: desc }),
      headers: {
        'content-type': 'application/json',
      },
    })
    setTitle('')
    setDesc('')
    let data = await res.json()
    if (res.ok) {
      setTodo(() => {
        return [
          ...todo,
          {
            title: data.task.title,
            description: data.task.description,
            id: data.task._id,
            completed: data.task.completed,
          },
        ]
      })
    }
  }

  const [todo, setTodo] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    fetchData().then((d) => {
      let data = d.map((e) => {
        return {
          id: e._id,
          title: e.title,
          description: e.description,
          completed: e.completed,
        }
      })
      setTodo(data)
    })
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <h1>My Todo List</h1>
      <input
        placeholder='enter title'
        type='text'
        style={{ padding: '4px', width: '300px' }}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        value={title}
      />

      <input
        placeholder='enter description'
        type='text'
        style={{ padding: '4px', width: '300px' }}
        onChange={(e) => {
          setDesc(e.target.value)
        }}
        value={desc}
      />
      <button style={{ padding: '4px', width: '300px' }} onClick={postData}>
        Submit
      </button>
      <Todo todo={todo} setTodo={setTodo}></Todo>
    </div>
  )
}

export default App
