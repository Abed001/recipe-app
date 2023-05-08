import React from 'react'
import { useState } from 'react';
import { useGlobalContext } from '../context'


const Search = () => {
  const { fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')
  const{setSearchTerm}=useGlobalContext()

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text){
      setSearchTerm(text)
      setText('') 
    }

 
  }
     const handleRandomMeal=()=>{
      setSearchTerm('')
      setText('')
      fetchRandomMeal()
    }
    
  return <header className='search-container'>
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type='text' placeholder='type favorite meal' className='form-input' />
      <button type="submit" className="btn">search</button>
      <button onClick={handleRandomMeal} type="button" className="btn btn-hipster">suprise me !</button>
    </form>
  </header>
}

export default Search; 