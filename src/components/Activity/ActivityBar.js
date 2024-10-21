import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import './activity.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from "../Context/UserContext";

// Register the required components, including ChartDataLabels
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ActivityBar = () => {
  const [weekOffset, setWeekOffset] = useState(0); // To track the week offset
  const [data, setData] = useState([]); // Data for the chart
  const [monthYear, setMonthYear] = useState(""); // For displaying the month and year at the top

  const {user} = useUser();
  // Function to calculate the current week's data
  const getWeekData = (offset) => {
    const today = new Date();
    const currentDate = new Date(today.setDate(today.getDate() - today.getDay() + 1 + offset * 7)); // Get Monday of the week
    const weekData = [];

    // Update the month and year for the title
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    setMonthYear(`${monthName} ${year}`);

    // Generate data for Monday to Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      const monthDayString = `${date.getDate().toString().padStart(2, '0')}`; // Format: MM-DD

      // Hardcoded hours for demonstration (0 for "Day Off" on Wednesday)
      const hours = Math.floor(Math.random() * 24); // Random hours, 0 on Wednesday
      weekData.push({ date: monthDayString, hours });
    }

    return weekData;
  };

  useEffect(() => {
    const fetchedData = getWeekData(weekOffset);
    setData(fetchedData);
  }, [weekOffset]);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: "Hours Spent",
        data: data.map(d => d.hours),
        backgroundColor: data.map(d => d.hours >= 9 ? "#6737f5" : "#d3c7fb"),
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5, // Rounded corners at the top and bottom
        borderSkipped: false, // Rounds corners on both sides
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
            display: false, // This hides the legend
        },
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        formatter: (value) => value === 0 ? 'Day Off' : `${value} h`, // Display hours or "Day Off"
        font: {
          weight: 'bold',
          size: 11,
        },
        color: 'black',
        backgroundColor:'rgba(143, 143, 143,0.1)',
        borderWidth: 0,
        borderRadius: 20, // Rounded corners at the top and bottom
        borderSkipped: false,
        padding:{
          top:5,
          bottom:5,
          left:7
          ,right:7
        },
      },
      tooltip: {
        enabled: false, // Disable default tooltip
      },
      title: {
        display: true,
        text: monthYear, // Display the month name and year as the title
        font: {
          size: 20,
          family:'font2,sans-serif'
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        display: false,
        min:0,
        max:24,
        ticks: {
        stepSize: 3,  // Adjust step size to control granularity of y-axis ticks
      } // Remove the y-axis
      },
      x: {
        grid: {
          display: false, // Remove x-axis gridlines
        },  
      },
    },
    minBarThickness:window.innerWidth < 768 ? 20 : 5,
    maxBarThickness:window.innerWidth < 408 ? 9 :50,
    responsive: true,
  };

  return (
    <div className="activity">
      <div className="act">
      <h3>Activity</h3>
      {user.subscription==="Basic" ? '':<div style={{ marginBottom: '10px',display:'flex' }}>
        <p onClick={() => setWeekOffset(weekOffset - 1)} className="week1"><ChevronLeft/></p>
        <p onClick={() => setWeekOffset(weekOffset + 1)} className="week2"><ChevronRight/></p>
      </div>}</div>
      {user.subscription==="Basic"&&<div className="subbscribe" style={{ position: 'absolute', top: '50%', width: '90%' }}>
          <p style={{textAlign:'center',fontWeight:"bold"}}>Subscribe to view the activity</p>
        </div>}
      <div style={{filter:user.subscription==="Basic" ? 'blur(15px)':'blur(0px)'}}>
      <Bar data={chartData} options={options} className="bars"/>
      <div className="horizontal-line" style={{ position: 'absolute', top: '50%', width: '90%' }}></div></div>
    </div>
  );
};

export default ActivityBar;
