import React from "react";
import { nanoid } from "nanoid";

export default function Course(props) {

  return (
    <div className="course" onClick={props.onClick}>
      {/* <ReactPlayer url={props.data.lessons.link} /> */}
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
              <li className="course__skill" key={nanoid()}>{skill}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
