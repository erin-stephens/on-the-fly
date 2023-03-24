/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getUserActivities } from '../api/activityData';
import ActivityCard from '../components/ActivityCard';
import { useAuth } from '../utils/context/authContext';

const getFilteredResults = (query, activities) => {
  if (!query) {
    return activities;
  }
  return activities.filter((activity) => activity.activity_name.toLowerCase().includes(query));
};

export default function UserActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  const getActivities = () => {
    getUserActivities(user.uid).then(setActivities);
  };

  useEffect(() => {
    getActivities();
  }, [user]);

  const filteredItems = getFilteredResults(query, activities);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>My Activities</title>
      </Head>
      <div className="topContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search Activities by Name"
            onChange={handleChange}
            className="searchInput"
          />
        </div>
        <div className="addActivityContainer">
          <Link passHref href="/activity/new"><button className="redBtn btn" type="button">Add an Activity</button></Link>
        </div>
      </div>
      <h1> My Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {filteredItems.map((activity) => (
          <ActivityCard key={activity.firebaseKey} activityObj={activity} onUpdate={getActivities} />
        ))}
      </div>
    </div>
  );
}
