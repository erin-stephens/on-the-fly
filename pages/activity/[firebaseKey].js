/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleActivity } from '../../api/activityData';
import AddtoLessonModal from '../../components/AddtoLessonModal';
import CommentCard from '../../components/CommentCard';
import CommentForm from '../../components/forms/CommentForm';
import { getCommentsById } from '../../api/commentData';

export default function ViewActivity() {
  const [activity, setActivity] = useState([]);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const displayComments = () => {
    getCommentsById(firebaseKey).then(setComments);
  };
  useEffect(() => {
    getSingleActivity(firebaseKey).then(setActivity);
    displayComments();
  }, [firebaseKey]);

  console.warn(activity);

  return (
    <>
      <Head>
        <title>{activity.activity_name}</title>
      </Head>
      <div className="videoContainer">
        <iframe
          title={activity.activity_name}
          src={activity.activity_url}
          className="activityVideo"
          allowFullScreen=""
        />
      </div>
      <div className="text-white">
        <h1>{activity.activity_name}</h1>
        <h5>Subject: {activity.subject}</h5>
        <h5>Length: {activity.length} minutes</h5>
        <h5>Grade: {activity.grade}</h5>
        <h5>Added by: {activity.username}</h5>
        <p>Description: {activity.description}</p>
      </div>
      <div className="addtolesson">
        <AddtoLessonModal obj={activity} />
      </div>
      <hr className="text-white" />
      <div className="commentCardContainer">
        {comments.map((comment) => (<CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={displayComments} />
        ))}
      </div>
      <div>
        <CommentForm activityFbKey={firebaseKey} onUpdate={displayComments} />
      </div>
    </>
  );
}
