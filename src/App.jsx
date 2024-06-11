import { useEffect, useState } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://www.course-api.com/react-tours-project'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    let updatedTour = tours.filter((tour) => tour.id !== id)
    setTours(updatedTour)
  }

  const fetchTours = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setTours(tours)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (!tours.length) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button
            type='button'
            onClick={fetchTours}
            style={{ marginTop: '2rem' }}
            className='btn'
          >
            refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}
export default App
