/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteLesson } from '../api/lessonData';
import math from '../src/assets/icons/math.png';
import reading from '../src/assets/icons/reading.png';
import science from '../src/assets/icons/science.png';
import socialStudies from '../src/assets/icons/social-studies.png';
import brainBreak from '../src/assets/icons/brain-break.png';
import indoorRecess from '../src/assets/icons/indoor-recess.png';

export default function LessonCard({ lessonObj, onUpdate }) {
  const deleteThisLesson = () => {
    if (window.confirm(`Delete ${lessonObj.lesson_name}?`)) {
      deleteLesson(lessonObj.firebaseKey).then(() => onUpdate());
    }
  };
  const [subjects, setSubjects] = useState([]);
  const { user } = useAuth();
  const lessonIcon = () => {
    switch (subjects) {
      case 'math':
        return <Card.Img src={math} alt="math" className="icon" />;
      case 'reading':
        return <Card.Img src={reading} alt="reading" className="icon" />;
      case 'science':
        return <Card.Img src={science} alt="science" className="icon" />;
      case 'social studies':
        return <Card.Img src={socialStudies} alt="social studies" className="icon" />;
      case 'brain break':
        return <Card.Img src={brainBreak} alt="brain break" className="icon" />;
      case 'indoor recess':
        return <Card.Img src={indoorRecess} alt="indoor recess" className="icon" />;
      default:
        return null;
    }
  };
  return (
    <Card className="lessonCard" style={{ width: '30rem' }}>
      <div className="lessonImage">
        {subjects.map((subject) => (
          { lessonIcon }
        ))}
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
