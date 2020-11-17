import React, { useEffect } from "react";
import ProjectPanel from "./ProjectPanel";

import { connect } from 'react-redux'
//import { axiosWithAuth } from './../../utils/axiosWithAuth';

import { fetchProjects } from './../../actions';

const Dashboard = props => {

    useEffect(() => {
        props.fetchProjects();
    }, [])

    return (
        <div id="wrapper">
            <section id="intro" className="wrapper style1 fullscreen fade-up">
                <div className="inner">
                    {/*Here we will greet the user and display their details*/}
                    Hello {/*props.user.name*/}!
                    
                </div>
                
            </section>
            <div>Your Projects</div>
            {props.projects.map(proj => {
                return <ProjectPanel project={proj}/>
            })}
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps, {fetchProjects})(Dashboard)
