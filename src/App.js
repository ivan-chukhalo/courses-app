import React from "react";
import HomePage from "./components/HomePage";
import CoursePage from "./components/CoursePage";

function App() {
  const [currentCourse, setCurrentCourse] = React.useState(null);
  // START FETCHING COURSES PREVIEW DATA
  const [coursesPreviewData, setCoursesPreviewData] = React.useState([]); // інформація про прев'ю курсів
  const REQUEST_OPTIONS = {
    method: "GET",
    redirect: "follow",
    cache: "no-cache",
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
          .then((result) => {
            setCoursesPreviewData(result.courses);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  React.useEffect(() => {
    getData();
  }, []);

  console.log(coursesPreviewData);

  // EDN FETCHING COURSES PREVIEW DATA

  // START PAGINATION
  const [currentPage, setCurrentPage] = React.useState(1);
  const [coursesPerPage, setCoursesPerPage] = React.useState(10);
  const lastCourseIndex = currentPage * coursesPerPage;
  const firstCourseIndex = lastCourseIndex - coursesPerPage;
  const currentCourses = coursesPreviewData.slice(
    firstCourseIndex,
    lastCourseIndex
  );
  // END PAGINATION

  // START FETCHING SPECIFIC COURSE DATA
  async function fetchCourse(id) {
    setCurrentCourse(null); 
    await fetch(
      "/api/v1/auth/anonymous?platform=subscriptions",
      REQUEST_OPTIONS
    )
      .then((response) => response.text())
      .then((result) => {
        const token = JSON.parse(result).token;
        const headers = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const requestOptionsCourses = Object.assign(
          {},
          REQUEST_OPTIONS,
          headers
        );

        fetch("/api/v1/core/preview-courses" + "/" + id, requestOptionsCourses)
          .then((response) => response.json())
          .then((result) => {
            setCurrentCourse(result);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }
  // END FETCHING PARTICULAR COURSE DATA

  return (
    <div className="App">
      {currentCourse ? (
        <CoursePage course={currentCourse} />
      ) : (
        <HomePage
          currentCourses={currentCourses}
          coursesPreviewData={coursesPreviewData}
          coursesPerPage={coursesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchCourse={fetchCourse}
        />
      )}
    </div>
  );
}

export default App;
