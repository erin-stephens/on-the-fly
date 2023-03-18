import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get User activities
const getUserActivities = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json?orderBy="uid"&equalTo="${uid}"`, {
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

// Get Single Activity
const getSingleActivity = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// Create Activity Entry
const createActivity = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
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
//  Update Activity
const updateActivity = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities/${payload.firebaseKey}.json`, {
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
// Delete Activity
const deleteActivity = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// GET all activities
const getAllActivities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/activities.json`, {
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
  getUserActivities,
  getSingleActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
};
