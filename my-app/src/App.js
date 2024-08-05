import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error making the request:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
