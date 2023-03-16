import React from "react";
import Course from "./components/Course";
import Pagination from "./components/Pagination";

function App() {
  // START FETCHING DATA
  const [coursesData, setCoursesData] = React.useState([]);
  const REQUEST_OPTIONS = {
    method: "GET",
    redirect: "follow",
  };

  async function getData() {
    let token;
    function getToken(tokenData) {
      token = tokenData;
    }
    await fetch(
      "/api/v1/auth/anonymous?platform=subscriptions",
      REQUEST_OPTIONS
    )
      .then((response) => response.text())
      .then((result) => {
        getToken(JSON.parse(result).token);
        fetch("/api/v1/core/preview-courses", {
          ...REQUEST_OPTIONS,
          headers: { Authorization: "Bearer " + token },
        })
          .then((response) => response.json())
          .then((result) => setCoursesData(result.courses))
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  React.useEffect(() => {
    getData();
  }, []);

  // EDN FETCHING DATA

  // START PAGINATION
  const [currentPage, setCurrentPage] = React.useState(1);
  const [coursesPerPage, setCoursesPerPage] = React.useState(10);
  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourses = coursesData.slice(firstCourseIndex, lastCourseIndex);
  // END PAGINATION

  return (
    <div className="App">
      <h1 className="header">List of courses</h1>
      <Pagination
        totalCourses={coursesData.length}
        coursesPerPage={coursesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="courses-wrapper">
        {currentCourses.map((course) => (
          <Course data={course} key={course.id}/>
        ))}
      </div>
      <Pagination
        totalCourses={coursesData.length}
        coursesPerPage={coursesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
