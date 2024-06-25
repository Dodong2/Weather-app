import './App.css'
import { lazy, Suspense } from 'react'

const Weather = lazy(()=> import('./components/Weather'))

function App() {

  return (
    <>
    <Suspense fallback={<div className='load'>
      <div className='loader'></div>
    </div>}>
    <Weather/>
    </Suspense>
    </>
  )
}

export default App
