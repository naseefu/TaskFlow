import React, { useEffect, useState } from 'react';

const TimeDisplay = ({isHeader4}) => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const currentHour = new Date().getHours();
    const formatTime = () => {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const formatDate = () => {
        const now = new Date();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let dayName = dayNames[now.getDay()];
        let day = now.getDate();
        let monthName = monthNames[now.getMonth()];

        return `${dayName}, ${day} ${monthName}`;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(formatTime());
            setDate(formatDate());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{fontSize: isHeader4? '18px':'22px'}}>{time}</h1>
            <p style={{fontSize:isHeader4? '11px':'13px'}}>{date}</p>
        </div>
    );
};

export default TimeDisplay;
