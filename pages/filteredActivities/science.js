import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import ActivityCard from '../../components/ActivityCard';
import { getScienceActivities } from '../../api/filterData';

export default function SciencePage() {
  const [activities, setActivities] = useState([]);

  const getAllScienceActivities = () => getScienceActivities().then(setActivities);

  useEffect(() => {
    getAllScienceActivities();
  }, []);

  console.warn(activities);

  return (
    <>
      <Head>
        <title>Science Activities</title>
      </Head>
      <h1> Science Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {activities.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getAllScienceActivities} />
        ))}
      </div>
      <Link passHref href="/activities"><Button className="mintBtn">Back</Button></Link>
    </>
  );
}
