import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getAllLessons, createLesson, updateLesson } from '../../api/lessonData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  lesson_name: '',
  subject: '',
  class: '',
  directions: '',
};

export default function LessonForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setLessons] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllLessons(user.uid).then(setLessons);
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
      updateLesson(formInput)
        .then(() => router.push('/lessonPlans'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createLesson(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateLesson(patchPayload).then(() => {
          router.push('/lessonPlans');
        });
      });
    }
  };
  return (

    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Update' : 'Create'} A Lesson</h2>

      <FloatingLabel controlId="floatingInput1" label="Lesson Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter lesson name"
          name="lesson_name"
          value={formInput.lesson_name}
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
      <FloatingLabel controlId="floatingInput4" label="Class" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter class name"
          name="class"
          value={formInput.class}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea1" label="Directions">
        <Form.Control
          as="textarea"
          placeholder="How to use this lesson plan"
          style={{ height: '100px' }}
          type="text"
          name="directions"
          value={formInput.directions}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Lesson</Button>
    </Form>
  );
}

LessonForm.propTypes = {
  obj: PropTypes.shape({
    lesson_name: PropTypes.string,
    subject: PropTypes.string,
    class: PropTypes.string,
    directions: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

LessonForm.defaultProps = {
  obj: initialState,
};
