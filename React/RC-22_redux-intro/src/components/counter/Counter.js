import React from 'react'
import "./Counter.css"
import { useDispatch, useSelector } from 'react-redux'
import { decrease, increase, reset } from '../../redux/actions/counterActions'

const Counter = () => {
  const {text1,counterResult}=useSelector((state)=>state.counterReducer)
  const dispatch1=useDispatch()
  return (
    <div className='app'>
      <h2 className='counter-header'>Counter with Redux</h2>
      <h1> {counterResult} </h1>
      <h2> {text1} </h2>
      <div>
        <button className='counter-button positive' onClick={()=>dispatch1(increase())} >INCREASE</button>
        <button className='counter-button zero' onClick={()=>dispatch1(reset())} >RESET</button>
        <button className='counter-button negative' onClick={()=>dispatch1(decrease())} >DECREASE</button>
      </div>
    </div>
  )
}

export default Counter