import React, { useState } from "react";
import { getRequest } from './functions/fetch';

function SearchPage() {
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        
        console.log({query});
        
        const url = `/api/v1/search/${query}`
        const data = await getRequest(url);
        setCourses(data.results)
        
    }

    function handleChange({target}) {
        setQuery(target.value);
    }

    return (
        <>
            <h2>search</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleChange}/>
                <input type="submit" value="Search" />
            </form>
            <ul className="results">
                {courses.map(course => {
                    return <li key={course.id}>{course.title}</li>
                })}
            </ul>
        </>
    );
}

export default SearchPage;
