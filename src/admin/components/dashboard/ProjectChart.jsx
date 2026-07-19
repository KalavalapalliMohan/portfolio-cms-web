import Chart from "react-apexcharts";


function ProjectChart({ data }) {


  const series = [
    {
      name: "Projects",
      data: [
        data?.total_projects ?? 0
      ],
    },
  ];


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
      categories: [
        "Total"
      ],
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

      <h6 className="mb-4">
        Project Statistics
      </h6>


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