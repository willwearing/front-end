import React from "react";

export default function ProjectPanel(props) {
  return (
    <section id="one" className="wrapper style2 spotlights">
      <section>
        <div className="content">
          <div className="inner">
              <div>Project Name: {props.project.project_name}</div>
              <p>Project Description: {props.project.project_description}</p>
              <div>Project Funding: {props.project.project_funding}</div>
          </div>
        </div>
      </section>
    </section>
  );
}
