import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const CreateResume = ({ onChangeStatus, onChangeTabs }) => {


  const [formValues, setFormValues] = useState();
  const getData = async () => {

    try {
      const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
      await axiosApiService.coreApi.get(`candidate/showresume/${user.candId}`, {headers : authHeader()})
        .then((response) => {
          console.log(response[0].resFK['resId']);
          console.log("Data recieved");
          setFormValues(response[0].resFK['resId']);
          console.log(formValues);
        })

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getData();


  }, []);

  
  return (
    <div className='padding-20 resume-create-container'>
      <div style={{ border: '4px solid #21aa8f', borderRadius: '20px', width: '100%' }}></div>
      <h4 className='padding-30 text-center'>Now you have created a resume</h4>
      <h5 className='padding-30 text-center padding-top-0'>On this page, you can view, update and delete your resume.</h5>

      <div className="crud-resume">
        <Link to="/displayresume" state={{ resId: formValues }}><button style={{ marginLeft: 5, width: 72 }}className="btn create"
          type="submit">View</button></Link>

        
        <Link to="/update" state={{ resId: formValues }}><button style={{ marginLeft: 5, width: 72 }}className="btn create"
          type="submit">Update</button></Link>


        <button style={{ marginLeft: 5, width: 72 }}className="btn create"
          type="submit" onClick={() => {
          onChangeStatus('ResumePage')
          onChangeTabs('DeleteResume')
        }}>Delete</button>
      </div>
    </div>
  )
}

export default CreateResume