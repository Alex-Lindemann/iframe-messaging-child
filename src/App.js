import { Route, Routes } from 'react-router-dom';
import './App.css';
import SimpleBottomNavigation from './components/Navigation';
import Body from './components/Body';

window.addEventListener("message", (event) => {
  if (event?.data?.source !== 'react-devtools-bridge' && event?.data?.source !== 'react-devtools-detector' && event?.data?.source !== 'react-devtools-content-script' && event?.data?.type !== 'webpackWarnings') {

    console.log("messaged", event)
  }
}, false);


function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Routes>
          <Route
            path="/*"
            element={<><SimpleBottomNavigation /><Body /></>}
          />
          <Route
            path="/iframe/*"
            element={<Body />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
