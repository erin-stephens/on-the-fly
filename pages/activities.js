import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllActivities } from '../api/activityData';
import ActivityCard from '../components/ActivityCard';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const getActivities = () => {
    getAllActivities().then(setActivities);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <Head>
        <title>All Activities</title>
      </Head>
      <div className="addActivityContainer">
        <Link passHref href="/activity/new"><button className="redBtn btn" type="button">Add an Activity</button></Link>
      </div>
      <h1> All Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getActivities} />
        ))}
      </div>
    </div>
  );
}
