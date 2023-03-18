import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ActivityCard from '../../components/ActivityCard';
import { getMathActivities } from '../../api/filterData';

export default function MathPage() {
  const [activities, setActivities] = useState([]);

  const getAllMathActivities = () => getMathActivities().then(setActivities);

  useEffect(() => {
    getAllMathActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Math Activities</title>
      </Head>
      <h1> Math Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getAllMathActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
