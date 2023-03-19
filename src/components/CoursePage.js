import React from "react";
import ReactPlayer from 'react-player';

export default function CoursePage(props){
    console.log(props.course.lessons[0].link)
    return(
        <div>
            <ReactPlayer 
                url={props.course.lessons[0].link}
            />
        </div>
    )
}