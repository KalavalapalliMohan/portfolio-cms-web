function StatisticsCards() {
  const cards = [
    {
      title: "Projects",
      value: 0,
      icon: "fa fa-folder",
      color: "primary",
    },
    {
      title: "Skills",
      value: 0,
      icon: "fa fa-code",
      color: "success",
    },
    {
      title: "Experience",
      value: "0",
      icon: "fa fa-briefcase",
      color: "warning",
    },
    {
      title: "Messages",
      value: 0,
      icon: "fa fa-envelope",
      color: "danger",
    },
  ];

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-sm-6 col-xl-3" key={index}>
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className={`${card.icon} fa-3x text-${card.color}`}></i>

              <div className="ms-3">
                <p className="mb-2">{card.title}</p>
                <h6 className="mb-0">{card.value}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsCards;