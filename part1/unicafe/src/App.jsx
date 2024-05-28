import { useState } from 'react'

const Button = ({onClick,text})=> <button onClick={onClick}>{text}</button>

const Statisticline = ({text, value}) =>{ 
if(text==='positive'){ 
  return <div>{text} {value} %</div>
}
return <div>{text} {value}</div>
}



const Statistics = ({good, neutral, bad}) => {
  
    if(good+neutral+bad===0){
      return(
  <div>
    <h1>statistics</h1> 
     No feedback given
  </div>
      )
      
    }
    return(
      <div>
        <h1>statistics</h1> 
          <Statisticline value={good} text='good' />
          <Statisticline value={neutral} text='neutral'/>
          <Statisticline value={bad} text='bad' />
          <Statisticline value={good+neutral+bad} text='all'/>
         <Statisticline text= 'average' value ={(good+bad*(-1))/(good+neutral+bad)}/>
          <Statisticline text='positive' value ={good/(good+neutral+bad)*100 } />
      </div>
          )
  
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button onClick={()=>setGood(good+1)} text='good' />
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button onClick={()=>setBad(bad+1)} text='bad' />
     
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App