import React from "react";
const DropDown = () => {
  return (
    <div className="p-20 flex flex-col space-y-10 bg-yellow-100">
      <div>
        <button className="peer px-5 py-2 bg-green-600 hover:bg-green-700 text-white">
          Type
        </button>

        <div
          className="hidden peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg"
        >
          <a className="px-5 py-3 hover:bg-gray-200" href="#">
            About Us
          </a>
          <a className="px-5 py-3 hover:bg-gray-200" href="#">
            Contact Us
          </a>
          <a className="px-5 py-3 hover:bg-gray-200" href="#">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
