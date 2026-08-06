function RecentProjects({ projects = [] }) {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="recent-project-card">
        <div className="recent-project-header">
          <div>
            <h5 className="recent-project-title">Recent Projects</h5>

            <p className="recent-project-subtitle">
              Latest projects added to your portfolio.
            </p>
          </div>

          <span className="recent-count">
            {projects.length} Project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle table-hover recent-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Project</th>
                <th>Technology</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td className="fw-semibold">#{project.id}</td>

                    <td>
                      <div className="project-name">{project.title}</div>
                    </td>

                    <td>
                      <span className="tech-badge">{project.technologies}</span>
                    </td>

                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          project.status ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {project.status ? "Completed" : "Pending"}
                      </span>
                    </td>

                    <td className="text-muted">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="fa fa-folder-open fa-2x mb-3 d-block"></i>
                    No recent projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecentProjects;
