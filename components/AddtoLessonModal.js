import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getAllLessons } from '../api/lessonData';
import { createMergedObj, updateMergedObject } from '../api/mergedData';

const initialState = {
  lessonPlan_id: '',
};

export default function AddtoLessonModal({ obj }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  const [lessons, setLessons] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllLessons(user.uid).then(setLessons);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.lessonPlan_id) {
      const payload = { ...formInput, activity_id: obj.firebaseKey };
      createMergedObj(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMergedObject(patchPayload).then(router.push(`/lesson/${formInput.lessonPlan_id}`));
      });
    } else {
      window.alert('You must select a lesson plan');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add to Lesson?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingSelect">
              <Form.Select
                aria-label="LessonPlan"
                name="lessonPlan_id"
                onChange={handleChange}
                className="mb-3"
                required
              >
                <option value="">Select a Lesson</option>
                {
                  lessons.map((lesson) => (
                    <option
                      key={lesson.firebaseKey}
                      value={lesson.firebaseKey}
                    >
                      {lesson.lesson_name}
                    </option>
                  ))
                }
              </Form.Select>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

AddtoLessonModal.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
