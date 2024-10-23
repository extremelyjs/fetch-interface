import reactLogo from './assets/react.svg'
import './App.css'
import { apiGet, apiGetError } from './api/get'
import { useEffect } from 'react'
import { apiPost } from './api/post'

function App() {
  useEffect(() => {
    async function func() {
      const result = await apiGet();
      const result2 = await apiPost({
        name: 'test',
        age: 20
      });
      const result3 = await apiGetError();
      console.log(result);
      console.log(result2);
      console.log(result3);
    }
    func();
  })
  return (
    <>
      <div>
        <img src={reactLogo} alt="React logo" />
      </div>
    </>
  )
}

export default App
