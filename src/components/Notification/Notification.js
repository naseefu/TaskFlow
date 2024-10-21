import React from 'react'
import './notification.css'
import { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import ApiService from '../../Sevices/Apiservices'
import { useState } from 'react'
import img1 from '../images/jointeam.png'
import img2 from '../images/invite.png'
import { CircleArrowOutUpRight, Mail, Plus, User } from 'lucide-react'
import 'font-awesome/css/font-awesome.min.css';
import DynamicPage from '../Context/DynamicPage'

const Notification = () => {

  const {user} = useUser()
  const [teamUserList,setTeamUserList] = useState([])
  const [teamTeamList,setTeamTeamList] = useState([])
  const [teamRequestCount,setTeamRequestCount] = useState()
  const [recruitTeamList,setRecruitTeamList] = useState([])
  const [recruitUserList,setRecruitUserList] = useState([])
  const [recruitRequestCount,setRecruitRequestCount] = useState()
  const [agoTime,setAgoTime] = useState([])
  const [teamAgoTIme,setTeamAgoTime] = useState([])
  const [inviteBtn,setInviteBtn] = useState()
  const [inviteRejectBtn,setInviteRejectBtn] = useState()
  const [joinBtn,setJoinBtn] = useState()
  const [joinRejectBtn,setJoinRejectBtn] = useState()
  const [error,setError] = useState('')

  useEffect(()=>{
    if(user){
      const getTeamRequest = async(e)=>{
        try{
          const response = await ApiService.getTeamRequest(user.id)

          setTeamRequestCount(response.countOfTeamRequest)
          setTeamAgoTime(response.agoTime)
          setTeamTeamList(response.teamList)
          setTeamUserList(response.userList)
        }
        catch(err){
          console.log(err)
        }
      }

      const getRecruitRequest = async(e)=>{
        try{
          const response = await ApiService.getRecruitRequest(user.id);
          setRecruitRequestCount(response.counrOfRecruitRequest)
          setAgoTime(response.agoTime)
          setRecruitTeamList(response.teamList)
          setRecruitUserList(response.userList)
        }
        catch(err){
          console.log(err)
        }
      }
      getRecruitRequest();
      getTeamRequest();}

    },[user,inviteBtn,joinBtn])

    const handleAcceptRecruit=async(id2,index)=>{
      setJoinBtn(index)
      try{
        const response = await ApiService.acceptRecruitRequest(user.id,id2)
        window.location.reload()
        setJoinBtn('')
      }
      catch(err){
        setJoinBtn('')
        setError(err.response?.data?.message || "An error ocurred")
      }
    }
    const handleRejectRecruit=async(id2,index)=>{
      setJoinRejectBtn(index)
      try{
        const response = await ApiService.rejectRecruitRequest(user.id,id2)
        window.location.reload()
        setJoinRejectBtn('')
      }
      catch(err){
        setJoinRejectBtn('')
        setError(err.response?.data?.message || "An error ocurred")
      }
    }


    const handleAcceptRequest=async(id1,id2,index)=>{
      setJoinBtn(index)

      try{
        const response = await ApiService.acceptTeamRequest(id1,id2)
        window.location.reload()
        setJoinBtn('')
      }
      catch(err){
        setJoinBtn('')
        setError(err.response?.data?.message || "An error ocurred")
      }
    }
    const handleRejectRequest=async(id1,id2,index)=>{
      setJoinRejectBtn(index)
      try{
        const response = await ApiService.rejectTeamRequest(id1,id2)
        window.location.reload()
        setJoinRejectBtn('')
      }
      catch(err){
        setJoinRejectBtn('')
        setError(err.response?.data?.message || "An error ocurred")
      }
    }


  return (
    <div className='notification' style={{gap: recruitRequestCount>0 && teamRequestCount>0 ? '4rem' :'0rem'}}>
      <DynamicPage title="Notification page" description="You can see all the notification.."/>
      <div className='recruit-req'>
        {recruitTeamList && recruitUserList && agoTime && recruitRequestCount ?
          <div className='recruits'>
            <p className='rec-count'>Total Invite Request :  {recruitRequestCount>0 && recruitRequestCount}</p>
            {recruitUserList.map((users,index)=>(
              <div className='recruiter'>
                <div className='recruit-icon'>
                  <div className='recruit-img' style={{backgroundColor:'transparent',border:'none',padding:'8px 10px'}}>
                    <p><CircleArrowOutUpRight color='white'/></p>
                  </div>
                <div className='recruit-team'>
                  <p>{recruitTeamList[index].teamname}</p>
                  <p>{recruitTeamList[index].description}</p>
                </div>
                </div>
                <div className='recruit-user'>
                  <p style={{color:'rgba(97, 255, 126,1)'}}><span><User height="17px"/></span>{users.firstname} {users.lastname}</p>
                  <p style={{color:'grey'}}><span><Mail height="17px" color='grey'/></span>{users.email}</p>
                </div>
                <div className='recruit-btn'>
                  {inviteBtn ===index ? <button className="buttonload accept-rec" style={{backgroundColor:'rgba(97, 255, 126,0.8)'}}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>:
                  <button className='accept-rec' style={{backgroundColor:'rgba(97, 255, 126,0.8)'}} onClick={()=>handleAcceptRecruit(recruitTeamList[index].id,index)}>Accept</button>}
                  {inviteRejectBtn ===index ? <button className="buttonload reject-rec" style={{backgroundColor:'rgba(255, 51, 31,0.8)'}}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>:
                   <button className='reject-rec' style={{backgroundColor:'rgba(255, 51, 31,0.8)'}} onClick={()=>handleRejectRecruit(recruitTeamList[index].id,index)}>Reject</button>}
                </div>
                  <div className='agotime'>
                  <p style={{fontSize:'13px'}}>{agoTime[index]} ago</p>
                </div>
              </div>
            ))}
          </div>:''
        }
        
      </div>
      <div className='recruit-req'>
        {teamTeamList && teamUserList && teamAgoTIme && teamRequestCount ?
          <div className='recruits'>
            <p className='rec-count' style={{backgroundColor:'rgba(0, 119, 255,0.7) '}}>Total Join Request : {teamRequestCount>0 ? teamRequestCount:''}</p>
            {teamUserList.map((users,index)=>(
              <div className='recruiter'>
                <div className='recruit-icon'>
                  <div className='recruit-img' style={{backgroundColor:'transparent',border:'none',padding:'8px 10px'}}>
                    <p><Plus color='white' /></p>
                  </div>
                <div className='recruit-team'>
                  <p>{teamTeamList[index].teamname}</p>
                  <p>{teamTeamList[index].description}</p>
                </div>
                </div>
                <div className='recruit-user'>
                  <p style={{color:'rgba(97, 255, 126,1)'}}><span><User height="17px"/></span>{users.firstname} {users.lastname}</p>
                  <p style={{color:'grey'}}><span><Mail height="17px" color='grey'/></span>{users.email}</p>
                </div>
                <div className='recruit-btn'>
                  {joinBtn===index ? <button className="buttonload accept-rec" style={{backgroundColor:'rgba(97, 255, 126,0.8)'}}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>:<button className='accept-rec' style={{backgroundColor:'rgba(97, 255, 126,0.8)'}} onClick={()=>handleAcceptRequest(users.id,teamTeamList[index].id,index)}>Accept</button>}

                  {joinRejectBtn ===index ? <button className="buttonload reject-rec" style={{backgroundColor:'rgba(255, 51, 31,0.8)'}}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>:<button className='reject-rec' style={{backgroundColor:'rgba(255, 51, 31,0.8)'}} onClick={()=>handleRejectRequest(users.id,teamTeamList[index].id,index)}>Reject</button>}
                </div>
                  <div className='agotime'>
                  <p style={{fontSize:'13px'}}>{teamAgoTIme[index]} ago</p>
                </div>
              </div>
            ))}
          </div>:''}
          <div>
            {teamTeamList && teamUserList && teamAgoTIme && teamRequestCount || recruitTeamList && recruitUserList && agoTime && recruitRequestCount ? '':<p style={{color:'grey',textAlign:'center'}} >No new notifications right now</p>}
          </div>
        
      </div>
        
    </div>
  )
}

export default Notification
