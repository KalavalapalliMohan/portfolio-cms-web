import { lazy, Suspense } from "react";

const Chart = lazy(() => import("react-apexcharts"));

function ContactChart({ data }) {
  const series = [data?.total_messages ?? 0];

  const options = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
    },
    theme: {
      mode: "dark",
    },
    labels: ["Messages"],
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="bg-secondary rounded p-4">
      <h6 className="mb-4">Contact Messages</h6>

      <Suspense
        fallback={<div className="text-center py-5">Loading chart...</div>}
      >
        <Chart options={options} series={series} type="donut" height={300} />
      </Suspense>
    </div>
  );
}

export default ContactChart;
