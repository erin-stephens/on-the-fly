import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMathActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const mathSubjects = Object.values(data).filter((activity) => activity.subject === 'math');
      resolve(mathSubjects);
    })
    .catch(reject);
});

const getReadingActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const readingSubjects = Object.values(data).filter((activity) => activity.subject === 'reading');
      resolve(readingSubjects);
    })
    .catch(reject);
});

const getScienceActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const scienceSubjects = Object.values(data).filter((activity) => activity.subject === 'science');
      resolve(scienceSubjects);
    })
    .catch(reject);
});

const getSSActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const ssSubjects = Object.values(data).filter((activity) => activity.subject === 'social studies');
      resolve(ssSubjects);
    })
    .catch(reject);
});

const getBBActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const bbSubjects = Object.values(data).filter((activity) => activity.subject === 'brain break');
      resolve(bbSubjects);
    })
    .catch(reject);
});

const getRecessActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const recessSubjects = Object.values(data).filter((activity) => activity.subject === 'indoor recess');
      resolve(recessSubjects);
    })
    .catch(reject);
});

export {
  getMathActivities,
  getReadingActivities,
  getScienceActivities,
  getSSActivities,
  getBBActivities,
  getRecessActivities,
};
