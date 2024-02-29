import { useEffect, useState } from 'react'
import { Todo } from './components/Todo'

function App() {
  const fetchData = async () => {
    let data = await fetch('http://localhost:5000/todos', {
      method: 'GET',
    })
    data = data.json()
    return data
  }

  const [todo, setTodo] = useState([])

  useEffect(() => {
    fetchData().then((d) => {
      setTodo(d)
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
      />

      <input
        placeholder='enter description'
        type='text'
        style={{ padding: '4px', width: '300px' }}
      />
      <button style={{ padding: '4px', width: '300px' }}>Submit</button>
      <Todo data={todo}></Todo>
    </div>
  )
}

export default App
