import { Link, useEffect, useState, supabase, Awe, envelope } from '../imports'

function Restaurants() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const fetchData = async () => {
    const { data, error } = await supabase.from('restaurants').select()
    if (error) {
      setError('Error fetching data' + error)
      setItems([])
    }
    if (data) {
      setItems(data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1 className="bg-yellow-100 text-lg tracking-[0.8em]">Restaurants</h1>
      <Awe icon={envelope} size="2x" />
      {items.map(item => (
        <Link
          className="z-50 block bg-lime-100  hover:bg-lime-200 p-1"
          to={`/restaurant/${item.id}`}
          key={item.id}
        >
          {item.name}
        </Link>
      ))}
    </>
  )
}

export default Restaurants
