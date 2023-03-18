import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ActivityCard from '../../components/ActivityCard';
import { getRecessActivities } from '../../api/filterData';

export default function IndoorRecessPage() {
  const [activities, setActivities] = useState([]);

  const getAllRecessActivities = () => getRecessActivities().then(setActivities);

  useEffect(() => {
    getAllRecessActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Indoor Recess Activities</title>
      </Head>
      <h1> Indoor Recess Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getAllRecessActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
