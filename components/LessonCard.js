import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteLesson } from '../api/lessonData';

export default function LessonCard({ lessonObj, onUpdate }) {
  const deleteThisLesson = () => {
    if (window.confirm(`Delete ${lessonObj.lesson_name}?`)) {
      deleteLesson(lessonObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  return (
    <Card className="lessonCard" style={{ width: '30rem' }}>
      <div className="lessonImage">
        <Card.Img src="holder.js/100px180" />
      </div>
      <hr />
      <div>
        <Card.Body>
          <Card.Title>{lessonObj.lesson_name}</Card.Title>
          <Card.Text>{lessonObj.subject}</Card.Text>
          <Card.Text>{lessonObj.class}</Card.Text>
          <Card.Text>{lessonObj.username}</Card.Text>
          <Dropdown>
            <Dropdown.Toggle className="dropdownBtn" id="dropdown-basic">
              Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`/lesson/${lessonObj.firebaseKey}`}>View</Dropdown.Item>
              {lessonObj.uid === user.uid ? (
                <Dropdown.Item href={`/lesson/edit/${lessonObj.firebaseKey}`}>Edit</Dropdown.Item>
              ) : ''}
              {lessonObj.uid === user.uid ? (
                <Dropdown.Item onClick={deleteThisLesson}>Delete</Dropdown.Item>
              ) : ''}
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
