import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import projectService from "../../../services/projectService";
import ProjectModal from "./ProjectModal";

function ProjectList() {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    // get project data
    const fetchProjects = async () => {
        try {
            const response = await projectService.getProjects();
            setProjects(response.data || []);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    // delete prject data
    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Delete Project?",
            text: "You won't be able to recover this project.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {

            await projectService.deleteProject(id);

            setProjects((prev) =>
                prev.filter((project) => project.id !== id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Project deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unable to delete project.",
            });

        }

    };

    // loading 
    if(loading){
        return (
            <div className="container-fluid pt-4 px-4">
                <h4 className="text-white">
                    Loading Projects...
                </h4>
            </div>
        )
    }

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="bg-secondary rounded h-100 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="mb-0 text-white">
                                    Projects
                                </h6>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSelectedProject(null);
                                        setShowModal(true);
                                    }}
                                >
                                    <i className="fa fa-plus me-2"></i>
                                    Add Project
                                </button>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Technologies</th>
                                            <th>Status</th>
                                            <th>Featured</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        projects.length > 0 ?
                                        projects.map((project,index)=>(
                                            <tr key={project.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {
                                                        project.image_url ?
                                                        <img
                                                            src={project.image_url}
                                                            width="60"
                                                            height="40"
                                                            style={{
                                                                objectFit:"cover"
                                                            }}
                                                            alt={project.title}
                                                        />
                                                        :
                                                        "No Image"
                                                    }
                                                </td>
                                                <td>
                                                    {project.title}
                                                </td>
                                                <td>
                                                    {project.technologies}
                                                </td>
                                                <td>
                                                    {
                                                        project.status ?

                                                        <span className="badge bg-success">
                                                            Active
                                                        </span>

                                                        :

                                                        <span className="badge bg-danger">
                                                            Inactive
                                                        </span>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        project.is_featured ?

                                                        <span className="badge bg-primary">
                                                            Featured
                                                        </span>

                                                        :

                                                        "-"
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => {
                                                            setSelectedProject(project);
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        disabled={deletingId === project.id}
                                                        onClick={() => handleDelete(project.id)}
                                                    >
                                                        {deletingId === project.id ? "Deleting..." : "Delete"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td 
                                                colSpan="7"
                                                className="text-center"
                                            >
                                                No Projects Found
                                            </td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProjectModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedProject(null);
                }}
                onSuccess={fetchProjects}
                project={selectedProject}
            />   
        </>

    );
}

export default ProjectList;