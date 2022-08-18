import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authHeader from '../services/auth-header';
import { axiosApiService } from '../services/axiosAPIs';
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
    axiosApiService.coreApi.delete(`organization/delete/${user.candId}`, {headers : authHeader()})
      .then(response => {

      }).catch(err => {
        console.log(err);
      })
  }
}
const DeletePopOver = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" type="delete" onClick={handleDelete}>
      Delete your Account      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePopOver;