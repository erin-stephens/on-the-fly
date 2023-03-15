import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllActivities } from '../api/activityData';
import ActivityCard from '../components/ActivityCard';

const getFilteredResults = (query, activities) => {
  if (!query) {
    return activities;
  }
  return activities.filter((activity) => activity.activity_name.toLowerCase().includes(query));
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [query, setQuery] = useState('');

  const getActivities = () => {
    getAllActivities().then(setActivities);
  };

  useEffect(() => {
    getActivities();
  }, []);

  const filteredItems = getFilteredResults(query, activities);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>All Activities</title>
      </Head>
      <div className="topContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search Activities"
            onChange={handleChange}
            className="searchInput"
          />
        </div>
        <div className="addActivityContainer">
          <Link passHref href="/activity/new"><button className="redBtn btn" type="button">Add an Activity</button></Link>
        </div>
      </div>
      <h1> All Activities </h1>
      <div className="d-flex flex-wrap activityCardContainer">
        {filteredItems.map((activity) => (
          <ActivityCard key={activity.firebasekey} activityObj={activity} onUpdate={getActivities} />
        ))}
      </div>
    </div>
  );
}
