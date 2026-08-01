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
      toolbar: { show: false },
      background: "transparent",
    },
    theme: {
      mode: "dark",
    },
    xaxis: {
      categories: ["Total"],
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="bg-secondary rounded p-4">
      <h6 className="mb-4">Project Statistics</h6>

      <Suspense
        fallback={<div className="text-center py-5">Loading chart...</div>}
      >
        <Chart options={options} series={series} type="line" height={300} />
      </Suspense>
    </div>
  );
}

export default ProjectChart;
