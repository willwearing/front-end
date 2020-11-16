import React from "react";
import ProjectPanel from "./ProjectPanel";


export default function Dashboard() {




    return (
        <div id="wrapper">
            <section id="intro" className="wrapper style1 fullscreen fade-up">
                <div className="inner">
                    {/*Here we will greet the user and display their details*/}
                    Hello {/*props.user.name*/}!
                    Email: {/*props.user.email*/}
                </div>
            </section>
            <div>Your Projects</div>
            <ProjectPanel />
        </div>
    )
}
