import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import Welcome from './components/Welcome/Welcome';
import Home from './components/Home/Home';
import TaskBoard from './components/Task/TaskBoard';
import CalendarPage from './components/Date/CalendarPage';
import Test from './components/commons/HomeHeader';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectPage from './components/Projects/ProjectPage';
import TodayTaskPage from './components/Task/TodayTaskPage';
import TeamDetails from './components/Team/TeamDetails';
import Notification from './components/Notification/Notification';
import { LoggedInRoute, ProtectedRoute } from './Sevices/Guard';
import Notfound from './components/Notfound/Notfound';
import Bitmojees from './components/bitmoji/Bitmojees';
import Signups from './components/Test/Signtest';
import EachProject from './components/Projects/EachProject';
import { useState } from 'react';
import AddTask from './components/commons/AddTask';


function App() {
  const [taskLength,setTaskLength] = useState(0)
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoggedInRoute element={<Welcome/>}/>}/>
        <Route exact path='/signup' element={<LoggedInRoute element={<Signup/>}/>}/>
        <Route exact path='/login' element={<LoggedInRoute element={<Signin/>}/>}/>
        <Route path="/home" element={<ProtectedRoute element={<Home taskLength={taskLength}/>} />}>
           <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard key="dashboard"/>} />
          <Route path="projects" element={<ProjectPage key="projects"/>} />
          <Route path="calendar" element={<CalendarPage key="calendar"/>} />
          <Route path="today-task" element={<TodayTaskPage key="today-task"/>} />
          <Route path="all-task" element={<TaskBoard isAllTask={true} setTaskLength={setTaskLength} key="all-task"/>} />
          <Route path='team/:teamId' element={<TeamDetails key="teamdetails"/>}/>
          <Route path='notifications' element={<Notification key="notification"/>}></Route>
          <Route path='project/:teamId/:projectId' element={<EachProject key="eachproject"/>}></Route>
        </Route>
        <Route path='/test' element={<Signup/>}></Route>
        <Route path="*" element={<Notfound/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
