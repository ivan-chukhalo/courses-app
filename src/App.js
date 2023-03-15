import React from "react";
import Course from "./components/Course";

function App() {
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

  return (
    <div className="App">
      <h1 className="header">List of courses</h1>
      <div className="courses-wrapper">
        {coursesData.map((course) => (
          <Course data={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
