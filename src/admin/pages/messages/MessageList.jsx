import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import messageService from "../../../services/messageService";
import MessageViewModal from "./MessageViewModal";

function MessageList() {

    const [messages, setMessages] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState(null);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMessages(page);
    }, [page]);

    const fetchMessages = async (currentPage = 1) => {

        try {

            setLoading(true);

            const response =
                await messageService.getMessages(currentPage);

            setMessages(response.data.data);

            setPagination(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleView = async (id) => {

        try {

            const response =
                await messageService.getMessage(id);

            setSelectedMessage(response.data);

            setShowModal(true);

            fetchMessages(page);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Message?",

            text: "This message will be permanently removed.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Yes, Delete",

            cancelButtonText: "Cancel",

        });

        if (!result.isConfirmed) return;

        try {

            setDeletingId(id);

            await messageService.deleteMessage(id);

            setMessages((prev) =>
                prev.filter((item) => item.id !== id)
            );

            Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "Message deleted successfully.",

                timer: 1500,

                showConfirmButton: false,

            });

        } catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Oops...",

                text: "Unable to delete message.",

            });

        } finally {

            setDeletingId(null);

        }

    };

    if (loading) {

        return (

            <div className="container-fluid pt-4 px-4">

                <div className="message-loading">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <h5 className="mt-3 mb-1">
                        Loading Messages...
                    </h5>

                    <p className="text-muted mb-0">
                        Fetching latest contact messages.
                    </p>

                </div>

            </div>

        );

    }

    return (
        <>
            <div className="container-fluid pt-4">

                <div className="message-card">

                    <div className="message-header">

                        <div>

                            <h4 className="mb-2 Admin-gradient">
                                <i className="fa fa-envelope me-2 text-primary-icon"></i>
                                Contact Messages
                            </h4>

                            <p className="message-subtitle">
                                View and manage messages received from your portfolio.
                            </p>

                        </div>

                    </div>

                    <table className="table admin-table align-middle">

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

                        {
                            messages.length > 0 ?

                                messages.map((message) => (

                                    <tr key={message.id}>

                                        <td>

                                            <div className="fw-semibold">
                                                {message.name}
                                            </div>

                                        </td>

                                        <td>

                                            <span className="text-muted">
                                                {message.email}
                                            </span>

                                        </td>

                                        <td>

                                            <div
                                                className="text-truncate"
                                                style={{ maxWidth: "250px" }}
                                            >
                                                {message.subject}
                                            </div>

                                        </td>

                                        <td>

                                            {
                                                message.is_read ?

                                                    <span className="badge bg-success">
                                                        Read
                                                    </span>

                                                    :

                                                    <span className="badge bg-warning text-dark">
                                                        Unread
                                                    </span>

                                            }

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-info btn-sm me-2"
                                                onClick={() => handleView(message.id)}
                                            >
                                                <i className="fa fa-eye me-1"></i>
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                disabled={deletingId === message.id}
                                                onClick={() => handleDelete(message.id)}
                                            >

                                                {
                                                    deletingId === message.id ?

                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-1"></span>
                                                            Deleting...
                                                        </>

                                                        :

                                                        <>
                                                            <i className="fa fa-trash me-1"></i>
                                                        </>

                                                }

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-5"
                                    >

                                        <i className="fa fa-envelope-open-text fa-3x text-muted mb-3 d-block"></i>

                                        <h5 className="mb-2">
                                            No Messages Found
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Contact form messages will appear here.
                                        </p>

                                    </td>

                                </tr>

                        }

                        </tbody>

                    </table>
                    <div className="message-pagination">

                        <button
                            className="btn btn-outline-primary global-add-button"
                            disabled={!pagination.prev_page_url}
                            onClick={() => setPage(page - 1)}
                        >
                            <i className="fa fa-chevron-left me-2"></i>
                            Previous
                        </button>

                        <div className="message-page-info">

                            Page

                            <span className="mx-2 fw-bold">

                                {pagination.current_page || page}

                            </span>

                            of

                            <span className="mx-2 fw-bold">

                                {pagination.last_page || 1}

                            </span>

                        </div>

                        <button
                            className="btn btn-outline-primary global-add-button"
                            disabled={!pagination.next_page_url}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                            <i className="fa fa-chevron-right ms-2"></i>
                        </button>

                    </div>

                </div>

            </div>

            <MessageViewModal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedMessage(null);
                }}
                message={selectedMessage}
            />

        </>
    );
}

export default MessageList;