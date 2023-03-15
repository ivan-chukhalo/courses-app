import React from "react";

export default function Course(props) {
  console.log(props.data.meta.skills);
  return (
    <div className="course">
      <h2 className="course__header">{props.data.title}</h2>
      <img
        src={props.data.previewImageLink + "/cover.webp"}
        className="course__img"
        alt="course preview"
      />
      <div className="course__info">
        <span className="course__info-item">{`${props.data.lessonsCount} lessons`}</span>
        <span className="course__info-item">{`${props.data.rating} / 5.0`}</span>
        <ul className="course__skills-list">
          {props.data.meta.hasOwnProperty("skills") &&
            props.data.meta.skills.map((skill) => (
              <li className="course__skill">{skill}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
