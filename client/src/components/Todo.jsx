export function Todo({ data }) {
  return (
    <ul>
      {data.map((d, di) => {
        return (
          <li key={di}>
            {d.title} {' -> '} {d.description}
          </li>
        )
      })}
    </ul>
  )
}
