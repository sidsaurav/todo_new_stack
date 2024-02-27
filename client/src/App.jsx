import { useState } from "react"

function App(){
    let [cnt, setCnt] = useState(0)

    return <>
        <button onClick={()=>setCnt(prevCnt=>prevCnt+1)}>
           Hi {cnt}   
        </button>
    </>
}

export default App