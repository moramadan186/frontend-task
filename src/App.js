import React, { useState, useEffect } from "react";
import axios from "axios";
import CoursesTable from "./coursesTable";

export default function App() {
  const [allData, setAllData] = useState(null);
  // getting data from api using axois library
  useEffect(() => {
    axios.get("https://api.most.technology/course").then((res) => {
      setAllData(res.data);
    });
  }, []);
  if (!allData) return null;

  // convert all prices which is string to number to do right sort
  let courses = allData.data.map((course) => {
    return { ...course, price: parseInt(course.price, 10) };
  });

  return (
    <React.Fragment>
      <CoursesTable courses={courses} />
    </React.Fragment>
  );
}
