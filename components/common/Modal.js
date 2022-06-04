/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    // details: yup.string().required(),
    remarks: yup.string().required(),
    status: yup.string().required(),
  })
  .required();
const Modal = ({ modal, setModal }) => {
  const { postData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  useEffect(() => {
    if (!modal) {
      setSelectedImage();
    }
  }, [modal]);
  //console.log('modal modal', modal)
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        {/* <div className="flex-row space-y-3 relative">
            <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
                <p>Category</p>
            </div>
            <div className="flex justify-between">
                <label className="font-semibold pr-2">Name</label>
                <input className="border-2 border-purple-600/50 w-[75%] " type="text" />
            </div>
            <div className="flex justify-between">
                <label className="font-semibold pr-2">Category</label>
                <select className="border-2 border-purple-600/50 w-[75%] " type="text">
                    <option value="">Choose any Category</option>
                    <option value="">Option One</option>
                    <option value="">Option Two</option>
                    <option value="">Option Three</option>
                </select>
            </div>
            
            <div className="flex-row justify-between">
                <label className="font-semibold pr-2">Picture</label>
                <input 
                    className="border-2" 
                    type="file" 
                    accept="image/*"
                    name="user[image]" 
                    multiple={true}
                    onChange={imageChange}
                />
               <div className="flex overflow-auto my-2 p-2">
               {
                 selectedImage && [...selectedImage].map((file, index)=><img key={index} src={URL.createObjectURL(file)}  className="w-32 h-32 mr-1 rounded-sm border-4"/>)
                }
                
               </div>

               {selectedImage && 
                <button onClick={removeSelectedImage}  className='bg-orange-400 p-2 rounded-md text-white'>
                    Remove This Image
                </button>
               }
               

            </div>
            <div className="flex justify-between">
                <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Submit</button>
            </div>
        </div> */}
        <form
          className="w-full     m-auto max-w-sm my-3 p-2 bg-white border-0   "
          onSubmit={handleSubmit((d) =>
            postData("https://misiapi.lamptechs.com/api/service/store", d)
          )}
          type="submit"
        >
          <div className="md:flex md:items-center mb-6 p-2">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                {...register("name")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          {/* <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Details
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            {...register("details")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Jane Doe"
          />
        </div>
      </div> */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Reamrks
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                {...register("remarks")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Status
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                id="status"
                className="form-select appearance-none
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding bg-no-repeat
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                {...register("status")}
              >
                <option selected>status</option>
                <option value="A" selected>
                  active
                </option>
                <option value="I">inactive</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </PureModal>
      ;
    </>
  );
};

export default Modal;
