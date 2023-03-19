import React from "react";
import Course from "./Course";
import Pagination from "./Pagination";

export default function HomePage({
  currentCourses,
  coursesPreviewData,
  coursesPerPage,
  currentPage,
  setCurrentPage,
  fetchCourse,
}) {
  return (
    <>
      <h1 className="header">List of courses</h1>
      <Pagination
        totalCourses={coursesPreviewData.length}
        coursesPerPage={coursesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="courses-wrapper">
        {currentCourses.map((course) => (
          <Course
            data={course}
            key={course.id}
            onClick={() => fetchCourse(course.id)}
          />
        ))}
      </div>
      <Pagination
        totalCourses={coursesPreviewData.length}
        coursesPerPage={coursesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
