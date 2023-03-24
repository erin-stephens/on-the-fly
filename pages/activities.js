import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
            placeholder="Search Activities by Name"
            onChange={handleChange}
            className="searchInput"
          />
        </div>
        <div className="addActivityContainer">
          <Link passHref href="/activity/new"><button className="redBtn btn" type="button">Add an Activity</button></Link>
        </div>
      </div>
      <h1> All Activities </h1>
      <div className="btnGroup">
        <ButtonGroup>
          <Link passHref href="/filteredActivities/brainBreak"><Button variant="secondary">Brain Breaks</Button></Link>
          <Link passHref href="/filteredActivities/indoorRecess"><Button variant="secondary">Indoor Recess</Button></Link>
          <Link passHref href="/filteredActivities/math"><Button variant="secondary">Math</Button></Link>
          <Link passHref href="/filteredActivities/reading"><Button variant="secondary">Reading</Button></Link>
          <Link passHref href="/filteredActivities/science"><Button variant="secondary">Science</Button></Link>
          <Link passHref href="/filteredActivities/socialStudies"><Button variant="secondary">Social Studies</Button></Link>
        </ButtonGroup>
      </div>
      <div className="d-flex flex-wrap activityCardContainer">
        {filteredItems.map((activity) => (
          <ActivityCard key={activity.firebaseKey} activityObj={activity} onUpdate={getActivities} />
        ))}
      </div>
    </div>
  );
}
