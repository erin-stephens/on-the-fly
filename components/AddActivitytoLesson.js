import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getAllActivities } from '../api/activityData';
import { createMergedObj, updateMergedObject } from '../api/mergedData';

const initialState = {
  activity_id: '',
};

export default function AddActivitytoLesson({ obj }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getAllActivities().then(setActivities);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.activity_id) {
      const payload = { ...formInput, lessonPlan_id: obj.firebaseKey };
      createMergedObj(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMergedObject(patchPayload).then(handleClose);
      });
    } else {
      window.alert('Select an Activity');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Activity?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingSelect">
              <Form.Select
                aria-label="Activity"
                name="activity_id"
                onChange={handleChange}
                className="mb-3"
                required
              >
                <option value="">Select an Activity</option>
                {
                  activities.map((activity) => (
                    <option
                      key={activity.firebaseKey}
                      value={activity.firebaseKey}
                    >
                      {activity.activity_name}
                    </option>
                  ))
                }
              </Form.Select>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

AddActivitytoLesson.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
