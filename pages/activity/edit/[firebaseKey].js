import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleActivity } from '../../../api/activityData';
import ActivityForm from '../../../components/forms/ActivityForm';

export default function EditActivityPage() {
  const [editActivity, setEditActivity] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleActivity(firebaseKey).then(setEditActivity);
  }, [firebaseKey]);

  return (
    <ActivityForm obj={editActivity} />
  );
}
