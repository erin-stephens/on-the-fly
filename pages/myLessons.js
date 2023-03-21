/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getUserLessons } from '../api/lessonData';
import LessonCard from '../components/LessonCard';
import { useAuth } from '../utils/context/authContext';

const getFilteredResults = (query, lessons) => {
  if (!query) {
    return lessons;
  }
  return lessons.filter((lesson) => lesson.lesson_name.toLowerCase().includes(query));
};

export default function UserLessonPlansPage() {
  const [lessons, setLessons] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  const getLessons = () => {
    getUserLessons(user.uid).then(setLessons);
  };

  useEffect(() => {
    getLessons();
  }, []);

  const filteredItems = getFilteredResults(query, lessons);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>My Lesson Plans</title>
      </Head>
      <div className="topContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search Lessons by Name"
            onChange={handleChange}
            className="searchInput"
          />
        </div>
        <div className="addLessonContainer">
          <Link passHref href="/lesson/new"><button type="button" className="redBtn btn">Create a Lesson</button></Link>
        </div>
      </div>
      <h1> My Lesson Plans </h1>
      <div className="lessonCardContainer">
        {filteredItems.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getLessons} />
        ))}
      </div>
    </div>
  );
}
