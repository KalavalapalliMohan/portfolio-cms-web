import Chart from "react-apexcharts";

function ContactChart() {
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
    labels: ["New", "Replied", "Pending"],
    legend: {
      position: "bottom",
    },
  };

  const series = [12, 8, 5];

  return (
    <div className="bg-secondary rounded p-4">
      <h6 className="mb-4">Contact Messages</h6>

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