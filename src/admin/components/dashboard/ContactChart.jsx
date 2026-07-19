import Chart from "react-apexcharts";


function ContactChart({data}) {

  const series = [
    data?.total_messages ?? 0
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

    labels: [
      "Messages"
    ],

    legend: {
      position: "bottom",
    },
  };


  return (
    <div className="bg-secondary rounded p-4">

      <h6 className="mb-4">
        Contact Messages
      </h6>


      <Chart
        options={options}
        series={series}
        type="donut"
        height={300}
      />

    </div>
  );
}


export default ContactChart;