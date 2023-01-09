import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import Profiles from './components/profiles/profiles';
import Forms from './components/forms/forms';
import SearchFriends from './components/searchFriends/searchFriends';
import './App.css';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";

function App() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged((userCredentials) => {
      console.log("sesion iniciada de: ", userCredentials);
      setUserInfo(userCredentials);
    })
    
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
        <Navigation userInfo={userInfo}/>
          <Routes>
            <Route path="/" element={<Profiles userInfo={userInfo}/>}></Route>
            <Route path="/friends/:idFriend" element={<Profiles userInfo={userInfo}/>}></Route>
            <Route path="/Forms" element={<Forms setUserInfo={setUserInfo}/>}></Route>
            <Route path="/SearchFriends" element={<SearchFriends userInfo={userInfo}/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
