import StatisticsCards from "../components/dashboard/StatisticsCards";
import ProjectChart from "../components/dashboard/ProjectChart";
import ContactChart from "../components/dashboard/ContactChart";
import RecentProjects from "../components/dashboard/RecentProjects";

import useDashboard from "../../hooks/useDashboard";


function Dashboard() {

  const { dashboard, loading } = useDashboard();


  if(loading){
    return <h3>Loading...</h3>;
  }


  return (
    <>
      <StatisticsCards data={dashboard}/>


      <div className="container-fluid pt-4 px-4">

        <div className="row g-4">

          <div className="col-sm-12 col-xl-6">
            <ProjectChart data={dashboard}/>
          </div>


          <div className="col-sm-12 col-xl-6">
            <ContactChart data={dashboard}/>
          </div>

        </div>

      </div>


      <RecentProjects 
          projects={dashboard?.recent_projects}
      />

    </>
  );
}


export default Dashboard;