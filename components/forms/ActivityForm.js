import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createActivity, getAllActivities, updateActivity } from '../../api/activityData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  activity_name: '',
  activity_url: '',
  length: '',
  subject: '',
  grade: '',
  description: '',
  username: '',
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
      const payload = { ...formInput, uid: user.uid, username: user.displayName };
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
      <h2 className="text-white">{obj.firebaseKey ? 'Update' : 'Create'} An Activity</h2>

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
      <FloatingLabel
        controlId="floatingInput3"
        label="Subject"
        className="mb-3"
      >
        <Form.Select
          type="text"
          name="subject"
          value={formInput.subject}
          onChange={handleChange}
          required
        >
          <option value="">Select a Subject</option>
          <option value="math">Math</option>
          <option value="reading">Reading</option>
          <option value="science">Science</option>
          <option value="social studies">Social Studies</option>
          <option value="brain breaks">Brain Breaks</option>
          <option value="indoor recess">Indoor Recess</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Activity Length" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter activity length"
          name="length"
          value={formInput.length}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput3"
        label="Grade"
        className="mb-3"
      >
        <Form.Select
          type="text"
          name="grade"
          value={formInput.grade}
          onChange={handleChange}
          required
        >
          <option value="">Select a Grade</option>
          <option value="Kindergarten">Kindergarten</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
          <option value="5th">5th</option>
        </Form.Select>
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
      <Button type="submit" className="redBtn btn">{obj.firebaseKey ? 'Update' : 'Create'} Activity</Button>
    </Form>
  );
}

ActivityForm.propTypes = {
  obj: PropTypes.shape({
    activity_name: PropTypes.string,
    activity_url: PropTypes.string,
    length: PropTypes.string,
    subject: PropTypes.string,
    grade: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    username: PropTypes.string,
  }),
};

ActivityForm.defaultProps = {
  obj: initialState,
};
