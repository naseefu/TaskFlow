import axios from 'axios'

export default class ApiService{

  static BASE_URL = "https://taskflowapp-1.onrender.com"

  static getHeader(){
    const token = localStorage.getItem('token');
    return{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    };
  }

  static async registerUser(registration){
    const response = await axios.post(`${this.BASE_URL}/auth/register`,registration);
    return response.data
  }


  static async loginUser(loginDetails){
    const response = await axios.post(`${this.BASE_URL}/auth/login`,loginDetails);
    return response.data
  }



  static async getAllUsers(){
    const response = await axios.get(`${this.BASE_URL}/users/all`,{

      headers: this.getHeader()

    })

    return response.data
  }

  static async getUserProfile(){
    const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`,{
      headers: this.getHeader()
    })
    return response.data
  }


  static async getUser(userId){
    const response =await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`,{
      headers: this.getHeader()
    })
    return response.data
  }


  static async getAllProjects(userId){
    const response = await axios.get(`${this.BASE_URL}/projects/get-all-projects/${userId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

    static async getAllProjectsByTeamId(userId,teamId){
    const response = await axios.get(`${this.BASE_URL}/projects/get-projects-teamid/${userId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

    static async getAllTeams(userId){
    const response = await axios.get(`${this.BASE_URL}/teams/get-all-teams/${userId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async getTeamByTeamId(userId,teamId){
    const response = await axios.get(`${this.BASE_URL}/teams/get-teamby-teamid/${userId}/${teamId}`,{
      headers: this.getHeader()
    })
    return response.data
  }

  static async addTeam(addTeam,userId){
    const response = await axios.post(`${this.BASE_URL}/teams/add-team/${userId}`,addTeam,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async sendRecruitRequest(teamRequest){
    const response = await axios.post(`${this.BASE_URL}/teams/send-addmemberrequest`,teamRequest,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async getTeamRequest(userId){
    const response = await axios.get(`${this.BASE_URL}/teams/get-team-req/${userId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async acceptTeamRequest(userId,teamId){
    const response = await axios.post(`${this.BASE_URL}/teams/accept-team-request/${userId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

    static async rejectTeamRequest(userId,teamId){
    const response = await axios.post(`${this.BASE_URL}/teams/reject-team-request/${userId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }



    static async getRecruitRequest(userId){
    const response = await axios.get(`${this.BASE_URL}/teams/get-recruit-request/${userId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async acceptRecruitRequest(userId,teamId){
    const response = await axios.post(`${this.BASE_URL}/teams/accept-recruit-request/${userId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

    static async rejectRecruitRequest(userId,teamId){
    const response = await axios.post(`${this.BASE_URL}/teams/reject-recruit-request/${userId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }


  static async addProjectToTeam(userId,teamId,projectDto){
    const response = await axios.post(`${this.BASE_URL}/projects/add-project/${userId}/${teamId}`,projectDto,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async getAllTaskByUserid(userId){
    const response = await axios.get(`${this.BASE_URL}/task/get-alltask-userid/${userId}`,{
      headers:this.getHeader()
    })
    return response.data;
  }

  static async getEachProjectDetails(userId,teamId,projectId){
    const response = await axios.get(`${this.BASE_URL}/projects/get-each-project/${userId}/${teamId}/${projectId}`,{
      headers:this.getHeader()
    })
    return response.data;
  }

  static async getAllTaskByProject(userId,teamId,projectId){
    const response = await axios.get(`${this.BASE_URL}/task/get-alltaskproject/${userId}/${teamId}/${projectId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async getAlltodayTask(userId){
    const response = await axios.get(`${this.BASE_URL}/task/get-today-tasks/${userId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async sendJoinReq(userId,teamcode){
    const response = await axios.post(`${this.BASE_URL}/teams/join-team-request/${userId}`,teamcode,{
      headers:this.getHeader()
    })
    return response.data;
  }

  static async deleteMember(userId,removerId,teamId){
    const response = await axios.post(`${this.BASE_URL}/teams/remove-member/${userId}/${removerId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static async addTask(userId,teamId,projectId,task){
    const response = await axios.post(`${this.BASE_URL}/task/add-task/${userId}/${teamId}/${projectId}`,task,{
      headers:this.getHeader()
    })
    return response.data;
  }

  static async deleteTeam(userId,teamId){
    const response = await axios.post(`${this.BASE_URL}/teams/delete-team/${userId}/${teamId}`,{
      headers:this.getHeader()
    })
    return response.data
  }

  static logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username'); 
    localStorage.removeItem('isEntered');
    localStorage.removeItem('userid')
  }


  static isAuthenticated(){
    const token = localStorage.getItem('token')
    return !!token
  }

  static isAdmin(){
    const role = localStorage.getItem('role');
    return role === 'ADMIN'
  }

  static isUser(){
    const role = localStorage.getItem('role');
    return role === 'USER'
  }

  static isEntered(){
    if(this.isAuthenticated()){
    const entered = localStorage.getItem('isEntered')
    return entered ==='true';
  }
    return true;
  }

}