import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './atoms/userAtom';
import { loadingState } from './atoms/loadingAtom';
import { useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';
import { Twitter } from '@mui/icons-material';

function App() {

  const [user, setUser] = useRecoilState(userState)
  const [loading, setLoading] = useRecoilState(loadingState)

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({displayName: user.displayName, userName: user.displayName.split(' ').join("").toLocaleLowerCase(),uid: user.uid, email: user.email, photoURL: user.photoURL})
    } else {
      setUser(null)
    }
    setLoading(false)
}), [])


  return (
    <div className="App bg-black">
      <Router>
        {
          !loading ? (
            <Routes>
              <Route path='/home' element={ user ? <Home /> : <Navigate replace to="/" /> } />
              <Route path='/' element={ !user ? <Login /> : <Navigate replace to="/home" />} />
            </Routes>
          ) : (
            <div className='h-screen text-white flex items-center justify-center'>
              <Twitter className='loading__twitter_icon' />
            </div>
          )
        }
      </Router>
    </div>
  );
}

export default App;
