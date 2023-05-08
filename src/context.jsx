import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'



const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealsUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
const AppContext = React.createContext()

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')
    if(favorites){
       favorites=JSON.parse(localStorage.getItem('favorites'))
    } else{
        favorites=[]
    }
    return favorites
       
  

}
const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [meals, setMeals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage);


    const fetchRandomMeal = () => {
        fetchMeals(randomMealsUrl)

    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }

        setSelectedMeal(meal)
        setShowModal(true)

    }
    const closeModal = () => {
        setShowModal(false)
    }

    const fetchMeals = async (url) => {
        try {
            const { data } = await axios(url)

            setMeals(data.meals)
        } catch (e) {
            console.log(e.response.data.meals)

        }
    }

    const addToFavorites = (idMeal) => {
        console.log(idMeal)
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const alreadyFavorites = favorites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavorites) return
        const updatedFavorites = [...favorites, meal]
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites))

    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
    }

    useEffect(() => {


        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])


    useEffect(() => {


        fetchMeals(allMealsUrl)
    }, [])



    return <AppContext.Provider value={{
        meals, setSearchTerm, fetchRandomMeal,
        showModal, selectMeal, selectedMeal, closeModal, addToFavorites, removeFromFavorites, favorites
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)

}


export { AppContext, AppProvider }