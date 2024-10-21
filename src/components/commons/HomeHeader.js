import React, { useState } from 'react';
import profile1 from '../images/profile.jpg';
import { CiSearch } from 'react-icons/ci';
import TimeDisplay from '../Date/TimeDisplay';
import './homeheader.css';
import { House, Menu } from 'lucide-react';
import { Bell } from 'lucide-react';
import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { useEffect } from 'react';
import ApiService from '../../Sevices/Apiservices';

const HomeHeader = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const { user } = useUser();
    const [teamRequest,setTeamRequest] = useState([])
    const [recruitRequest,setRecruitRequest] = useState([])
    const [teamRequestCount,setTeamRequestCount] = useState()
    const [recruitRequestCount,setRecruitRequestCount] = useState()
    
    // Function to get greeting based on the current hour
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Morning';
        } else if (currentHour < 16) {
            return 'Afternoon';
        } else {
            return 'Evening';
        }
    };

    const location = useLocation();

    useEffect(()=>{

      const getTeamRequest = async(e)=>{
        try{
          const response = await ApiService.getTeamRequest(user.id)
        
          setTeamRequest(response)
          setTeamRequestCount(response.countOfTeamRequest)
        }
        catch(err){
          console.log(err)
        }
      }

      const getRecruitRequest = async(e)=>{
        try{
          const response = await ApiService.getRecruitRequest(user.id);
          setRecruitRequestCount(response.counrOfRecruitRequest)
        }
        catch(err){
          console.log(err)
        }
      }
      getRecruitRequest();
      getTeamRequest();

    },[user,location])

    return (
        <div>
            <div className='header'>
                <div className='header1'>
                  {user &&
                    <div className='header1-icon'>
                        <img src={user.profilepicture} alt='profile-header' />
                    </div>}
                  {user&&
                    <div className='header1-name'>
                        <h3>{user.firstname} {user.lastname}</h3>
                        <p>{getGreeting()}, {user.firstname}</p>
                    </div>}
                </div>
                <div className='headers2'>
                    <div className='header2'>
                        <div className='header2-search'>
                            <p className='search'><CiSearch className='header-search-icon' /></p>
                            <input type='text' placeholder='Find your Task, Projects ...' />
                        </div>
                    </div>
                    <div className='header3'>
                        <TimeDisplay />
                    </div>
                </div>
                <div className='header33'>
                    <p onClick={() => navigate('/home/dashboard')}><House /></p>
                    <p className='header-bell' style={{display:'flex',alignItems:'center'}} onClick={()=>navigate('/home/notifications')}><Bell /> {teamRequestCount || recruitRequestCount ? <p style={{color:'white',backgroundColor:'red',padding:'1px 5px',borderRadius:'10px',fontSize:'10px'}}>{teamRequestCount+recruitRequestCount}</p>:''}</p>
                    <p className='header-menu' onClick={() => setMenu(!menu)}>{!menu ? <Menu /> : <X />}</p>
                </div>
            </div>
            {menu && (
                <div className='header4'>
                    <div className='header4-1'>
                        <div className='header4-11'>
                            <div className='header4-11-search'>
                                <p className='search'><CiSearch className='header-search-icon' /></p>
                                <input type='text' placeholder='Find your Task, Projects ...' />
                            </div>
                        </div>
                        <div className='header4'>
                            <TimeDisplay isHeader4={true} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeHeader;
