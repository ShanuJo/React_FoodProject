import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals')
    setLoading(true);
    if (!response.ok) {
      console.log(response.message);
    }

    const meals = await response.json();
    setLoadedMeals(meals);
    console.log('response:', meals);
    setLoading(false);
  }

  useEffect(() => {
    fetchMeals();
  }, [])

if(loading){
  return<div><p>Loading the data...</p></div>
}

  return (
    <ul id="meals">
      {loadedMeals.map(item => {
        return <MealItem key={item.id} meal={item}/>
      })}
    </ul>
  )
}
