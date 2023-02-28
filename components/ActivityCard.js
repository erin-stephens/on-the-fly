import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import { deleteActivity } from '../API/activityData';

export default function ActivityCard({ activityObj, onUpdate }) {
  const deleteThisActivity = () => {
    if (window.confirm(`Delete ${activityObj.activity_name}?`)) {
      deleteActivity(activityObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{activityObj.activity_name}</Card.Title>
        <Card.Text>
          {activityObj.length}
          {activityObj.grade}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Options
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={`/activity/${activityObj.firebaseKey}`}>View</Dropdown.Item>
            <Dropdown.Item href={`/activity/edit/${activityObj.firebaseKey}`}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={deleteThisActivity}>Delete</Dropdown.Item>
            <Dropdown.Item>Add to Lesson</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

ActivityCard.propTypes = {
  activityObj: PropTypes.shape({
    activity_url: PropTypes.string,
    activity_name: PropTypes.string,
    length: PropTypes.number,
    grade: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
