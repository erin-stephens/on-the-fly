import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
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
    <div>
      <h1>All Activities</h1>
      <Carousel>
        <Carousel.Item>
          <div>
            {activities.map((activity) => (
              <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getActivities} />
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
