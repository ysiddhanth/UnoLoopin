import HomePage from './Pages/HomePage.jsx'
import LoginPageVerified from './Pages/LoginPageVerified'
import SignUpPageVerified from './Pages/SignUpPageVerified'
import SignUpPageAnonymous from './Pages/SignUpPageAnonymous'
import Queries from './Pages/Queries'
import Confessions from './Pages/Confessions'
import Polls from './Pages/Polls'
import LoginPageAnonymous from './Pages/LoginPageAnonymous'
import GlobalChat from './Pages/GlobalChat'
import GeneralAnonymous from './Pages/GeneralAnonymous'
import ProjectVacancies from './Pages/ProjectVacancies'
import CourseReview from './Pages/CourseReview'
import Temp from './Pages/temp'
import NavBar from './Components/NavBar'
//import {getDatabase } from 'firebase/database'
//import {app} from './firebase.js'

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
} from 'react-router-dom';

//const db = getDatabase(app);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/'>
    <Route index element={<><NavBar /> <HomePage /> </>}/>
    <Route path = '/verifiedLogin' element={<LoginPageVerified />}/>
    <Route path = '/verifiedCreate' element={<SignUpPageVerified />}/>
    <Route path = '/anonymousLogin' element={<LoginPageAnonymous />}/>
    <Route path = '/anonymousCreate' element={<SignUpPageAnonymous />}/>
    <Route path = '/polls' element={<Polls />}/>
    <Route path = '/confessions' element={<Confessions />}/>

    <Route path = '/globalChat' element={<GlobalChat />}/>
    <Route path = '/testingSite' element={<Temp />}/>
    <Route path = '/generalAnonymous' element={<GeneralAnonymous />}/>
    <Route path = '/projectVacancies' element={<ProjectVacancies />}/>
    <Route path = '/courseReview' element={<CourseReview />}/>
    <Route path = '/queries' element={<Queries />}/>

    </Route>
  ));


const App = () => {
    return <RouterProvider router = {router}/>;
};

export default App;