function StatisticsCards({ data }) {
  const cards = [
    {
      title: "Projects",
      value: data?.total_projects ?? 0,
      icon: "fa fa-folder-open",
      color: "primary",
    },
    {
      title: "Skills",
      value: data?.total_skills ?? 0,
      icon: "fa fa-code",
      color: "success",
    },
    {
      title: "Experience",
      value: data?.total_experience ?? "0 Years",
      icon: "fa fa-briefcase",
      color: "warning",
    },
    {
      title: "Messages",
      value: data?.total_messages ?? 0,
      icon: "fa fa-envelope",
      color: "danger",
    },
  ];

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-sm-6 col-xl-3" key={index}>
            <div className="stats-card">
              <div className={`stats-icon bg-${card.color}`}>
                <i className={card.icon}></i>
              </div>

              <div className="stats-content">
                <span className="stats-title">{card.title}</span>

                <h3 className="stats-value">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsCards;
