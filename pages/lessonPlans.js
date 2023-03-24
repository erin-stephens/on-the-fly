import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { getAllLessons } from '../api/lessonData';
import LessonCard from '../components/LessonCard';

const getFilteredResults = (query, lessons) => {
  if (!query) {
    return lessons;
  }
  return lessons.filter((lesson) => lesson.lesson_name.toLowerCase().includes(query));
};

export default function LessonPlansPage() {
  const [lessons, setLessons] = useState([]);
  const [query, setQuery] = useState('');

  const getLessons = () => {
    getAllLessons().then(setLessons);
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
        <title>All Lessons</title>
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
          <Link passHref href="/lesson/new"><button type="button" className="redBtn">Create a Lesson</button></Link>
        </div>
      </div>
      <h1> All Lessons </h1>
      <div className="btnGroup">
        <ButtonGroup>
          <Link passHref href="/filteredLessons/brainBreakLP"><Button variant="secondary">Brain Breaks</Button></Link>
          <Link passHref href="/filteredLessons/indoorRecessLP"><Button variant="secondary">Indoor Recess</Button></Link>
          <Link passHref href="/filteredLessons/mathLP"><Button variant="secondary">Math</Button></Link>
          <Link passHref href="/filteredLessons/readingLP"><Button variant="secondary">Reading</Button></Link>
          <Link passHref href="/filteredLessons/scienceLP"><Button variant="secondary">Science</Button></Link>
          <Link passHref href="/filteredLessons/socialStudiesLP"><Button variant="secondary">Social Studies</Button></Link>
        </ButtonGroup>
      </div>
      <div className="lessonCardContainer">
        {filteredItems.map((lesson) => (
          <LessonCard key={lesson.firebaseKey} lessonObj={lesson} onUpdate={getLessons} />
        ))}
      </div>
    </div>
  );
}
