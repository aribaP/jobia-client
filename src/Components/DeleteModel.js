import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import authHeader from '../services/auth-header';
import { axiosApiService } from '../services/axiosAPIs';

function DeleteModel ({show,setShow}) {

  const handleClose = () => setShow(false);
  const handleDelete = () => {

    const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
    
    
    if (user.role === "organization") {
      axiosApiService.coreApi.delete(`organization/delete/${user.orgId}`, {headers : authHeader()})
        .then(response => {

        }).catch(err => {
          console.log(err);
        })
    }
    else if (user.role === "candidate") {
      axiosApiService.coreApi.delete(`candidate/delete/${user.candId}`, {headers : authHeader()})
        .then(response => {

        }).catch(err => {
          console.log(err);
        })
    }

    localStorage.removeItem("userToken", JSON.stringify({accessToken: user.access_token, candId: user.candId, orgId: user.orgId}));
  }
  return (
    <>


      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you permanently want to delete your account? </Modal.Body>
        <Modal.Footer>
          <Link to= "/registrationOption"><Button className="btn body-button-style1 padding-l-15 padding-r-15" onClick={handleDelete}>
            Delete Account
          </Button></Link>
          <Button  style={{ marginLeft: 5, width: 72 }} className="btn create"
          type="submit" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModel;