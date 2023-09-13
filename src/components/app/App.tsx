import { useEffect }from 'react'

import './App.scss'
import logo from '../../img/aviasales.svg'
import { ContentBlock } from '../content-block/content-block'

function App() {
  return (
    <div className="App">
      <div className="logo-wrapper">
        <div>
          <img src={logo} alt="" />
        </div>
      </div>
      <ContentBlock />
    </div>
  )
}

export default App