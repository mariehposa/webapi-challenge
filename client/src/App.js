import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const serverUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : ''

function App() {
  const [ data, setData ] = useState(null)

  useEffect(() => {
    axios.get(url + '/api/project/')
      .then(res => {
        setData(res.data)
      })
  }, [])

  return (
    <div className="App">
        <p>
         {
           data.map(info => <h2>info.name</h2>)
         }
        </p>
    </div>
  );
}

export default App;
