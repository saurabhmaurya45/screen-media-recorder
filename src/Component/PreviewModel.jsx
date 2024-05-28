import React from 'react';

const PreviewModel = ({ mediaUrl, isModalOpen, handleCloseModal, downloadHandler }) => {

  return (
    <div>
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className=" overflow-y-auto overflow-x-hidden w-auto fixed top-10 right-0 left-0 z-[9999] justify-center items-center  md:inset-0  "
        >
          <div className="relative p-4 top-10 w-auto">
            <div className="relative bg-white rounded-lg shadow-lg w-auto ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t ">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4 flex items-center justify-center ">
                {mediaUrl && <video src={mediaUrl} autoPlay loop controls className='w-auto h-[15rem] md:h-[27rem]' />}
              </div>

              <div className="flex items-center justify-center p-2 md:p-3 border-t border-gray-200 rounded-b ">
                <button
                  onClick={downloadHandler}
                  className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center font-bold"
                  type="button"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewModel;
