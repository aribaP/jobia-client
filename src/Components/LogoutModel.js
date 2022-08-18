import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import authHeader from '../services/auth-header';
import { axiosApiService } from '../services/axiosAPIs';

function LogoutModel ({show,setShow}) {

  const handleClose = () => setShow(false);
  const handleLogout = () => {

    const user = JSON.parse(localStorage.getItem('userToken') ?? '{}');
    localStorage.removeItem("userToken", JSON.stringify({accessToken: user.access_token, candId: user.candId, orgId: user.orgId}));
  }
  return (
    <>


      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to logout? </Modal.Body>
        <Modal.Footer>
          <Link to= "/login"><Button    className="btn body-button-style1 padding-l-15 padding-r-15"
                type="submit" onClick={handleLogout}>
            Logout
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

export default LogoutModel;