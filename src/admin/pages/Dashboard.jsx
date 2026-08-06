import StatisticsCards from "../components/dashboard/StatisticsCards";
import ProjectChart from "../components/dashboard/ProjectChart";
import ContactChart from "../components/dashboard/ContactChart";
import RecentProjects from "../components/dashboard/RecentProjects";

import useDashboard from "../../hooks/useDashboard";

function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <div className="container-fluid pt-5 px-4">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div
            className="spinner-border text-primary mb-3"
            style={{ width: "3rem", height: "3rem" }}
          ></div>

          <h5 className="mb-2">Loading Dashboard...</h5>

          <p className="text-muted mb-0">
            Please wait while we fetch your latest statistics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Dashboard Header */}

      <div className="container-fluid pt-4 px-4">
        <div className="dashboard-header">
          <div>
            <h3 className="fw-bold mb-1">Dashboard</h3>

            <p className="text-muted mb-0">
              Welcome back! Here's what's happening with your portfolio today.
            </p>
          </div>

          <button
            className="btn btn-primary global-add-button"
            onClick={() => window.location.reload()}
          >
            <i className="fa fa-sync-alt me-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}

      <StatisticsCards data={dashboard} />

      {/* Charts */}

      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <ProjectChart data={dashboard} />
          </div>

          <div className="col-lg-6">
            <ContactChart data={dashboard} />
          </div>
        </div>
      </div>

      {/* Recent Projects */}

      <RecentProjects projects={dashboard?.recent_projects} />
    </>
  );
}

export default Dashboard;
