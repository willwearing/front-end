import React from "react";
import ProjectPanel from "./ProjectPanel";

import { connect } from 'react-redux'

const Dashboard = props => {




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
            {props.projects.map(proj => {
                <ProjectPanel project={proj}/>
            })}
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps, null)(Dashboard)
