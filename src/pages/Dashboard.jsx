import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="mb-4">
          <h2>Admin Dashboard</h2>
          <p className="text-muted">
            Welcome to the Portfolio CMS Admin Panel.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Projects</h5>
                <h2>0</h2>
                <p className="text-muted mb-0">Manage Projects</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Skills</h5>
                <h2>0</h2>
                <p className="text-muted mb-0">Manage Skills</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Experience</h5>
                <h2>0</h2>
                <p className="text-muted mb-0">Manage Experience</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Education</h5>
                <h2>0</h2>
                <p className="text-muted mb-0">Manage Education</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Certificates</h5>
                <h2>0</h2>
                <p className="text-muted mb-0">Manage Certificates</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Messages</h5>
                <h2>0</h2>
                <p className="text-muted mb-0">Contact Messages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;