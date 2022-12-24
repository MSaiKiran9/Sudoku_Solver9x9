import { useState, useRef } from 'react'
import "./App.css"
import Stuff from "./Model"
import { Canvas } from '@react-three/fiber';
export default function App() {
  // const [states, setStates] = useState([])
  const [second, setSecond] = useState(Array(81).fill(0));
  const [loading, setLoading] = useState(false)
  const track = useRef(null)
  const solve = () => {
    track.current.innerText = "Loading"
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_key,
        'X-RapidAPI-Host': process.env.REACT_APP_host
      },
      body: `{"input":[${second}]}`
    };
    // console.log(options.body)
    fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', options)
      .then(response => response.json())
      .then(response => { setSecond(response.answer); setLoading(prev => !prev); track.current.innerText = "Solve" })
      .catch(err => console.error(err));
  }
  function Change(e, index) {
    let x = [...second]
    x[index] = Number(e.target.value)
    setSecond(x)
  }
  console.log(second)
  const element = second.map((item, index) => <input type="number" max="9" min="0" onChange={(e) => Change(e, index)} key={index} value={item} />)
  return (<>
    <div id='heading'><h1>Sudoku Solver </h1></div>
    <div className='rand'>{element}</div>
    <div id='loading'>{loading === true ? <Canvas><ambientLight intensity={0.4} /><directionalLight intensity={0.5} position={[0, -10, 0]} /><Stuff load="true" /></Canvas> : <Canvas><ambientLight intensity={0.4} /><directionalLight intensity={0.5} position={[2, -10, 0]} /><Stuff load="false" /></Canvas>}</div>
    <div id='bu'>
      <button ref={track} onClick={() => { solve() }} >Solve</button></div>
  </>
  );
}