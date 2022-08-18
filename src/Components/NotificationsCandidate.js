import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const NotificationsCandidate = ({ onChangeStatus, onChangeTabs, setCheck }) => {

    const initialvalues = {
        jdId: null,
        jdPosition: "",
        jdRequiredSkills: "",
        jdMinimumExperience: null,
        jdCity: "",
        jdLocation: "",
        scoreId: null,
        orgName: ""

    };


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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
        axiosApiService.coreApi.get(`candidate/notification/${user.candId}`, {headers : authHeader()})
            .then(response => {
                setFormValues(response);
                console.log("Data recieved");
                console.log(response);

                console.log(formValues);

            }).catch(err => {
                console.log(err);
            })

    }, []);
    return (
        <div className="padding-20 resume-create-container"
        >
            <div
                style={{
                    border: "4px solid #1e957d",
                    borderRadius: "20px",
                    width: "100%",
                }}

            ></div>
            <div className='display-5 my-4 btn button-style-full text-black'>
                <h4><b>We have found some best matches for you! </b></h4>
            </div>

            {

                formValues?.map(details => (
                    <div className="resume-view padding-20 mt-20">

                        <div className="width-100 padding-20">


                            <div key={details?.orgName}>
                                <h4 style={{
                                    color: "#21aa8f",
                                }}> <b><u>  Company Name:</u></b>  {details?.orgName}</h4>
                            </div>
                            <div key={details?.jdPosition}>
                                <h5 style={{
                                    color: "#21aa8f",
                                }}> <b><u>  Job Position:</u></b>  {details?.jdPosition}</h5>
                            </div>
                            <div key={details?.jdRequiredSkills}>
                                <h5 style={{
                                    color: "#21aa8f",
                                }}> <b><u>   Requirements:</u></b>
                                    <p style={{
                                        color: "#333",
                                        textAlign: "justify"
                                    }}>
                                    </p>
                                    {details?.jdRequiredSkills}</h5>
                            </div>
                            <div key={details?.jdMinimumExperience}>
                                <h5 style={{
                                    color: "#21aa8f",
                                }}> <b><u>   Minimum Experience:</u></b>   {details?.jdMinimumExperience}</h5>
                            </div>
                            <div key={details?.jdLocation}>
                                <h5 style={{
                                    color: "#21aa8f",
                                }}> <b><u>   Location:</u></b>   {details?.jdLocation} </h5>
                            </div>
                            <div key={details?.city}>
                                <h5 style={{
                                    color: "#21aa8f",
                                }}> <b><u>   City:</u></b>   {details?.jdCity} </h5>
                            </div>
                            <div className='btn1'>
                                <button className="btn button-style-full btn-clr btn-sm" type="delete" onClick={() => handleDelete(details?.scoreId)}> Delete </button>
                            </div>
                        </div>

                    </div>

                ))


            }

        </div>

    );
};

export default NotificationsCandidate;
