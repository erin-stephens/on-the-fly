import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteComment } from '../api/commentData';
import { getSingleActivity } from '../api/activityData';

export default function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    getSingleActivity(commentObj.activity_id).then(setActivity);
  }, [commentObj.activity_id]);
  console.warn(commentObj);
  return (
    <div>
      <Card className="comment-card">
        <div className="comment-container">
          <Card.Header>{commentObj.date_added}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                {commentObj.text}
                {' '}
              </p>
              <footer className="blockquote-footer">
                {commentObj.author}
                <br />
                {commentObj.uid === user.uid || user.displayName === activity.username
                  ? (
                    <button
                      type="button"
                      className="redBtn"
                      onClick={deleteThisComment}
                    >
                      Delete
                    </button>
                  ) : ''}
              </footer>
            </blockquote>

          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    activity_id: PropTypes.string,
    firebaseKey: PropTypes.string,
    text: PropTypes.string,
    date_added: PropTypes.string,
    author: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
