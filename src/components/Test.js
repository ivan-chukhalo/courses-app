import React from "react";

export default function Test(props) {
  // START FETCHING DATA
  const [courseData, setCourseData] = React.useState([]);
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
        fetch(
          `/api/v1/core/preview-courses/352be3c6-848b-4c19-9e7d-54fe68fef183`,
          {
            ...REQUEST_OPTIONS,
            headers: { Authorization: "Bearer " + token },
          }
        )
          .then((response) => response.json())
          .then((result) => setCourseData(result.courses))
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  React.useEffect(() => {
    getData();
  }, []);

  // EDN FETCHING DATA

  return (
    <div>tesssssssssssssssssssssssssssssssssssssssssssssssssssssssssst</div>
  )
}