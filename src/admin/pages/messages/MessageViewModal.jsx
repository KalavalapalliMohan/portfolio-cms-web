function MessageViewModal({ show, onClose, message }) {
  if (!show || !message) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.6)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content admin-modal text-white">
          <div className="modal-header admin-modal-header">
            <h5 className="modal-title">
              <i className="fa fa-envelope-open-text me-2 text-primary"></i>
              Message Details
            </h5>

            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body admin-modal-body">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Sender Name</label>

                <div className="form-control">{message.name}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email Address</label>

                <div className="form-control">{message.email}</div>
              </div>

              <div className="col-12">
                <label className="form-label">Subject</label>

                <div className="form-control">{message.subject}</div>
              </div>

              <div className="col-12">
                <label className="form-label">Message</label>

                <div
                  className="form-control"
                  style={{
                    minHeight: "180px",
                    whiteSpace: "pre-wrap",
                    overflowY: "auto",
                  }}
                >
                  {message.message}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer admin-modal-footer">
            <button className="btn btn-outline-light" onClick={onClose}>
              <i className="fa fa-times me-2"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageViewModal;
