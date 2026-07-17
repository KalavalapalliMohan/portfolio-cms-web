function Dashboard() {
  return (
    <>
      {/* Sale & Revenue Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-line fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Total Projects</p>
                <h6 className="mb-0">12</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-bar fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Total Skills</p>
                <h6 className="mb-0">25</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-area fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Today Experience</p>
                <h6 className="mb-0">3 Years</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-pie fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Messages</p>
                <h6 className="mb-0">15</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sale & Revenue End */}
      {/* Sales Chart Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Project Statistics Chart</h6>
                <a href>Show All</a>
              </div>
              <canvas id="worldwide-sales" />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Contact Messages Chart </h6>
                <a href>Show All</a>
              </div>
              <canvas id="salse-revenue" />
            </div>
          </div>
        </div>
      </div>
      {/* Sales Chart End */}
      {/* Recent Sales Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="bg-secondary text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Recent Salse</h6>
            <a href>Show All</a>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-white">
                  <th scope="col"><input className="form-check-input" type="checkbox" /></th>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href>Detail</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Recent Sales End */}
      {/* Widgets Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 bg-secondary rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0">Messages</h6>
                <a href>Show All</a>
              </div>
              <div className="d-flex align-items-center border-bottom py-3">
                <img className="rounded-circle flex-shrink-0" src="/admin-assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">Jhon Doe</h6>
                    <small>15 minutes ago</small>
                  </div>
                  <span>Short message goes here...</span>
                </div>
              </div>
              <div className="d-flex align-items-center border-bottom py-3">
                <img className="rounded-circle flex-shrink-0" src="/admin-assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">Jhon Doe</h6>
                    <small>15 minutes ago</small>
                  </div>
                  <span>Short message goes here...</span>
                </div>
              </div>
              <div className="d-flex align-items-center border-bottom py-3">
                <img className="rounded-circle flex-shrink-0" src="/admin-assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">Jhon Doe</h6>
                    <small>15 minutes ago</small>
                  </div>
                  <span>Short message goes here...</span>
                </div>
              </div>
              <div className="d-flex align-items-center pt-3">
                <img className="rounded-circle flex-shrink-0" src="/admin-assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">Jhon Doe</h6>
                    <small>15 minutes ago</small>
                  </div>
                  <span>Short message goes here...</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 bg-secondary rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Calender</h6>
                <a href>Show All</a>
              </div>
              <div id="calender" />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 bg-secondary rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">To Do List</h6>
                <a href>Show All</a>
              </div>
              <div className="d-flex mb-2">
                <input className="form-control bg-dark border-0" type="text" placeholder="Enter task" />
                <button type="button" className="btn btn-primary ms-2">Add</button>
              </div>
              <div className="d-flex align-items-center border-bottom py-2">
                <input className="form-check-input m-0" type="checkbox" />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>Short task goes here...</span>
                    <button className="btn btn-sm"><i className="fa fa-times" /></button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center border-bottom py-2">
                <input className="form-check-input m-0" type="checkbox" />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>Short task goes here...</span>
                    <button className="btn btn-sm"><i className="fa fa-times" /></button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center border-bottom py-2">
                <input className="form-check-input m-0" type="checkbox" defaultChecked />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span><del>Short task goes here...</del></span>
                    <button className="btn btn-sm text-primary"><i className="fa fa-times" /></button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center border-bottom py-2">
                <input className="form-check-input m-0" type="checkbox" />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>Short task goes here...</span>
                    <button className="btn btn-sm"><i className="fa fa-times" /></button>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center pt-2">
                <input className="form-check-input m-0" type="checkbox" />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>Short task goes here...</span>
                    <button className="btn btn-sm"><i className="fa fa-times" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Widgets End */}

    </>
  );
}

export default Dashboard;