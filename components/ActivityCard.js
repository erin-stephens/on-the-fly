import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import { deleteActivity } from '../api/activityData';
import { deleteActivityComments } from '../api/commentData';
import AddtoLessonModal from './AddtoLessonModal';
import { useAuth } from '../utils/context/authContext';

export default function ActivityCard({ activityObj, onUpdate }) {
  // eslint-disable-next-line no-unused-vars
  const [activity, setActivity] = useState({});
  const deleteThisActivity = () => {
    if (window.confirm(`Delete ${activityObj.activity_name}?`)) {
      deleteActivityComments(activity.firebaseKey);
      deleteActivity(activityObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  return (
    <>
      <Card className="activityCard" style={{ width: '19rem' }}>
        <div className="video-url">
          <iframe className="card-video" src={`${activityObj.activity_url}?modestbranding=1&showinfo=0&mute=1`} title={activityObj.activity_name} />
        </div>
        <Card.Body>
          <Card.Title>{activityObj.activity_name}</Card.Title>
          <Card.Text>
            Length: {activityObj.length} minutes
          </Card.Text>
          <Card.Text>
            Grade: {activityObj.grade}
          </Card.Text>
          <Dropdown>
            <Dropdown.Toggle className="dropdownBtn">
              Options
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`/activity/${activityObj.firebaseKey}`}>View</Dropdown.Item>
              {activityObj.uid === user.uid ? (
                <Dropdown.Item href={`/activity/edit/${activityObj.firebaseKey}`}>Edit</Dropdown.Item>
              ) : ''}
              {activityObj.uid === user.uid ? (
                <Dropdown.Item onClick={deleteThisActivity}>Delete</Dropdown.Item>
              ) : ''}
              <Dropdown.Item><AddtoLessonModal obj={activityObj} /></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    </>
  );
}

ActivityCard.propTypes = {
  activityObj: PropTypes.shape({
    activity_url: PropTypes.string,
    activity_name: PropTypes.string,
    length: PropTypes.string,
    grade: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
