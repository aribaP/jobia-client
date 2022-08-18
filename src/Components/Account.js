import { axiosApiService } from '../services/axiosAPIs'
import authHeader from '../services/auth-header'
import React, { useState } from 'react'
import Footer from './Footer'
import Notifications from '../assets/Notification.png'
import Settings from '../assets/Setting.png'
import Resumee from '../assets/Resume.png'
import NotificationsCandidate from '../Components/NotificationsCandidate'
import ResumeView from '../Components/ResumeView'
import CreateResume from './CreateResume'
import Profile from './Profile'
import Profilee from '../assets/Profile.png'
import Resume from './Resume'
import Jobs from './Jobs'
import AllJobs from './AllJobs'
import Setting from './Setting';

import ResumeDisplay from './ResumeDisplay'
import ViewOneJob from './ViewOneJob'

import NavBarComponent2 from "./NavBarComponent2";


const Account = (props) => {
  const [check, setCheck] = useState('Profile')
  const [show, setShow] = useState(true)
  const [showupload, setShowUpload] = useState(true)
  const [hireEmployee, setHireEmployee] = useState(false)
  const [job, setJob] = useState(true)
  const [tabs, setTabs] = useState('')

  console.log('-----handleOnSave------', show)
  console.log('-----tabs------', tabs)


  const handlePage = () => {
    const user = JSON.parse(localStorage.getItem("userToken") ?? "{}");
    try {
			 axiosApiService.coreApi.get(`candidate/showresume/${user.candId}`, {headers : authHeader()})
				.then((response) => {

					console.log("Respone",response[0].resFK['resId']);
					console.log("Data recieved");
          if(response[0].resFK['resId'])
            setCheck('CreateResume')
          else
            setCheck('ResumeView')
				})

		} catch (err) {
			console.log(err);
		}
    
  }
  return (
    <>
     {/* <Header /> */}
  <NavBarComponent2/>
      <div className='profileHeader'>
      <h2 style={{ fontWeight: 600 }}>Candidates </h2>
      </div>
      <div class='row m-0'>
        <div class='col-md-2 bg-Gray'>
          <div style={{ marginTop: '30px' }}>
            <button
              className={check === 'Profile' ? 'Account-button Account-button-border bg-White' : 'Account-button'}
              onClick={() => setCheck('Profile')}
            >
              <div className='Account-Tabs'>
                <img src={Profilee} height='30px' width='30px' />
                <p className='m-l-2'>Edit your Profile</p>
              </div>
            </button>


            
              <button
                className={check === 'Resume' ? 'Account-button Account-button-border bg-White' : 'Account-button'}
                onClick={
                  handlePage
                  // setTabs('Resume')
                }
              >
                <div className='Account-Tabs m-l-07'>
                  <img src={Resumee} height='20px' width='20px' />
                  <p className='m-l-2'>Control Resume</p>
                </div>
              </button> 


            
            <button
              className={check === 'NotificationsCandidate' ? 'Account-button Account-button-border bg-White' : 'Account-button'}
              onClick={() => setCheck('NotificationsCandidate')}
            >
              <div className='Account-Tabs m-l-07'>
                <img src={Notifications} height='20px' width='20px' />
                <p className='m-l-2'>Notifications</p>
              </div>
            </button>
            <button
              className={check === 'Setting' ? 'Account-button Account-button-border bg-White' : 'Account-button'}
              onClick={() => {
                setCheck('Setting')
                setTabs('Setting')
              }}
            >
              <div className='Account-Tabs m-l-07'>  
                <img src={Settings} height='20px' width='20px' />
                <p className='m-l-2'>Settings</p>
              </div>
            </button>
          </div>

        </div>
        <div class='col-md-10'>
          {check === 'Profile' &&
            <Profile />
          }
          {check === 'CreateResume' &&
            <CreateResume
              onChangeStatus={(val) => setCheck(val)}
              onChangeTabs={(val) => setTabs(val)}
            />
          }
          {check === 'ResumeView' && <ResumeView


            onChangeStatus={(val) => setCheck(val)}
            onChangeTabs={(val) => setTabs(val)}
          
          // onChangeAllJobs={(val) => setCheck(val)}
          // onChangeAllJobsTabs={(val) => setTabs(val)} 
          />}
          {check === 'ResumePage' && <Resume 
          handleOnSave={(val) => setCheck(val)}
           />}
          {check === 'ResumeDisplay' && <ResumeDisplay 
          handleOnSave={(val) => setCheck(val)}
          id = {68}
           />}
           {check === 'ViewOneJob' && <ViewOneJob
          handleOnSave={(val) => setCheck(val)}
           />}
          {check === 'Jobs' && <Jobs
            handleOnSave={(val) => setCheck(val)}
            onChangeTabs={(val) => setTabs(val)} />}
          {check === 'AllJobs' && <AllJobs />}


          {check === 'NotificationsCandidate' &&
            <NotificationsCandidate />
          }
                    {check === 'Setting' && <Setting /> }

        </div>

      </div>
          <footer>
      <Footer dark={true} /></footer>
    </>

  )
}

export default Account
//create Resume Page code
// {check === 'Resume' &&
// show ? 
// <CreateResume onChangeStatus= {(val) => setShow(val) }/> 
// : 
// showupload ? 
// <ResumeView onChangeStatus={(val) => setShowUpload(val)}/>  : <Resume />
// }