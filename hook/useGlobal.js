import { data } from "autoprefixer";
import axios from "axios";
import Router, { useRouter } from "next/router";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import PostModal from "../components/common/PostModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AlertSuccess from "../components/common/alert/Success";
import Swal from "sweetalert2";

//import Swal from "sweetalert2/dist/sweetalert2.js";
//import Swal from "sweetalert2/src/sweetalert2";

// sweet alert start
const ErrorData = {
  title: "Oops..",
  type: "error",
  text: "Something went wrong!",
  footer: "<a href>Why do I have this issue?</a>",
};

const WarningData = {
  title: "Are you sure?",
  type: "warning",
  text: "You won't be able to revert this!",
  footer: "",
};

const AssignedData = {
  title: "Are you want to assign yourself?",
  type: "warning",
  text: "You are assigned for this ticket",
  footer: "Assigned Ticket Status: Hold",
};

const SuccessData = {
  title: "Success",
  type: "success",
  text: "Your work has been saved.",
  footer: "",
};

// sweet alert end
const successToast = (message) => {
  toast.success(`${message}`, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: true,
  });
  // toast.success("🦄 Success Notification!", {
  //   position: toast.POSITION.TOP_CENTER,
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  // });
};
const updateToast = (message) => {
  toast.info(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.success(`${message}`, {
  //   position: toast.POSITION.TOP_CENTER,
  //   autoClose: true,
  // });
};
const deleteToast = (message) => {
  // toast.warn(`${message}`, {
  //   position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  // });
  toast(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  // toast.success(`${message}`, {
  //   position: toast.POSITION.TOP_CENTER,
  //   autoClose: true,
  // });
};

const errorToast = () => {
  toast.error(
    `🦄 An unexpected error occured while trying to show you the toast!`,
    //`${message}`,
    {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};
const useGlobal = () => {
  const axios = require("axios").default;
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState(false);
  const [categorydata, setCategory] = useState("");
  const [subservicedata, setSubservice] = useState("");
  const [therapistservicedata, setTherapistservice] = useState("");
  const [loginStatus, setLogin] = useState(true);
  // console.log("loginStatus from global", loginStatus);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const Swal = require("sweetalert2");
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  // set and get token
  const [token, setToken] = useState("");
  const [group_id, setGroupId] = useState("");
  const [assign_to_user, setAssignToUser] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const [patientId, setpatientId] = useState("");
  const [patientName, setpatientName] = useState("");
  const [patientEmail, setpatientEmail] = useState("");

  const [therapistId, settherapistId] = useState("");
  const [therapistName, settherapistName] = useState("");
  const [therapistEmail, settherapistEmail] = useState("");
  console.log("patient data", patientId, patientName, patientEmail);

  const postData = async (url, data) => {
    console.log(`postData:${url}  data: ${data}`);
    await axios
      .post(
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        response?.status === 200
          ? Swal.fire({
              title: "Successfully done!",
              text: `Create ${response.data?.data.id} Number Data ${response.data?.message}.`,
              icon: "success",
              timer: 2500,
              // button: "Aww yiss!",
            })
          : Swal.fire({
              title: "Error! Not save your data!!",
              text: `${response?.response?.data?.message}`,
              icon: "error",
              timer: 3000,
            });
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: `you are failed to delete data.`,
            icon: "error",
            timer: 3000,
          });
          // error.response?.status && errorToast();
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
  };

  const assignData = (url, data) => {
    console.log(`deleteUrl:${url}  token:${token}`);
    Swal.fire({
      title: "Do you want to assigned yourself?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      confirmButton: true,
      confirmButtonText: "Yes, Hold it!",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            url,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Successfully",
                text: `${response.data?.data.id} Number Ticket  Assign Successfully.`,
                icon: "success",
                timer: 3000,
                // "Deleted!",
                // "Your has been deleted successfully.",
                // "success"
              });
            } else {
              Swal.fire({
                title: "Error!! Failed to delete data",
                text: `${response?.message}. ${response.response?.data?.message}`,
                icon: "error",
                timer: 3000,
              });
            }
          });
      }

      // if (result.isConfirmed) {
      //   Swal.fire("Deleted!", "Your has been deleted successfully.", "success");
      //${response.data?.data.id} Number Data ${response.data?.message}
      // }
    });

    //deleteToast(`${response.data?.message}`);
  };

  const cancelData = (url, data) => {
    console.log(`deleteUrl:${url}  token:${token}`);
    Swal.fire({
      title: "Do you want to cancel?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      confirmButton: true,
      confirmButtonText: "Yes, Cancel it!",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            url,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Successfully",
                text: `${response.data?.data.id} Number Cancel  Successfully.`,
                icon: "success",
                timer: 3000,
                // "Deleted!",
                // "Your has been deleted successfully.",
                // "success"
              });
            } else {
              Swal.fire({
                title: "Error!! Failed to delete data",
                text: `${response?.message}. ${response.response?.data?.message}`,
                icon: "error",
                timer: 3000,
              });
            }
          });
      }

      // if (result.isConfirmed) {
      //   Swal.fire("Deleted!", "Your has been deleted successfully.", "success");
      //${response.data?.data.id} Number Data ${response.data?.message}
      // }
    });

    //deleteToast(`${response.data?.message}`);
  };
  //
  // const assignData = async (url, data) => {
  //   console.log(`postData:${url}  data: ${data}`);
  //   await axios
  //     .post(
  //       url,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "content-type": "multipart/form-data",
  //         },
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       response?.status === 200
  //         ? Swal.fire({
  //             title: "Successfully done!",
  //             // text: `Create ${response.data?.data.id} Number Data ${response.data?.message}`,
  //             text: `${response.data?.data.id} Number Ticket  Assign Successfully.`,
  //             icon: "success",
  //             timer: 2500,
  //             // button: "Aww yiss!",
  //           })
  //         : Swal.fire({
  //             title: "Error! Not save your data!!",
  //             text: `${response?.message}.`,
  //             icon: "error",
  //             timer: 3000,
  //           });
  //       // Swal.fire({
  //       //   position: "top-center",
  //       //   icon: "success",
  //       //   title: `Create ${response.data?.data.id} Number Data ${response.data?.message}`,
  //       //   showConfirmButton: false,
  //       //   timer: 1500,
  //       // });
  //       // successToast(
  //       //   `create ${response.data?.data.id} Number data ${response.data?.message}`
  //       // );
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         Swal.fire({
  //           title: "Error!",
  //           text: `you are failed to delete data.`,
  //           icon: "error",
  //           timer: 3000,
  //         });
  //         // error.response?.status && errorToast();
  //         // console.log(error.response.data);
  //         // console.log(error.response.status);
  //         // console.log(error.response.headers);
  //       }
  //     });
  // };
  // global update data
  const updateData = async (url, data) => {
    console.log(`updateData:${url}    token:${token}`);
    await axios
      .post(
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log("response", response);
        response?.status === 200
          ? Swal.fire({
              title: "Successfully Updated!",
              text: `Create ${response.data?.data.id} Number Data ${response.data?.message}`,
              icon: "success",
              timer: 3000,
              // button: "Aww yiss!",
            })
          : Swal.fire({
              title: "Error! Data Not Update!!!",
              text: `${response?.message}.`,
              icon: "error",
              timer: 3000,
            });

        // Swal.fire(
        //   "Successfully Done!",
        //   `${response.data?.data.id} Number ${response.data?.message}`,
        //   "success"
        // );

        // updateToast(
        //   `${response.data?.data.id} Number ${response.data?.message}`
        // );
      })
      .catch(function(error) {
        Swal.fire({
          title: "Error!",
          text: `Data Not Update!!!`,
          icon: "error",
          timer: 3000,
        });
        //alert(error);
        //  console.log(error);
        // errorToast();
      });
  };
  // global update data
  const updateTestData = async (url1, data1, url2, data2) => {
    console.log(`updateData:${(url1, data1, url2, data2)}    token:${token}`);
    await axios
      .all([
        axios.post(
          url1,
          data1,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          },
          {
            withCredentials: true,
          }
        ),
        axios.post(
          url2,
          data2,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "multipart/form-data",
            },
          },
          {
            withCredentials: true,
          }
        ),
      ])
      .then((response) => {
        // console.log("response", response);
        response?.status === 200
          ? Swal.fire({
              title: "Successfully Updated!",
              text: `Create ${response.data?.data.id} Number Data ${response.data?.message}`,
              icon: "success",
              timer: 3000,
              // button: "Aww yiss!",
            })
          : Swal.fire({
              title: "Error! Data Not Update!!!",
              text: `${response?.message}.`,
              icon: "error",
              timer: 3000,
            });

        // Swal.fire(
        //   "Successfully Done!",
        //   `${response.data?.data.id} Number ${response.data?.message}`,
        //   "success"
        // );

        // updateToast(
        //   `${response.data?.data.id} Number ${response.data?.message}`
        // );
      })
      .catch(function(error) {
        Swal.fire({
          title: "Error!",
          text: `Data Not Update!!!`,
          icon: "error",
          timer: 3000,
        });
        //alert(error);
        //  console.log(error);
        // errorToast();
      });
  };
  // Add a 401 response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //return Promise.reject(error);
      if (error.response?.status === 401) {
        // window.location.href = "/";
        // error.response?.status && errorToast();
        Swal.fire({
          title: "Error!",
          text: `you are failed to delete data.`,
          icon: "error",
          timer: 3000,
        });
      }
      return error;
    }
  );
  // global delete data
  const headers = {
    "Content-Type": "application/json",
    //Authorization: "JWT fefege...",
    Authorization: `Bearer ${token}`,
  };
  const deleteData = (url) => {
    console.log(`deleteUrl:${url}  token:${token}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            url,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: `Your have been deleted successfully.`,
                icon: "success",
                timer: 3000,
                // "Deleted!",
                // "Your has been deleted successfully.",
                // "success"
              });
            } else {
              Swal.fire({
                title: "Error!! Failed to delete data",
                text: `${response?.message}. ${response.response?.data?.message}`,
                icon: "error",
                timer: 3000,
              });
            }
          });
      }

      // if (result.isConfirmed) {
      //   Swal.fire("Deleted!", "Your has been deleted successfully.", "success");
      //${response.data?.data.id} Number Data ${response.data?.message}
      // }
    });

    //deleteToast(`${response.data?.message}`);
  };

  useEffect(() => {
    const items = localStorage.getItem("token");
    const group_id = localStorage.getItem("group_id");
    const assign_to_user = localStorage.getItem("assign_to_user");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const department = localStorage.getItem("department");
    const patientid = localStorage.getItem("patientId");
    const patientname = localStorage.getItem("patientName");
    const patientemail = localStorage.getItem("patientEmail");
    const therapistid = localStorage.getItem("therapistId");
    const therapistname = localStorage.getItem("therapistName");
    const therapistemail = localStorage.getItem("therapistEmail");
    if (items) {
      setToken(items);
      setGroupId(group_id);
      setAssignToUser(assign_to_user);
      setEmail(email);
      setName(name);
      setDepartment(department);
      setpatientId(patientid);
      setpatientName(patientname);
      setpatientEmail(patientemail);
      settherapistId(therapistid);
      settherapistName(therapistname);
      settherapistEmail(therapistemail);
    }
  }, [token, deleteData, updateData, postData]);
  // function deleteData(url) {
  //   console.log(
  //     `deleteUrl:${url}     token:Bearer ${localStorage.getItem("token")}`
  //   );
  //   fetch(
  //     url,

  //     {
  //       Method: "POST",
  //       Headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //         Accept: "application.json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       // Body: body,
  //       Cache: "default",
  //     },

  //     {
  //       withCredentials: true,
  //     }
  //   )
  //     .then(() => {
  //       console.log("deleteData succesfully");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  const Statustest = (status) => {
    if (status == "1") {
      return " Active";
    } else if (status == "2") {
      return "Inactive";
    } else if (status == "3") {
      return "Pending";
    } else if (status == "4") {
      return "Canceled";
    } else if (status == "5") {
      return "Deleted";
    } else {
      return " ";
    }
  };

  // group user   logout
  const logoutAction = async (url) => {
    //console.log(`postData:${url}  data: ${data}`);
    await axios
      .post(
        "https://misiapi.lamptechs.com/api/v1/admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.clear();
        response?.status === 200
          ? Swal.fire({
              title: "Logout Successfully done!",
              text: `${response.data?.message}`,
              icon: "success",
              timer: 2000,
            })
          : Swal.fire({
              title: "Error! Not Logout yet!!",
              text: `${response?.message}.`,
              icon: "error",
              timer: 3000,
            });
        // Router.push("/account/login");
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: `you are failed to delete data.`,
            icon: "error",
            timer: 3000,
          });
        }
      });
  };
  // patient  logout
  const PatientLogoutAction = async (url) => {
    //console.log(`postData:${url}  data: ${data}`);
    await axios
      .post(
        "https://misiapi.lamptechs.com/api/v1/patient/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.clear();
        response?.status === 200
          ? Swal.fire({
              title: "Logout Successfully done!",
              text: `${response.data?.message}`,
              icon: "success",
              timer: 2000,
            })
          : Swal.fire({
              title: "Error! Not Logout yet!!",
              text: `${response?.message}.`,
              icon: "error",
              timer: 3000,
            });
        // Router.push("/account/patient-login");
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: `you are failed to delete data.`,
            icon: "error",
            timer: 3000,
          });
        }
      });
  };
  // therapist logout
  const TherapistLogoutAction = async (url) => {
    //console.log(`postData:${url}  data: ${data}`);
    await axios
      .post(
        "https://misiapi.lamptechs.com/api/v1/therapist/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.clear();
        response?.status === 200
          ? Swal.fire({
              title: "Logout Successfully done!",
              text: `${response.data?.message}`,
              icon: "success",
              timer: 2000,
            })
          : Swal.fire({
              title: "Error! Not Logout yet!!",
              text: `${response?.message}.`,
              icon: "error",
              timer: 3000,
            });
        // Router.push("/account/patient-login");
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: `you are failed to delete data.`,
            icon: "error",
            timer: 3000,
          });
        }
      });
  };
  // apiPath Url
  const apiRootUrl = "https://misiapi.lamptechs.com";
  const apiEndpoint = {
    patientLogin: {
      list: "/api/v1/patient/login",
      login: "/api/v1/patient/login",
    },
    therapistLogin: {
      list: "/api/v1/therapist/login",
      login: "/api/v1/therapist/login",
    },
    adminLogin: {
      list: "/api/v1/admin/login",
      login: "/api/v1/admin/login",
    },
    service: {
      list: "/api/v1/service",
      create: "/api/v1/service/store",
      delete: "/api/v1/service/delete",
      edit: "",
    },
    subservice: {
      list: "/api/v1/subservice",
      create: "/api/v1/subservice/store",
      delete: "/api/v1/service/delete",
      edit: "",
    },
    therapist: {
      list: "/api/v1/therapist",
      create: "/api/v1/therapist/store",
      delete: "/api/v1/therapist/delete",
      edit: "",
    },
    therapistService: {
      list: "/api/v1/therapistService",
      create: "/api/v1/therapistService/store",
      delete: "/api/v1/therapistService/delete",
      edit: "",
    },

    therapist_type: {
      list: "/api/v1/therapist_type",
      create: "/api/v1/therapist_type/store",
      delete: "/api/v1/therapist_type/delete",
      edit: "",
    },

    patient: {
      list: "/api/v1/patient",
      create: "/api/v1/patient/store",
      delete: "/api/v1/patient/delete",
      edit: "",
    },

    ticket: {
      list: "/api/v1/ticket",
      create: "/api/v1/ticket/store",
      delete: "/api/v1/ticket/delete",
      edit: "/api/v1/ticket/update",
    },
    therapist_degree: {
      list: "/api/v1/therapist_degree",
      create: "/api/v1/therapist_degree/store",
      delete: "api/v1/therapist_degree/delete",
      edit: "",
    },
    appointment: {
      list: "/api/v1/appointment",
      create: "/api/v1/appointment/store",
      delete: "/api/v1/appointment/delete",
      edit: "",
    },
    blood_group: {
      list: "/api/v1/blood_group",
      create: "/api/v1/blood_group/store",
      delete: "/api/v1/blood_group/delete",
      edit: "",
    },
    ticket_department: {
      list: "/api/v1/ticket_department",
      create: "/api/v1/ticket_department/store",
      delete: "/api/v1/ticket_department/delete",
      edit: "",
    },
    state: {
      list: "/api/v1/state",
      create: "/api/v1/state/store",
      delete: "/api/v1/state/delete",
      edit: "",
    },

    occupation: {
      list: "/api/v1/occupation",
      create: "/api/v1/occupation/store",
      delete: "/api/v1/occupation/delete",
      edit: "",
    },
  };

  return {
    headers,
    categorydata,
    setCategory,
    subservicedata,
    setSubservice,
    therapistservicedata,
    setTherapistservice,
    postData,
    assignData,
    cancelData,
    logoutAction,
    PatientLogoutAction,
    TherapistLogoutAction,
    token,
    group_id,
    assign_to_user,
    name,
    email,
    department,
    patientId,
    patientName,
    patientEmail,
    therapistId,
    therapistName,
    therapistEmail,
    apiRootUrl,
    apiEndpoint,
    //logout,
    loginStatus,
    setLogin,
    successToast,
    deleteData,
    updateData,
    updateTestData,
    Statustest,
    status,
  };
};

export default useGlobal;

// const myPromise = new Promise((resolve) =>
//     fetch("https://jsonplaceholder.typicode.com/post")
//       .then((response) => response.json())
//       .then((json) => setTimeout(() => resolve(json), 3000))
//   );

//   useEffect(() => {
//     toast.promise(myPromise, {
//       pending: "Promise is pending",
//       success: "Promise  Loaded",
//       error: "error"
//     });
//   }, []);
