import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createActivity, getAllActivities, updateActivity } from '../../API/activityData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  activity_name: '',
  activity_url: '',
  length: '',
  subject: '',
  grade: '',
  description: '',
};

export default function ActivityForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setActivities] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllActivities(user.uid).then(setActivities);
    if (obj.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updateActivity(formInput)
        .then(() => router.push('/activities'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createActivity(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateActivity(patchPayload).then(() => {
          router.push('/activities');
        });
      });
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Create'} An Activity</h2>

      <FloatingLabel controlId="floatingInput1" label="Activity Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter activity name"
          name="activity_name"
          value={formInput.activity_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Activity Link" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an activity url"
          name="activity_url"
          value={formInput.activity_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Subject" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter subject"
          name="subject"
          value={formInput.subject}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Activity Length" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter activity length"
          name="length"
          value={formInput.length}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput5" label="Grade Level" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter grade level"
          name="grade"
          value={formInput.grade}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea1" label="Description">
        <Form.Control
          as="textarea"
          placeholder="How to use this activity"
          style={{ height: '100px' }}
          type="text"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Activity</Button>
    </Form>
  );
}

ActivityForm.propTypes = {
  obj: PropTypes.shape({
    activity_name: PropTypes.string,
    activity_url: PropTypes.string,
    length: PropTypes.number,
    subject: PropTypes.string,
    grade: PropTypes.number,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ActivityForm.defaultProps = {
  obj: initialState,
};
