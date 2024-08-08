import useHttp from "../hooks/useHttp.js"
import MealItem from './MealItem.jsx'

const requstConfig = {};
export default function Meals() {

  const { data: loadedMeals, error, isLoading } = useHttp('http://localhost:3000/meals', requstConfig, [])

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }

  if (error) {
    return <div className="error">
      <h2>Failed to fetch meals!</h2>
      <p>{error}</p>
    </div>
  }

  return (
    <ul id="meals">
      {loadedMeals.map(item => {
        return <MealItem key={item.id} meal={item} />
      })}
    </ul>
  )
}
