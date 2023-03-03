/* API calls go here */
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;
// Create Merged Object
const createMergedObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.join`, {
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

export {
  createMergedObj,
  updateMergedObject,
};
