import { useEffect } from 'react'

export function Todo({ todo, setTodo }) {
  let delTodo = async (d) => {
    fetch('http://localhost:5000/todo', {
      method: 'DELETE',
      body: JSON.stringify({ id: d.id }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => {
      setTodo((prev) => {
        let temp = prev.filter((p) => p.id !== d.id)
        return temp
      })
    })
  }

  let doneTodo = (d) => {
    fetch('http://localhost:5000/todo', {
      method: 'PUT',
      body: JSON.stringify({ id: d.id }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => {
      setTodo((todo) =>
        todo.map((td) => {
          return td.id === d.id ? { ...td, completed: true } : td
        })
      )
    })
  }

  useEffect(() => {
    console.log('rerender todo')
  }, [todo])

  return (
    <ul>
      {todo.map((d, di) => {
        return (
          <li key={di}>
            {d.title} {' ----- '} {d.description}{' '}
            <span>{d.completed && 'donedanadone'}</span>
            <span
              onClick={() => {
                delTodo(d)
              }}
            >
              {' '}
              [X]{' '}
            </span>{' '}
            <span
              onClick={() => {
                doneTodo(d)
              }}
            >
              {' '}
              [ Done ]
            </span>
          </li>
        )
      })}
    </ul>
  )
}
