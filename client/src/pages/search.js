import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function SearchPage() {
  const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { query } = useParams();

  useEffect(() => {
    console.log('useEffect');
    axios.get(`/api/v1/search/${query}`).then(({ data }) => {
      setCourses(data.results);
    });
  }, [query]);

  return (
    <>
      <h2>results:</h2>
      <ul>
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <Link to={`/details/${course.id}`}>{course.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SearchPage;
