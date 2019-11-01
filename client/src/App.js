import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : ''

function App() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    axios.get(url + '/api/project/')
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <div className="App">
         {
           data.map(info => <h2 key={info.id}>{info.name}</h2>)
         }
    </div>
  );
}

export default App;