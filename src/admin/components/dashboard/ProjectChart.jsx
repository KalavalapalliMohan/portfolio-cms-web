import { lazy, Suspense } from "react";

const Chart = lazy(() => import("react-apexcharts"));

function ProjectChart({ data }) {
  const series = [
    {
      name: "Projects",
      data: [data?.total_projects ?? 0],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      background: "transparent",
      zoom: {
        enabled: false,
      },
    },
    theme: {
      mode: "dark",
    },
    xaxis: {
      categories: ["Total Projects"],
      labels: {
        style: {
          colors: "#9ca3af",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
        },
      },
    },
    grid: {
      borderColor: "#2f3b52",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h5 className="chart-title">Project Statistics</h5>

          <p className="chart-subtitle">
            Overview of total portfolio projects.
          </p>
        </div>

        <span className="chart-badge">{data?.total_projects ?? 0}</span>
      </div>

      <Suspense
        fallback={
          <div className="chart-loading">
            <div className="spinner-border text-primary" role="status"></div>

            <p className="mt-3 mb-0">Loading chart...</p>
          </div>
        }
      >
        <Chart options={options} series={series} type="line" height={300} />
      </Suspense>
    </div>
  );
}

export default ProjectChart;
