import { lazy, Suspense } from "react";

const Chart = lazy(() => import("react-apexcharts"));

function ContactChart({ data }) {
  const totalMessages = data?.total_messages ?? 0;

  const series = [totalMessages];

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

    labels: ["Messages"],

    legend: {
      position: "bottom",
      labels: {
        colors: "#9ca3af",
      },
    },

    stroke: {
      colors: ["transparent"],
    },

    dataLabels: {
      enabled: true,
    },

    tooltip: {
      theme: "dark",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "72%",
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h5 className="chart-title">Contact Messages</h5>

          <p className="chart-subtitle">
            Total messages received from visitors.
          </p>
        </div>

        <span className="chart-badge">{totalMessages}</span>
      </div>

      <Suspense
        fallback={
          <div className="chart-loading">
            <div className="spinner-border text-primary" role="status"></div>

            <p className="mt-3 mb-0">Loading chart...</p>
          </div>
        }
      >
        <Chart options={options} series={series} type="donut" height={300} />
      </Suspense>
    </div>
  );
}

export default ContactChart;
