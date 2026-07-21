function MessageViewModal({ show, onClose, message }) {

    if (!show || !message) return null;

    return (

        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content bg-secondary text-white">

                    <div className="modal-header">

                        <h5>Message Details</h5>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <p>
                            <strong>Name:</strong> {message.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {message.email}
                        </p>

                        <p>
                            <strong>Subject:</strong> {message.subject}
                        </p>

                        <hr />

                        <p>{message.message}</p>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default MessageViewModal;