import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';
import DeletePopOver from './DeletePopOver';
import DeleteModel from './DeleteModel';

const Setting = ({ onChangeStatus, onChangeTabs, setCheck }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    // const handleShow = () => setShow(true);
    setShow(true);
    
  }
  return (
    <div className="padding-20 resume-create-container">
      <div
        style={{
          border: "4px solid #1e957d",
          borderRadius: "20px",
          width: "100%",
        }}

      ></div>

      <div className='btn1 pt-5'>
      <button onClick={handleClick} className="btn btn body-button-style1 padding-l-15 padding-r-15" type="delete" > Delete your Account</button>

        <DeleteModel show={show} setShow={setShow} />
      </div>
    </div>

  );
};

export default Setting
