import { useEffect, useState } from "react";
import messageService from "../../../services/messageService";
import MessageViewModal from "./MessageViewModal";
import Swal from "sweetalert2";

function MessageList() {

    const [messages, setMessages] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    const fetchMessages = async (currentPage = 1) => {
        try {

            const response = await messageService.getMessages(currentPage);

            setMessages(response.data.data);

            setPagination(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleView = async (id) => {

        const response = await messageService.getMessage(id);

        setSelectedMessage(response.data);

        setShowModal(true);

        fetchMessages(page);

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Delete Message?",
            icon: "warning",
            showCancelButton: true,
        });

        if (!result.isConfirmed) return;

        await messageService.deleteMessage(id);

        Swal.fire("Deleted!", "", "success");

        fetchMessages(page);

    };

    return (
        <>
            <div className="container-fluid pt-4">

                <div className="bg-secondary rounded p-4">

                    <h4 className="mb-4">Messages</h4>

                    <table className="table table-dark">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th width="180">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {messages.map((message) => (

                                <tr key={message.id}>

                                    <td>{message.name}</td>

                                    <td>{message.email}</td>

                                    <td>{message.subject}</td>

                                    <td>

                                        {message.is_read ? (
                                            <span className="badge bg-success">
                                                Read
                                            </span>
                                        ) : (
                                            <span className="badge bg-warning">
                                                Unread
                                            </span>
                                        )}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => handleView(message.id)}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(message.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <div className="mt-3">

                        <button
                            className="btn btn-primary me-2"
                            disabled={!pagination.prev_page_url}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <button
                            className="btn btn-primary"
                            disabled={!pagination.next_page_url}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

            <MessageViewModal
                show={showModal}
                onClose={() => setShowModal(false)}
                message={selectedMessage}
            />

        </>
    );
}

export default MessageList;