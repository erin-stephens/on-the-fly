import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ActivityCard from '../../components/ActivityCard';
import { getSSActivities } from '../../api/filterActivityData';

export default function SocialStudiesPage() {
  const [activities, setActivities] = useState([]);

  const getAllSSActivities = () => getSSActivities().then(setActivities);

  useEffect(() => {
    getAllSSActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Social Studies Activities</title>
      </Head>
      <h1> Social Studies Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getAllSSActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
