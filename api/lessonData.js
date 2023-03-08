import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get User Lessons
const getUserLessons = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
// lessons for Home View
/* const getHomeLessons = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const homeFilterLessons = Object.values(data).filter((item) => item.public === true || item.uid === uid);
      resolve(homeFilterLessons);
    })
    .catch(reject);
}); */
// Get Single Lesson
const getSingleLesson = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// Create Lesson Entry
const createLesson = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
//  Update Lesson
const updateLesson = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
// Delete Lesson
const deleteLesson = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// GET all lessons
const getAllLessons = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lessons.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
export {
  getUserLessons,
  // getHomelessons,
  getSingleLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
};
