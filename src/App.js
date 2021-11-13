import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CoursesTable from './coursesTable';
export default function App() {
  const [allData, setAllData] = useState(null)
  useEffect(() => {
    axios.get('https://api.most.technology/course').then((res) => {
      setAllData(res.data);
    })
  }, [])
  if (!allData) return null;
  return (
    <React.Fragment>
      <CoursesTable courses={allData.data}/>
    </React.Fragment>

  );
}