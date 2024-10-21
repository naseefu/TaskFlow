import React, { useEffect, useState } from 'react';
import './home.css';
import profile3 from '../profiles/img1.PNG';
import profile4 from '../profiles/img2.PNG';
import profile5 from '../profiles/img3.PNG';
import iconmain from '../images/plus.png';
import { CalendarDays, CircleCheckBig, CircleX, ClipboardCheck, Ellipsis, FolderKanban, LayoutDashboard, LogOut, MoveDown, MoveUp, PersonStanding, Settings, Trash2, Users } from 'lucide-react';
import HomeHeader from '../commons/HomeHeader';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import ApiService from '../../Sevices/Apiservices';
import { useProjects, useTaskData, useTodayTaskData } from '../Context/ProjectContext';
import DynamicPage from '../Context/DynamicPage';
import { useTeam } from '../Context/TeamDet';
import Signups from '../Test/Signtest';
import JoinTeam from '../Team/JoinTeam';

const Home = ({taskLength}) => {
  const navigate = useNavigate()
  const [drop,setDrop] = useState(true)
  const { user } = useUser();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [activeTeam,setActiveTeam] = useState('')
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const lastPart = parts[parts.length - 1];
  const colors = ['#0055ff', 'black', '#ff5d39', '#FF69B4', '#40E0D0'];
  const [logpopup,setLogpopup] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [userList,setUserList]=useState([])
  const location = useLocation();

  const teamDetailsuser = useTeam()

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const pro = [profile3,profile4,profile5]
  const {logout} = useUser()

  const togglelogpop=()=>{
    setLogpopup(!logpopup)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setDrop(true);
      } else {
        setDrop(false);
      }
    };
    handleResize();
    setActiveComponent(lastPart);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const handleDrop = () => {
  const handleResize = () => {
    if (window.innerWidth > 1000) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  };

  window.addEventListener('resize', handleResize);

  handleResize();
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};


  const getCardStyle = (component) => ({
    cursor: 'pointer',
    color: activeComponent === component ? 'white' : 'grey',
  });
  const getCardStyle1 = (component) => ({
    cursor: 'pointer',
    color: activeComponent === component ? 'white' : 'rgb(146, 146, 146)',
  });

  const [team,setTeam] = useState([])
  useEffect(() => {
    const handleAllTeam = async () => {
        try {
            const userId = parseInt(user.id, 10);
            const response = await ApiService.getAllTeams(userId);
            setUserList(response.userList)
            setTeam(response.teamList)
        } catch (err) {
            
        }
    };

    const loca = location.pathname;
    setActiveComponent(loca);
    handleAllTeam();
  }, [user.id,location.pathname]);


  const handleComponent = (comp)=>{
    navigate(`/home/${comp}`)
  }


   const [teamname, setTeamName] = useState('');
  const [teamdescription, setDescription] = useState('');
  const [members, setMembers] = useState([{ name: '', role: '', accessLevel: 'Member' }]);

  const handleLogout = async(e)=>{
    e.preventDefault();
    try{
      logout();
      const response = ApiService.logout();
      navigate('/')
    }
    catch(error){
      console.error(error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const addTeam = { teamname:teamname+" Team", teamdescription };

    try{
      const response  = await ApiService.addTeam(addTeam,user.id)
      togglePopup();
      window.location.reload();
      return response
    }
    catch(error){
      console.log(error)
    }
    
  };
  const project1 = useProjects()

  const handleNavigateTeam=(id)=>{
    navigate(`/home/team/${id}`)
  }

  const taskslength1 = useTaskData().filter((task)=>task.duration!="Expired").length

  const todaytasklength = useTodayTaskData().length

  const [addMember,setAddMember] = useState(true)

  const [teamcode,setTeamCode] = useState()

  const [teamIndex,setTeamIndex] = useState(0)

  const handleSwap = (swapper,index)=>{
    setAddMember(swapper)
    setTeamIndex(index)
  }

  const [joinError,setJoinError] = useState('')
  const [joinSuccess,setJoinSuccess] = useState('')

  useEffect(()=>{
    if(joinError || joinSuccess){
      setTimeout(()=>{
        setJoinError('')
        setJoinSuccess('')
      },5000)
    }
  },[joinError,joinSuccess])

  const handleJoinReq =async()=>{
    try{
      const response = await ApiService.sendJoinReq(user.id,{teamcode})
      setJoinSuccess(response.message)
    }
    catch(err){
      setJoinError(err.response?.data?.message || "An error occured")
    }
  }

  return (
    <div className='main'>

      <DynamicPage
        title={activeComponent.split('/')[2]}
        description={`${activeComponent.split('/')[2]} page`}
      />
      {logpopup && (
        <div className="popup">
          <div className="popup-content" style={{backgroundColor:'black',color:'white',padding:'40px 40px'}}>
            <div className='popup-title' style={{}}>
                <h3>Are you sure want to logout ?</h3>
            </div>
            <div className='btns-pop'>
        <button className='add-btn' type="button" onClick={handleLogout}>
          Logout
        </button>
        <button className='close-btn' onClick={togglelogpop}>Close</button></div>
        <div>
          </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup" >
          <div className="popup-content" >
            <div style={{display:'flex',gap:'1rem',marginBottom:'10px'}}>
              <div className='handle-swapper' onClick={()=>handleSwap(true,0)} style={{textAlign:'center'}}>
                <p >Add Team</p>
                <div className='popup-underline' style={{backgroundColor:teamIndex===0&&'black'}}></div>
              </div>
              <div className='handle-swapper' onClick={()=>handleSwap(false,1)} style={{textAlign:'center'}}>
                <p >Join Team</p>
                <div className='popup-underline' style={{backgroundColor:teamIndex===1&&'black'}}></div>
              </div>
            </div>
            {addMember ?
            <div className='swap-section'>
            <div>
              <div className='popup-title'>
                <h1 style={{textAlign:'center'}}>Add Team</h1>
                <p style={{textAlign:'center'}}>Fill the following details</p>
              </div>
            </div>
        <div className='team-name'>
          <label>Team name</label>
          <div className='teamname' style={{position:'relative'}}>
            <p style={{position:'absolute',right:'0',top:'0',fontSize:"13px",color:'grey',top:'50%',transform:'translate(-50%,-50%)'}}>+ Team</p>
        <input
          type="text"
          name="teamname"
          value={teamname}
          placeholder='Team name'
          onChange={(e)=>setTeamName(e.target.value)}
          required
        /></div>
      </div>

      <div className='team-name'>
        <label>Description</label>
        <textarea
          name="teamdescription"
          value={teamdescription}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder='Description'
          className='description'
        />
      </div>

      <div className='add-member' style={{display:'flex',flexDirection:'row'}}>
        <div className='btns-pop'>
        <button className='close-btn' onClick={togglePopup} style={{borderRadius:"20px"}}>Close</button></div>
        <div>
          <button className='submit-btn'style={{backgroundColor:'#0055ff',borderRadius:"20px"}} onClick={handleSubmit}>Add Team</button>
        </div>
      </div>
            
          </div> : <div className='swap-section'><JoinTeam joinSuccess={joinSuccess} joinError={joinError} teamcode={teamcode} setTeamCode={setTeamCode} handleJoinReq={handleJoinReq} togglePopup={togglePopup}/></div>}
        </div>
        </div>
      )}
      
      <div className='main-header'>
        <HomeHeader/>
      </div>
      <div>
      <div className='mains'>
        {/* <div className='underline1'></div> */}
        <div className='main-drop'><p className='drop-btn' onClick={()=>setDrop(!drop)}>{!drop?<MoveDown height={'15px'} /> : <MoveUp height={'15px'} />}</p></div>
        {drop&&<div className='main1'>
          

          <div className='main1-2'>
            <div className='main1-2-title'>
              <p>HOME</p>
            </div>
            <div className='main1-2-cards'>
              <div
               style={getCardStyle('/home/dashboard')}
                className={activeComponent.startsWith(`/home/dashboard`) ? 'main1-2-card1 main1-2-cards1 active-main' : 'main1-2-card1 main1-2-cards1'}
                onClick={() => handleComponent('dashboard')}
              >
                <div className='' style={{flexDirection:'row',display:'flex',alignItems:'center',gap:'0.7rem'}}>
                <p className='main1-icon' style={getCardStyle1('dashboard')}><LayoutDashboard className='icon-dash' /></p>
                <p className='main1-p' onClick={handleDrop}>Dashboard</p>
                </div>
              </div>

              <div style={getCardStyle('/home/projects')}
                className={activeComponent === '/home/projects' ? 'main1-2-card1 main1-2-cards1 active-main' : 'main1-2-card1 main1-2-cards1'}
                onClick={() => handleComponent('projects')
              }
              >
                <div className='' style={{flexDirection:'row',display:'flex',alignItems:'center',gap:'0.7rem'}}>
                <p className='main1-icon' style={getCardStyle1('projects')}><FolderKanban className='icon-dash' /></p>
                <p className='main1-p' onClick={handleDrop}>Projects</p>
                </div>
                <div>
                  <p className={project1.length && 'count-cards'} style={{fontSize: '12px'}}>{ project1.length ? `+${project1.length}`: ''}</p>
                </div>
              </div>

              <div style={getCardStyle('/home/today-task')}
                className={activeComponent === '/home/today-task' ? 'main1-2-card1 main1-2-cards1 active-main' : 'main1-2-card1 main1-2-cards1'}
                onClick={() => handleComponent('today-task')}>
                <div className='' style={{flexDirection:'row',display:'flex',alignItems:'center',gap:'0.7rem'}}>
                  <p className='main1-icon' style={getCardStyle1('today-task')}><ClipboardCheck className='icon-dash' /></p>
                  <p className='main1-p' onClick={handleDrop}>Today's Tasks</p>
                </div>
                <div>
                  <p className='count-cards' style={{fontSize:'12px'}}>+{todaytasklength ? todaytasklength :0}</p>
                </div>
              </div>

              <div style={getCardStyle('/home/all-task')}
                className={activeComponent === '/home/all-task' ? 'main1-2-card1 main1-2-cards1 active-main' : 'main1-2-card1 main1-2-cards1'}
                onClick={() => handleComponent('all-task')}>
                <div className='' style={{flexDirection:'row',display:'flex',alignItems:'center',gap:'0.7rem'}}>
                  <p className='main1-icon' style={getCardStyle1('all-task')}><CircleCheckBig className='icon-dash' /></p>
                  <p className='main1-p' onClick={handleDrop}>All Tasks</p>
                </div>
                <div>
                  <p className='count-cards' style={{fontSize:'12px'}}>{taskslength1?'+'+taskslength1 :'0'}</p>
                </div>
              </div>

              <div style={getCardStyle('/home/calendar')}
                className={activeComponent === '/home/calendar' ? 'main1-2-card1 main1-2-cards1 active-main' : 'main1-2-card1 main1-2-cards1'}
                onClick={() => handleComponent('calendar')}>
                <div className='' style={{flexDirection:'row',display:'flex',alignItems:'center',gap:'0.7rem'}}>
                  <p className='main1-icon' style={getCardStyle1('calendar')}><CalendarDays className='icon-dash' /></p>
                  <p className='main1-p' onClick={handleDrop}>Calendar</p>
                </div>
              </div>
            </div>
          </div>

          <div className='underline2'></div>
        <div className='main1-3'>
  <div className='main1-3-title'>
    <p className='main1-3-title-p'>TEAM</p>
    <img src={iconmain} alt='icons' onClick={togglePopup} />
  </div>
  {team.length === 0 ? 
    <div style={{padding:'20px 25px',color:'grey'}}>
      Add Team
    </div> :
    <div style={{paddingBottom:'35px'}}>
      {team.map((t, index) => (
        <div key={t.id} className='main132-team' style={{paddingBottom:'0px',cursor:'pointer',paddingTop:'25px',padding:'25px 10px 0 10px'}} onClick={()=>handleNavigateTeam(`${t.id}`)}>
          <div className={activeComponent===`/home/team/${t.id}` || activeComponent.startsWith(`/home/project/${t.id}`) ? 'main1-3-team mains13-team':'main1-3-team'} onClick={handleDrop}>
          <p>{t.teamname.split(' Team')[0].length>14 ?t.teamname.split(' Team')[0].slice(0,14)+'..':t.teamname.split(' Team')[0]}</p>
          <div className='main1-3-team-img'>
          {teamDetailsuser && teamDetailsuser[index] && Array.isArray(teamDetailsuser[index]) ? (
    teamDetailsuser[index].length > 1 ? (
        teamDetailsuser[index].slice(0, 3).map((userpic, idx) => (
            <img key={idx} src={userpic.profilepicture} alt='user-icons' height='30px' />
        ))
    ) : (
        teamDetailsuser[index].map((userpic, idx) => (
            <img key={idx} src={userpic.profilepicture} alt='user-icons' height='30px' />
        ))
    )
) : (
    <p>No user details available</p>
)}

              {t.teamsize > 3 && <p className='rest' style={{backgroundColor:`${colors[index%colors.length]}`,color:'white',fontSize:'12px'}}>+{t.teamsize - 3 }</p>}
          </div>
          </div>
        </div>
      ))}
    </div>
    }
    </div>


          <div className='underline2'></div>
          <div className='main1-4'>
            <h2 style={{color:'black'}}>GENERAL</h2>
            <div className='main1-4-content'>
              <p><Settings className='settings-main1-4' /></p>
              <p>Settings</p>
            </div>
            <div className='main1-4-content'>
              <p><PersonStanding className='settings-main1-4' /></p>
              <p>About us</p>
            </div>
            <div className='main1-4-content'>
              <p><LogOut  className='settings-main1-4' /></p>
              <p onClick={togglelogpop}>Log out</p>
            </div>
          </div>
        </div>}

        <div className='main2'>

          <div className='main2-content' style={{backgroundColor:'',margin:0,width:'100%'}}>
            <Outlet/>
          </div>
          
        </div>
    </div>
      </div>
    </div>
  );
};

export default Home;
