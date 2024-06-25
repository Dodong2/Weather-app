import './App.css'
import { lazy, Suspense } from 'react'

const Weather = lazy(()=> import('./components/Weather'))

function App() {

  return (
    <>
    <Suspense fallback={<h1>Loading</h1>}>
    <Weather/>
    </Suspense>
    </>
  )
}

export default App
