import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailsPage(props, aa, bb) {
  const [course, setCourse] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // setLoading(true);
    axios.get(`/api/v1/course/${id}`).then(({ data }) => {
      setCourse(data.course);
      // setLoading(false);
      // setError(null);
    });
  }, [id]);

  return (
    <>
      <h2>{course.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: course.description }} />
    </>
  );
}

export default DetailsPage;
