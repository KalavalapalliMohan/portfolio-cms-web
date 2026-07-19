import Chart from "react-apexcharts";

function ProjectChart() {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    theme: {
      mode: "dark",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Projects",
      data: [2, 4, 6, 8, 10, 12],
    },
  ];

  return (
    <div className="bg-secondary rounded p-4">
      <h6 className="mb-4">Project Statistics</h6>

      <Chart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </div>
  );
}

export default ProjectChart;