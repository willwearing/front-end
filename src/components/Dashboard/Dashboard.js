import React, { useEffect } from "react";
import ProjectPanel from "./ProjectPanel";
import styled from 'styled-components';

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
            <YourProjects>Your Projects</YourProjects>
            {props.isLoading ? ('Loading Projects...') : (props.projects.map(proj => {
                return <ProjectPanel project={proj}/>
            }))}
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        projects: state.projects,
        user: state.user,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps, {fetchProjects})(Dashboard)


const YourProjects = styled.div`
    font-size: 3rem;

`