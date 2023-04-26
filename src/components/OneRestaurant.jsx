import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../supabaseClient'
import { useEffect, useState } from 'react'
import {
  Awe,
  envelope,
  faCircle,
  faCircle2,
  faHouse,
  faLemon,
  utensils,
} from './icons'

const OneRestaurant = () => {
  const { id } = useParams()
  const [fetchError, setFetchError] = useState(null)
  const [restaurant, setRestaurant] = useState([])
  const navigate = useNavigate()

  const fetchRestaurant = async () => {
    const { data, error } = await supabase
      .from('restaurants')
      .select()
      .eq('id', id)

    if (error) {
      navigate('/restaurants')
    }

    if (data) {
      setRestaurant(data[0])
    }
  }

  useEffect(() => {
    fetchRestaurant()
  }, [])
  return (
    <>
      {/* <div>{id}</div> */}
      <h2>Restaurant: {restaurant.name}</h2>
      <Awe icon={envelope} size="9x" color="red" className="text-purple-600" />
      <Awe icon={utensils} size="4x" />
      <Awe icon={faLemon} size="3x" />
    </>
  )
}

export default OneRestaurant
