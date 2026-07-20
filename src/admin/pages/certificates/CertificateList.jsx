import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import certificateService from "../../../services/certificateService";
import CertificateModal from "./CertificateModal";


function CertificateList() {
    const [showModal, setShowModal] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchCertificates();
    }, []);


    // Get Certificates
    const fetchCertificates = async () => {
        try {
            const response = await certificateService.getCertificates();
            setCertificates(response.data || []);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };


    // Delete Certificate
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Certificate?",
            text: "You won't be able to recover this certificate.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });

        if(!result.isConfirmed) return;

        try {
            setDeletingId(id);
            await certificateService.deleteCertificate(id);
            setCertificates((prev)=>
                prev.filter(
                    (certificate)=> certificate.id !== id
                )
            );
            Swal.fire({
                icon:"success",
                title:"Deleted!",
                text:"Certificate deleted successfully.",
                timer:1500,
                showConfirmButton:false,
            });
        } catch(error) {
            console.log(error);
            Swal.fire({
                icon:"error",
                title:"Oops...",
                text:"Unable to delete certificate.",
            });
        } finally {
            setDeletingId(null);
        }
    };

    if(loading){
        return (
            <div className="container-fluid pt-4 px-4">
                <h4 className="text-white">
                    Loading Certificates...
                </h4>
            </div>
        )
    }

    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-12">
                        <div className="bg-secondary rounded h-100 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="mb-0 text-white">
                                    Certificates
                                </h6>
                                <button
                                    className="btn btn-primary"
                                    onClick={()=>{
                                        setSelectedCertificate(null);
                                        setShowModal(true);
                                    }}
                                >
                                    <i className="fa fa-plus me-2"></i>
                                    Add Certificate
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Organization</th>
                                            <th>Issue Date</th>
                                            <th>URL</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        certificates.length > 0 ?
                                        certificates.map((certificate,index)=>(
                                            <tr key={certificate.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                {
                                                    certificate.certificate_image_url ?
                                                    <img
                                                        src={certificate.certificate_image_url}
                                                        width="60"
                                                        height="40"
                                                        style={{
                                                            objectFit:"cover"
                                                        }}
                                                        alt={certificate.title}
                                                    />
                                                    :
                                                    "No Image"
                                                }
                                                </td>
                                                <td>
                                                    {certificate.title}
                                                </td>
                                                <td>
                                                    {certificate.organization}
                                                </td>
                                                <td>
                                                    {certificate.issue_date}
                                                </td>
                                                <td>
                                                {
                                                    certificate.certificate_url ?
                                                    <a
                                                        href={certificate.certificate_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-sm btn-info"
                                                    >
                                                        View
                                                    </a>
                                                    :
                                                    "-"
                                                }
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={()=>{
                                                            setSelectedCertificate(certificate);
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        disabled={deletingId === certificate.id}
                                                        onClick={()=>handleDelete(certificate.id)}
                                                    >
                                                        {
                                                        deletingId === certificate.id
                                                        ?
                                                        "Deleting..."
                                                        :
                                                        "Delete"
                                                        }
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center"
                                            >
                                                No Certificates Found
                                            </td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <CertificateModal
                show={showModal}
                onClose={()=>{
                    setShowModal(false);
                    setSelectedCertificate(null);
                }}
                onSuccess={fetchCertificates}
                certificate={selectedCertificate}
            />
        </>

    );

}


export default CertificateList;