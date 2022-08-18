import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const Notifications = ({ onChangeStatus, onChangeTabs, setCheck }) => {

  const initialvalues = [{
    resId: null,
    careerObjective: "",
    skills: "",
    github: "",
    linkedIn: "",
    skills: "",
    position: "",
    candFK: {
      candId: null,
      candName: "",
      candEmail: "",
      candPassword: "",
      candContactNumber: "",
      candCity: "",
      candAddress: "",
      candCNIC: ""
    },
    eduFK: {
      eduId: null,
      eduEndYear: null,
      eduInstituteName: ""
    },
    expFK: {
      expId: null,
      exoYear: null,
      expCompanyName: "",
      expDescription: "",
    },
    projFK: {
      projId: null,
      projTitle: "",
      projDescription: ""
    },
    scores: {
      scoreId: null,
      score: null,
      jdId: null,
      resId: null
    }

  }];

  const [formValues, setFormValues] = useState([initialvalues]);

  const handleDelete = (scoreId) => {
    console.log(scoreId);
    axiosApiService.coreApi.delete(`score/delete/${scoreId}`, {headers : authHeader()})
      .then(response => {
        console.log("Data recieved");
        console.log(response);
        setFormValues(response);
        console.log(formValues);
        window.alert("Information deleted");


      }).catch(err => {
        console.log(err);
      })
  }

  const getData = async () => {

    try {
      const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
      await axiosApiService.coreApi.get(`organization/notification/${user.orgId}`, {headers : authHeader()})
        .then((response) => {

          console.log("Data recieved");
          // for(response[0])
          console.log(response);

          setFormValues(response);
          // console.log(formValues);

        })

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getData();

  }, []);

  return (
    <div className="padding-20 resume-create-container">
      <div
        style={{
          border: "4px solid #1e957d",
          borderRadius: "20px",
          width: "100%",
        }}

      ></div>

      <div className='display-5 my-4 btn button-style-full text-black'>
        <h4 style={{
          color: "white",
          width: "100%",

        }}> We have found some best matches for you! </h4>
      </div>

      {
        formValues && formValues?.map(details => (
          details && details?.map(detail => (
            <div className="resume-view padding-20 mt-20">
              <div className="width-100 padding-20">

                <div key={detail?.position}>
                  <h3>{detail?.position} </h3>
                </div>
              </div>
              <div className='btn1'>
                <Link to='/displayresume' state={{ resId: detail?.resId }}><button className="btn button-style-outline me-2 btn-sm" type="submit"> View </button></Link>
                <button className="btn button-style-full btn-clr-brown btn-sm" type="deleted" onClick={() => handleDelete(detail?.scoreId)}> Delete </button>

              </div>
            </div>
          ))
        ))

      }
    </div>

  );
};

export default Notifications
