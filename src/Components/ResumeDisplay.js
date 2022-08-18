import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosApiService } from '../services/axiosAPIs';
import authHeader from '../services/auth-header';

const ResumeDisplay = () => {

	const initialValues = {
		getResume: {
			resId: null,
			careerObjective: '',
			position: '',
			skills: '',
			gitHub: '',
			linkedIn: '',
			eduFK: [{
				eduEndYear: null,
				eduInstituteName: "",
				eduDegree: ""
			}],
			expFK: [{
				expCompanyName: "",
				expYear: null,
				expDescription: ""
			}],
			projFK: [{
				projTitle: "",
				projDescription: ""
			}]
		},
		getCand: {
			candAddress: "",
			candCity: "",
			candContactNumber: "",
			candEmail: "",
			candName: "",
		}
	};

	const [formValues, setFormValues] = useState(initialValues);
	const location = useLocation();
	const getData = async () => {

		try {
			await axiosApiService.coreApi.get(`resume/getwhole/${location.state.resId}`, {headers : authHeader()})
				.then((response) => {

					console.log(response);
					console.log("Data recieved");
					setFormValues(response);
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
		<div className='body-resume'>
			<div className='resume-display'>
				<div className='resume-display-left'>


					<div className='profileText' >

						<h2>{formValues?.getCand.candName}<br></br><span>{formValues?.getResume.position}</span></h2>
					</div>

					<div className='contactInfo'>
						<h3 className='resume-title'>Contact Info</h3>
						<ul>
							<li>
								<span className='resume-icon'><i class="fa fa-phone" aria-hidden="true"></i></span>
								<span className='resume-text'>{formValues?.getCand.candContactNumber}</span>
							</li>
							<li>
								<span className='resume-icon'>
									{/* <i class="fa fa-envelope-o" aria-hidden="true"></i> */}
								<i class="bi bi-envelope"></i>
								</span>
								<span className='resume-text'>{formValues?.getCand.candEmail}</span>
							</li>
							<li>
								<span className='resume-icon'>
									{/* <i class="fa fa-linkedin" aria-hidden="true"></i> */}
								<i class="bi bi-linkedin"></i></span>
								<span className='resume-text'>{formValues?.getResume.linkedIn}</span>
							</li>
							<li>
								<span className='resume-icon'>
									{/* <i class="fa fa-linkedin" aria-hidden="true"></i> */}
									<i class="bi bi-github"></i>
									</span>
								<span className='resume-text'>{formValues?.getResume.gitHub}</span>
							</li>
							<li>
								<span className='resume-icon'>
									{/* <i class="fa fa-map-marker" aria-hidden="true"></i> */}
									<i class="bi bi-geo-alt-fill"></i>
									</span>
								<span className='resume-text'>{formValues?.getCand.candAddress} {formValues?.getCand.candCity}</span>
							</li>
						</ul>
					</div>

					<div className='contactInfo education'>
						<h3 className='resume-title'>Education</h3>
						<ul>
							{
								formValues?.getResume.eduFK.map(details => (
									<li>
										<div key={details?.eduEndYear}>
											<h5 >{details?.eduEndYear}</h5>
										</div>
										<div key={details?.eduDegree}>
											<h6 className='text-white'> {details?.eduDegree}</h6>
										</div>
										<div key={details?.eduInstituteName}>
											<h6 className='text-muted'>{details?.eduInstituteName}</h6>
										</div>
									</li>
								))
							}


						</ul>
					</div>


				</div >

				<div className='resume-display-right'>
					<div className='about'>
						<h2 className='title2'>Objective</h2>
						<p> {formValues?.getResume.careerObjective}</p>

					</div>

					<div className='about'>
						<h2 className='title2'>Experience</h2>

						{
							formValues?.getResume.expFK.map(details => (
								<div className='box'>

									<div className='yearCompany'>
										<div key={details?.expYear}>
											<h6 className='title3'>Years of Experience: {details?.expYear} </h6>
										</div>
										<div key={details?.expCompanyName}>
											<h6 className='title3'>Company Name: {details?.expCompanyName} </h6>
										</div>
									</div>
									<div className='resume-text'>
										<div key={details?.expDescription}>
											<h4 className='title3'>Description</h4>
											<p> {details?.expDescription} </p>
										</div>

									</div>
								</div>

							))
						}

					</div>

					<div className='about'>
						<h2 className='title2'>Projects</h2>
						{
							formValues.getResume.projFK.map(details => (
								<div className='box'>
									<div className='yearCompany'>
										<div key={details?.projTitle}>
											<h6 className='title3'> Project Title:  {details?.projTitle}</h6>
										</div>
									</div>
									<div className='resume-text'>
										<div key={details?.projDescription}>
											<h4 className='title3'>Description</h4>
											<p>{details?.projDescription}</p>
										</div>
									</div>
								</div>

							))
						}

					</div>

					<div className='about skills'>
						<h2 className='title2'>Skills</h2>
						<div className='box'>
							<h6 className='title3'>{formValues?.getResume.skills}</h6>
						</div>
					</div>
				</div>
			</div >
		</div >
	)
}

export default ResumeDisplay