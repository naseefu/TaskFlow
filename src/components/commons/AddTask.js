import React, { useEffect, useState } from 'react';
import ApiService from '../../Sevices/Apiservices';
import './addmembers.css';

const AddTask = ({ showPopup, togglePopup, teamId, userId, projectId,userList,setShowPopup }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [taskname, setTaskName] = useState('');
  const [taskdescription, setTaskDesc] = useState('');
  const [jobtype, setJobType] = useState('');
  const [priority, setPriority] = useState('');
  const [assignto, setAssignto] = useState(['']);
  const [startdate, setStart] = useState('');
  const [enddate, setEnd] = useState('');
  const teamss = ["Team", "Hello", "hai", "ok"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.addTask(userId, teamId, projectId, {
        taskname,
        taskdescription,
        jobtype,
        priority,
        assignto,
        startdate,
        enddate,
      });
      setSuccess('Task added');
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong, please try again');
      setSuccess('');
    }
  };
  const handleAddMember = (e) => {
    e.preventDefault();
    
    // Prevent adding a new member if the last entry is empty
    if (!assignto[assignto.length - 1]) {
      return; // Do not add a new member if the last entry is empty
    }
    
    // Add an empty entry for the new member
    setAssignto([...assignto, '']);
  };

  const handleRemoveMember = (index) => {
    const newAssignto = [...assignto];
    newAssignto.splice(index, 1);
    setAssignto(newAssignto);
  };

  const handleAssigntoChange = (e, index) => {
    const updatedAssignto = [...assignto];
    updatedAssignto[index] = e.target.value;
    setAssignto(updatedAssignto);
  };

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        setError('');
        setSuccess('');
        setShowPopup(false)
      }, 2000);
    }
  }, [error, success]);

  return (
    <div>
      {showPopup && (
        <div className="popup addtask">
          <div className="popup-content" style={{ transition: 'all 1s ease' }}>
            <div>
              <div className="popup-title" style={{ textAlign: 'center' }}>
                <h1>Add Task</h1>
                <p>Fill the following details</p>
              </div>
            </div>
            {error && (
              <div>
                <p style={{ color: 'red' }} className="add-success">{error}</p>
              </div>
            )}
            {success && (
              <div>
                <p style={{ color: 'rgba(32, 252, 143,1)' }} className="add-success">{success}</p>
              </div>
            )}
            <div className="task-name">
              <label style={{ marginBottom: '10px' }}>Task Name</label>
              <input
                type="text"
                name="task"
                value={taskname}
                placeholder="Task name"
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div className="task-name">
              <label style={{ marginBottom: '10px' }}>Task Description</label>
              <input
                type="text"
                name="task"
                value={taskdescription}
                placeholder="Task description"
                onChange={(e) => setTaskDesc(e.target.value)}
                required
              />
            </div>
            <div className="task-name">
              <label style={{ marginBottom: '10px' }}>Task Type</label>
              <input
                type="text"
                name="task"
                value={jobtype}
                placeholder="Eg: Design, Development,..."
                onChange={(e) => setJobType(e.target.value)}
                required
              />
            </div>
            <div className="task-name" style={{ flexDirection: 'column', alignItems: 'start', width: "100%" }}>
              <label style={{ marginBottom: '10px' }}>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option disabled value="">
                  Select an option
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="task-name">
              <label style={{ marginBottom: '10px' }}>Start date</label>
              <input
                type="datetime-local"
                name="date"
                value={startdate}
                onChange={(e) => setStart(e.target.value)}
                required
              />
            </div>
            <div className="task-name">
              <label style={{ marginBottom: '10px' }}>End date</label>
              <input
                type="datetime-local"
                name="task"
                value={enddate}
                onChange={(e) => setEnd(e.target.value)}
                required
              />
            </div>

            <div className="task-name" style={{ width: '100%',gap:'1rem' }}>
              <label>Assign Task</label>
              <div>
                {assignto.map((member, index) => (
                  <div key={index} className="assign-member" style={{ marginBottom:'15px' }}>
                    {index < assignto.length - 1 ? (
                      <input 
                        type="text" 
                        value={member} 
                        readOnly 
                        style={{ marginRight: '10px', width: '70%' }} 
                      />
                    ) : (
                      <select
                        value={member}
                        onChange={(e) => handleAssigntoChange(e, index)}
                        style={{ marginRight: '10px', width: '70%' }}
                      >
                        <option value="" disabled>Select member</option>
                        {userList.map((teamMember) => (
                          <option key={teamMember.id} value={teamMember.email}>
                            {teamMember.email}
                          </option>
                        ))}
                      </select>
                    )}
                    {assignto.length>1&&<button onClick={() => handleRemoveMember(index)} className="rem-btn" style={{ marginRight: '10px' }}>
                      Remove
                    </button>}
                  </div>
                ))}
                <button onClick={handleAddMember} className="adds-btn">
                  + Add More
                </button>
              </div>
            </div>

            <div className="add-member" style={{ display: 'flex', flexDirection: 'row' }}>
              <div className="btns-pop">
                <button className="close-btn" onClick={togglePopup} style={{ borderRadius: '20px' }}>
                  Close
                </button>
              </div>
              <div>
                <button className="submit-btn" onClick={handleSubmit} style={{ backgroundColor: 'black', borderRadius: '20px' }}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
