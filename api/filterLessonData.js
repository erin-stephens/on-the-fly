import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMathLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const mathSubjects = Object.values(data).filter((lesson) => lesson.subject === 'math');
      resolve(mathSubjects);
    })
    .catch(reject);
});

const getReadingLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const readingSubjects = Object.values(data).filter((lesson) => lesson.subject === 'reading');
      resolve(readingSubjects);
    })
    .catch(reject);
});

const getScienceLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const scienceSubjects = Object.values(data).filter((lesson) => lesson.subject === 'science');
      resolve(scienceSubjects);
    })
    .catch(reject);
});

const getSSLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const ssSubjects = Object.values(data).filter((lesson) => lesson.subject === 'social studies');
      resolve(ssSubjects);
    })
    .catch(reject);
});

const getBBLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const bbSubjects = Object.values(data).filter((lesson) => lesson.subject === 'brain breaks');
      resolve(bbSubjects);
    })
    .catch(reject);
});

const getRecessLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const recessSubjects = Object.values(data).filter((lesson) => lesson.subject === 'indoor recess');
      resolve(recessSubjects);
    })
    .catch(reject);
});

export {
  getMathLessons,
  getReadingLessons,
  getScienceLessons,
  getSSLessons,
  getBBLessons,
  getRecessLessons,
};
