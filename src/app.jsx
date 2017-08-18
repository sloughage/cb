import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main.jsx'

import props from './testdata.js'

ReactDOM.render(
  <Main props={props} />,
  document.getElementById('main')
)