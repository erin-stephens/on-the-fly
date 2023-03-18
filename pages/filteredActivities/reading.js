import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ActivityCard from '../../components/ActivityCard';
import { getReadingActivities } from '../../api/filterData';

export default function ReadingPage() {
  const [activities, setActivities] = useState([]);

  const getAllReadingActivities = () => getReadingActivities().then(setActivities);

  useEffect(() => {
    getAllReadingActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Reading Activities</title>
      </Head>
      <h1> Reading Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getAllReadingActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
