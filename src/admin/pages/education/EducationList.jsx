import { useEffect, useState } from "react";

import educationService from "../../../services/educationService";

import EducationModal from "./EducationModal";

import Swal from "sweetalert2";


function EducationList() {

  const [educations, setEducations] = useState([]);

  const [loading, setLoading] = useState(true);


  const [showModal, setShowModal] = useState(false);

  const [editEducation, setEditEducation] = useState(null);



  useEffect(() => {

    fetchEducations();

  }, []);



  const fetchEducations = async () => {

    try {

      const response = await educationService.getEducations();

      setEducations(response.data || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };




  const handleEdit = (education) => {

    setEditEducation(education);

    setShowModal(true);

  };





  const handleDelete = async (id) => {


    const result = await Swal.fire({

      title: "Are you sure?",

      text: "You won't be able to revert this!",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#3085d6",

      cancelButtonColor: "#d33",

      confirmButtonText: "Yes, delete it!"

    });



    if (!result.isConfirmed) {

      return;

    }



    try {


      await educationService.deleteEducation(id);



      setEducations((prev) =>

        prev.filter((education) => education.id !== id)

      );



      Swal.fire({

        icon: "success",

        title: "Deleted!",

        text: "Education deleted successfully.",

        timer: 1500,

        showConfirmButton: false,

      });



    } catch (error) {


      console.log(error);


      Swal.fire({

        icon: "error",

        title: "Oops...",

        text: "Delete failed!",

      });


    }

  };






  if (loading) {

    return (

      <div className="container-fluid pt-4 px-4">

        <h4 className="text-white">
          Loading Educations...
        </h4>

      </div>

    );

  }





  return (

    <>


      <div className="container-fluid pt-4 px-4">

        <div className="row g-4">


          <div className="col-12">


            <div className="bg-secondary rounded h-100 p-4">


              <div className="d-flex justify-content-between align-items-center mb-4">


                <h5 className="text-white mb-0">

                  Educations

                </h5>



                <button

                  className="btn btn-primary"

                  onClick={() => {

                    setEditEducation(null);

                    setShowModal(true);

                  }}

                >

                  <i className="fa fa-plus me-2"></i>

                  Add Education

                </button>


              </div>





              <div className="table-responsive">


                <table className="table table-dark table-hover align-middle">


                  <thead>


                    <tr>

                      <th>#</th>

                      <th>Institution</th>

                      <th>Degree</th>

                      <th>Field</th>

                      <th>Grade</th>

                      <th>Year</th>

                      <th width="180">
                        Actions
                      </th>

                    </tr>


                  </thead>





                  <tbody>


                    {educations.length > 0 ? (


                      educations.map((education, index) => (


                        <tr key={education.id}>


                          <td>
                            {index + 1}
                          </td>


                          <td>
                            {education.institution}
                          </td>


                          <td>
                            {education.degree}
                          </td>


                          <td>
                            {education.field_of_study}
                          </td>


                          <td>
                            {education.grade}
                          </td>


                          <td>

                            {education.start_year}

                            {" - "}

                            {education.end_year}

                          </td>



                          <td>


                            <button

                              className="btn btn-warning btn-sm me-2"

                              onClick={() => handleEdit(education)}

                            >

                              Edit

                            </button>





                            <button

                              className="btn btn-danger btn-sm"

                              onClick={() => handleDelete(education.id)}

                            >

                              Delete

                            </button>



                          </td>


                        </tr>


                      ))


                    ) : (


                      <tr>


                        <td

                          colSpan="7"

                          className="text-center"

                        >

                          No Education Found


                        </td>


                      </tr>


                    )}



                  </tbody>



                </table>



              </div>




            </div>



          </div>



        </div>



      </div>





      <EducationModal

        show={showModal}

        onClose={() => setShowModal(false)}

        onSuccess={fetchEducations}

        education={editEducation}

      />



    </>

  );

}


export default EducationList;