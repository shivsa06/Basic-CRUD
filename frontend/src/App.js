import './App.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile'
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Registered from './pages/Registered';

function App () {
  const route = createBrowserRouter ([
    {
      path: '/',
      element: <LogIn />,
    },
    {
      path: '/registeredEmployee',
      element: <Registered></Registered>,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/editProfile',
      element: <EditProfile />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
      {/* 
      for this we have to import Routes & Route
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<LogIn></LogIn>}></Route>
          <Route path='/signUp' element = {<SignUp></SignUp>}></Route>
          <Route path='/login' element = {<LogIn></LogIn>}></Route>
          <Route path='/home' element = {<Home></Home>}></Route>
          <Route path='editProfile' element = {<EditProfile></EditProfile>}></Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;