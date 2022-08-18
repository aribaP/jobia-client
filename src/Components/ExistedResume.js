import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const ExistedResume = ({ onChangeStatus, onChangeTabs }) => {

const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
  const [formValues, setFormValues] = useState();
  const getData = async () => {
    const navigate = useNavigate();
    try {
      
      await axiosApiService.coreApi.get(`candidate/showresume/${user.candId}`, { headers: authHeader() })
        .then((response) => {
          console.log(response[0].resFK['resId']);
          console.log("Data recieved");
          setFormValues(response[0].resFK['resId']);
          console.log(formValues);
          navigate('/account');
        })

    } catch (err) {
      console.log(err);
    }

  };

  const DeleteResume = async (resId) => {
    try {
      axiosApiService.coreApi.delete(`resume/deletewhole/${resId}`, { headers: authHeader() })
        .then((response) => {
          console.log("Data recieved");
          console.log("Oyeee", response);
          
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
      <div style={{ border: '4px solid #5B4F64', borderRadius: '20px', width: '100%' }}></div>

      <div className="crud-resume" style={{ paddingTop: '100px' }}>
        <Link to="/displayresume" state={{ resId: formValues }}><button style={{ marginLeft: 5, width: 72 }} className="btn btn-primary" type="submit">View</button></Link>


        <Link to="/update" state={{ resId: formValues }}><button style={{ marginLeft: 5, color: 'white' }} className="btn btn-warning" type="submit" >Update</button></Link>


        <button style={{ marginLeft: 5 }} className="btn btn-danger" type="submit"
           onClick={() => {
            DeleteResume(formValues)
            
          }}
        >Delete</button>
      </div>
    </div>
  )
}

export default ExistedResume