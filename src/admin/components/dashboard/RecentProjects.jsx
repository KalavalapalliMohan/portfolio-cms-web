function RecentProjects({ projects = [] }) {

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

            {
              projects.map((project)=>(
                <tr key={project.id}>

                  <td>{project.id}</td>

                  <td>{project.title}</td>

                  <td>{project.technologies}</td>


                  <td>
                    <span className="badge bg-success">
                      {project.status ? "Completed" : "Pending"}
                    </span>
                  </td>


                  <td>
                    {new Date(project.created_at)
                    .toLocaleDateString()}
                  </td>

                </tr>
              ))
            }

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}


export default RecentProjects;