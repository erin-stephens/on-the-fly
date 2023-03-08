/* API calls go here */
import { clientCredentials } from '../utils/client';
import { deleteLesson } from './lessonData';

const endpoint = clientCredentials.databaseURL;
// Create Merged Object
const createMergedObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.json`, {
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

// Update Merged Object
const updateMergedObject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged/${payload.firebaseKey}.json`, {
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

// get all merged data objects by the lesson ID
const getMergedObjectsByLessonId = (lessonFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.json?orderBy="lessonPlan_id"&equalTo="${lessonFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Get single merged object
const getSingleMergedObj = (lessonFirebaseKey, activityFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.json?orderBy="lessonPlan_id"&equalTo="${lessonFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const arr = Object.values(data).filter((item) => item.activity_id === activityFirebaseKey);
      resolve(arr[0]);
    })
    .catch(reject);
});

// Delete Single Merged Object
const deleteMergedObj = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// Delete Lesson Plan Data
const deleteLessonData = (firebaseKey) => new Promise((resolve, reject) => {
  getMergedObjectsByLessonId(firebaseKey).then((arr) => {
    const deleteMergedPromises = arr.map((obj) => deleteMergedObj(obj.firebaseKey));

    Promise.all(deleteMergedPromises).then(() => {
      deleteLesson(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export {
  createMergedObj,
  updateMergedObject,
  getMergedObjectsByLessonId,
  getSingleMergedObj,
  deleteMergedObj,
  deleteLessonData,
};
