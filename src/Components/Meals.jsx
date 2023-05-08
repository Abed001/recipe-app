
import React from 'react'
import {BsHandThumbsUp} from'react-icons/bs'
import { useGlobalContext } from '../context'

const Meals = () => {
  const { meals,selectMeal,addToFavorites } = useGlobalContext()
 

  return <section className="section-center">
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal

      return <article key={idMeal} className="single-meal">
        <img src={image} className="img" onClick={()=>selectMeal(idMeal)} />
        <footer>
          <h5>{title}</h5>
          <button onClick={()=>addToFavorites(idMeal)} className="like-btn"><BsHandThumbsUp/></button>
        </footer>
      </article>
    })}
  </section>
}
export default Meals;