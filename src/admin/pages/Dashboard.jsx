import StatisticsCards from "../components/dashboard/StatisticsCards";
import ProjectChart from "../components/dashboard/ProjectChart";
import ContactChart from "../components/dashboard/ContactChart";
import RecentProjects from "../components/dashboard/RecentProjects";

function Dashboard() {
  return (
    <>
      <StatisticsCards />

      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <ProjectChart />
          </div>

          <div className="col-sm-12 col-xl-6">
            <ContactChart />
          </div>
        </div>
      </div>

      <RecentProjects />
    </>
  );
}

export default Dashboard;