/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import ActivityCard from './ActivityCard';
import { getAllActivities } from '../api/activityData';

export default function ActivityCarousel() {
  const [activities, setActivities] = useState([]);

  const getActivities = () => {
    getAllActivities().then(setActivities);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <Carousel interval={null} className="activityCarouselContainer">
      {activities.map((activity) => (
        <Carousel.Item className="activityCarouselItem">
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getActivities} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
