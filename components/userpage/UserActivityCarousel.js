/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import ActivityCard from '../ActivityCard';
import { getUserActivities } from '../../api/activityData';
import { useAuth } from '../../utils/context/authContext';

export default function UserActivityCarousel() {
  const [activities, setActivities] = useState([]);
  const { user } = useAuth();

  const getActivities = () => {
    getUserActivities(user.uid).then(setActivities);
  };

  useEffect(() => {
    getActivities();
  }, [user]);

  return (
    <Carousel interval={null}>
      {activities.map((activity) => (
        <Carousel.Item className="activityCarouselItem">
          <ActivityCard key={activity.firebaseKey} activityObj={activity} onUpdate={getActivities} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
