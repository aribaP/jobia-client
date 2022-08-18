import React from 'react'
import Rectangle from '../assets/Rectangle.png'
import { Link } from 'react-router-dom'

const ResumeView = ({ onChangeStatus, onChangeTabs, id, onChangeAllJobs, onChangeAllJobsTabs }) => {


  return (
    <div className='padding-20 resume-create-container'>
      <div style={{ border: '4px solid #5B4F64', borderRadius: '20px', width: '100%' }}></div>
      <h4 className='padding-30 text-center'>Oops! Looks like you haven’t created any resume</h4>
      <h5 className='padding-30 text-center padding-top-0'>Create your resume now so that Jobia will find the perfect Job for you!</h5>

      <div className="crud-resume">
      <button style={{ marginLeft: 5 }} className="btn button-style-full btn-clr btn-sm"
          type="submit" onClick={() => {
          onChangeStatus('ResumePage')
          onChangeTabs('CreateResume')

        }}>Create</button>
      </div>
    </div>
  )
}

export default ResumeView