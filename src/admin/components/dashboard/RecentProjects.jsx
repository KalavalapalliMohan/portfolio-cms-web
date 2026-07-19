function RecentProjects() {
  const projects = [
    {
      id: 1,
      title: "Portfolio CMS",
      technology: "Laravel + React",
      status: "Completed",
      created: "19 Jul 2026",
    },
    {
      id: 2,
      title: "Job Portal",
      technology: "Laravel",
      status: "In Progress",
      created: "18 Jul 2026",
    },
    {
      id: 3,
      title: "Hospital Management",
      technology: "React",
      status: "Pending",
      created: "15 Jul 2026",
    },
  ];

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Recent Projects</h6>
        </div>

        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-white">
                <th>#</th>
                <th>Project</th>
                <th>Technology</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.title}</td>
                  <td>{project.technology}</td>
                  <td>
                    <span
                      className={`badge ${
                        project.status === "Completed"
                          ? "bg-success"
                          : project.status === "In Progress"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td>{project.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecentProjects;