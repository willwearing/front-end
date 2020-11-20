import React from "react";
import { connect } from "react-redux";
import { deleteProject, updateProject } from "./../../actions";
import { useHistory } from "react-router-dom";
import styled from "styled-components";


function ProjectPanel(props) {
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    if(props.user.role === 0) 
    {
      props.deleteProject(props.project.id);
    }
    else {
      alert('You cannot delete projects as an investor');
    }
  };
  
  
  const handleEdit = (e) => {
    e.preventDefault();
    if(props.user.role === 0) {
      history.push(`/edit/${props.project.id}`);
    }
    else {
      alert('You cannot edit projects as an investor');
    }
    
  };
  

  const handleInvest = e => {
    e.preventDefault();
    
    if(props.project.funded === 0)
    {
      alert('This project is already funded');
    }
    else
    {
      const investedProject = {...props.project,
        funded: 0
      }
      props.updateProject(props.project.id, investedProject)
      alert(`Thanks for investing in ${props.project.project_name}`);
    }
  }

  return (
    <Project>
      <div className="inner">
        <div className="title">{props.project.project_name}</div>
        <div className="fund">
          <span>Funding:</span> ${props.project.project_funding}
        </div>
        <div className="desc">
          <span>Description:</span> <p>{props.project.project_description}</p>
        </div>
        <div className="desc">
          <span>Funded:</span> <p>{props.project.funded === 1 ? 'No' : 'Yes'}</p>
        </div>
      </div>
      <div className="buttonDiv">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleInvest}>Invest</button>
      </div>
    </Project>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.user,
    userProjects: state.userProjects,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { deleteProject, updateProject })(ProjectPanel);

const Project = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 15rem;
  @media (max-width: 800px) {
    width: 80vw;
    padding: 0 5% 0 5%;
  }
  @media (max-width: 600px) {
    padding: 0%;
  }
  @media (max-width: 400px) {
    width: 100vw;
    margin: 0 10px 0 10px;
    padding: 0 15% 0 15%;
  }
  .inner {
    width: 750px;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    @media (max-width: 850px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      width: 50%;
      margin-top: 5rem;
    }
    .title {
      display: flex;
      justify-content: flex-start;
      text-decoration: underline;
      text-align: left;
      font-size: 3.5rem;
      @media (max-width: 1280px) {
        width: 100%;
      }
      @media (max-width: 900px) {
        width: 80vw;
      }
      @media (max-width: 800px) {
        font-size: 2.5rem;
      }
      @media (max-width: 600px) {
        /* width: 80vw; */
        font-size: 2rem;
      }
      @media (max-width: 400px) {
        font-size: 1rem;
      }
    }
    .desc {
      display: flex;
      text-align: left;
      align-items: baseline;
      font-size: 2rem;
      @media (max-width: 600px) {
        font-size: 1.5rem;
      }
      @media (max-width: 800px) {
        font-size: 1.5rem;
      }
      @media (max-width: 400px) {
        font-size: 1rem;
      }
      p {
        width: 40rem;
        padding-left: 10px;
        margin-bottom: 0;
        @media (max-width: 800px) {
          width: 60vw;
          font-size: 0.9rem;
        }
        @media (max-width: 600px) {
          width: 60vw;
          font-size: 0.9rem;
        }
        @media (max-width: 400px) {
          font-size: 1rem;
          width: 50vw;
        }
      }
    }
    .fund {
      width: 750px;
      font-size: 2rem;
      text-align: left;
      @media (max-width: 1280px) {
        width: 100%;
      }
      @media (max-width: 800px) {
        font-size: 1.5rem;
      }
      @media (max-width: 600px) {
        width: 60vw;
      }
      @media (max-width: 400px) {
        font-size: 0.9rem;
      }
      span {
        padding-right: 3rem;
        @media (max-width: 1280px) {
          padding-right: 3rem;
        }
        @media (max-width: 800px) {
          padding-right: 2.5rem;
        }
        @media (max-width: 600px) {
          padding-right: 2.5rem;
        }
        @media (max-width: 400px) {
          padding-right: 1.6rem;
        }
      }
    }
  }
  .buttonDiv {
    margin-bottom: 10px;
  }
  button {
    width: 15rem;
    font-size: 1rem;
    &:nth-of-type(1) {
      margin-right: 10px;
    }
    @media (max-width: 600px) {
      font-size: 0.8rem;
      width: auto;
      margin-top: 10px;
    }
    @media (max-width: 400px) {
      font-size: 0.65rem;
    }
  }
  span {
    font-weight: bold;
    @media (max-width: 400px) {
      font-size: 0.65rem;
    }
  }
`;
