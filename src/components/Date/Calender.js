import React, { useEffect, useState } from 'react';
import './calendar.css';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import ApiService from '../../Sevices/Apiservices';
import { useUser } from '../Context/UserContext';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const colors = ['#0055ff', 'black', '#ff5d39', '#2abf4b', '#FF69B4', '#40E0D0'];
  
  const [tasks,setTasks] = useState([])
  const {user} = useUser()
  const [task1,setTask1] = useState([])
  const [task2,setTask2] = useState([])
  const [task3,setTask3] = useState([])

useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await ApiService.getAllTaskByUserid(user.id);
        setTasks(response.taskList);
      } catch (err) {
        console.log(err.response?.data?.message || "Error");
      }
    };
    getAllTasks();
  }, [user]);

  useEffect(() => {
    if (tasks.length > 0) {
      const totalTasks = tasks.length;
      const partSize = Math.floor(totalTasks / 3);
      setTask1(tasks.slice(0, partSize));
      setTask2(tasks.slice(partSize, partSize * 2));
      setTask3(tasks.slice(partSize * 2, totalTasks));
    }
  }, [tasks]);

  const changeMonth = (offset) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + offset);
      return newMonth;
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    return { days, firstDayIndex };
  };

  const renderCalendar = () => {
    const { days, firstDayIndex } = getDaysInMonth(currentMonth);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const taskDates = new Set(); 

    let calendar = [];
    for (let day = 1; day <= days; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayName = dayNames[date.getDay()];

      calendar.push(
        <div key={day} className="calendar-day">
          <div className="day-name">{day}</div>
          <div className="day-number">{dayName}</div>
        </div>
      );
    }

    return calendar;
  };

const renderCalendar1 = () => {
  const { days, firstDayIndex } = getDaysInMonth(currentMonth);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let calendar = [];
  const arrayToDate = (arr) => new Date(arr[0], arr[1] - 1, arr[2]);

  for (let day = 1; day <= days; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayName = dayNames[date.getDay()];
    const tasksForDay = task1 ? task1.filter(task => date >= arrayToDate(task.startdate) && date <= arrayToDate(task.enddate)):[];
    calendar.push(
      <div key={day} className="calendar-day1">
        <div className="day-number"></div>
        <div className="day-name"></div>
         {tasksForDay &&  tasksForDay.map((task, index) => (
          <div 
            key={index} 
            className="task-bar task-bar1"
            style={{ backgroundColor: colors[(task1.findIndex(tas => tas.taskname === task.taskname)) % colors.length] }}
          >
            {task.taskname}
          </div>
        ))}
      </div>
    );
  }

  return calendar;
};

const renderCalendar2 = () => {
  const { days, firstDayIndex } = getDaysInMonth(currentMonth);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let calendar = [];
  const arrayToDate = (arr) => new Date(arr[0], arr[1] - 1, arr[2]);

  for (let day = 1; day <= days; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayName = dayNames[date.getDay()];

    const tasksForDay = task2 ? task2.filter(task => date >= arrayToDate(task.startdate) && date <= arrayToDate(task.enddate)):[];

    calendar.push(
      <div key={day} className="calendar-day1">
        <div className="day-number"></div>
        <div className="day-name"></div>
        {tasksForDay && tasksForDay.map((task, index) => (
          <div 
            key={index} 
            className="task-bar task-bar1"
            style={{ backgroundColor: colors[(task2.findIndex(tas => tas.taskname === task.taskname)+2) % colors.length] }} 
          >
            {task.taskname}
          </div>
        ))}
      </div>
    );
  }

  return calendar;
};

const renderCalendar3 = () => {
  const { days, firstDayIndex } = getDaysInMonth(currentMonth);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let calendar = [];
  const arrayToDate = (arr) => new Date(arr[0], arr[1] - 1, arr[2]);

  for (let day = 1; day <= days; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayName = dayNames[date.getDay()];

    const tasksForDay = task3 ? task3.filter(task => date >= arrayToDate(task.startdate) && date <= arrayToDate(task.enddate)):[];

    calendar.push(
      <div key={day} className="calendar-day1">
        <div className="day-number"></div>
        <div className="day-name"></div>
        {tasksForDay && tasksForDay.map((task, index) => (
          <div 
            key={index} 
            className="task-bar task-bar2"
            style={{ backgroundColor: colors[(task3.findIndex(tas => tas.taskname === task.taskname)+4) % colors.length] }}
          >
            {task.taskname}
          </div>
        ))}
      </div>
    );
  }

  return calendar;
};


  return (
    <div className="calendar-container">
      <div className='cal'>
        <div className="calendar-header">
          <p onClick={() => changeMonth(-1)}><ChevronLeft/></p>
          <h2>
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </h2>
          <p onClick={() => changeMonth(1)}><ChevronRight/></p>
        </div>
        <div className='full-calen'>
          <div className="calendar-grid">
            {renderCalendar()}
          </div>
          <div className="calendar-grid">
            {renderCalendar1()}
          </div>
          <div className="calendar-grid">
            {renderCalendar2()}
          </div>
          <div className="calendar-grid">
            {renderCalendar3()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
