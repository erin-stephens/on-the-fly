import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';
import AddtoLessonModal from './AddtoLessonModal';
import { deleteMergedObj, getSingleMergedObj } from '../api/mergedData';

// eslint-disable-next-line camelcase
export default function LessonActivityCard({ lessonActivityObj, lessonPlan_id, onUpdate }) {
  const removeThisActivity = () => {
    if (window.confirm(`Remove ${lessonActivityObj.activity_name}?`)) {
      getSingleMergedObj(lessonPlan_id, lessonActivityObj.firebaseKey).then((obj) => {
        deleteMergedObj(obj.firebaseKey).then(() => onUpdate());
      });
    }
  };
  const { user } = useAuth();

  return (
    <>
      <Card className="lessonActivityCard" style={{ width: '19rem' }}>
        <div className="video-url">
          <iframe className="card-video" src={`${lessonActivityObj.activity_url}?modestbranding=1&showinfo=0&mute=1`} title={lessonActivityObj.activity_name} />
        </div>
        <Card.Body>
          <Card.Title>{lessonActivityObj.activity_name}</Card.Title>
          <Card.Text>
            Length: {lessonActivityObj.length} minutes
          </Card.Text>
          <Card.Text>
            Grade: {lessonActivityObj.grade}
          </Card.Text>
          <Dropdown>
            <Dropdown.Toggle
              className="dropdownBtn"
              id="dropdown-basic"
            >
              Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`/activity/${lessonActivityObj.firebaseKey}`}>View</Dropdown.Item>
              {lessonActivityObj.uid === user.uid ? (
                <Dropdown.Item href={`/activity/edit/${lessonActivityObj.firebaseKey}`}>Edit</Dropdown.Item>
              ) : ''}
              {lessonActivityObj.uid === user.uid ? (
                <Dropdown.Item onClick={removeThisActivity}>Remove</Dropdown.Item>
              ) : ''}
              <Dropdown.Item><AddtoLessonModal obj={lessonActivityObj} /></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    </>
  );
}

LessonActivityCard.propTypes = {
  lessonActivityObj: PropTypes.shape({
    activity_url: PropTypes.string,
    activity_name: PropTypes.string,
    length: PropTypes.string,
    grade: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  lessonPlan_id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
