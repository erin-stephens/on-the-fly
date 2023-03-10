import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deleteLesson } from '../api/lessonData';

export default function LessonCard({ lessonObj, onUpdate }) {
  const deleteThisLesson = () => {
    if (window.confirm(`Delete ${lessonObj.lesson_name}?`)) {
      deleteLesson(lessonObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card className="lessonCard" style={{ width: '40rem' }}>
      <div>
        <Card.Img src="holder.js/100px180" />
      </div>
      <div>
        <Card.Body>
          <Card.Title>{lessonObj.lesson_name}</Card.Title>
          <Card.Text>{lessonObj.subject}</Card.Text>
          <Card.Text>{lessonObj.class}</Card.Text>
          <Card.Text>{lessonObj.username}</Card.Text>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`/lesson/${lessonObj.firebaseKey}`}>View</Dropdown.Item>
              <Dropdown.Item href={`/lesson/edit/${lessonObj.firebaseKey}`}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={deleteThisLesson}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </div>
    </Card>
  );
}

LessonCard.propTypes = {
  lessonObj: PropTypes.shape({
    lesson_name: PropTypes.string,
    subject: PropTypes.string,
    class: PropTypes.string,
    firebaseKey: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
