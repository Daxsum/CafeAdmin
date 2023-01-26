import React from "react";
import Axios  from "axios";
const DropDown = ({ typeId, setTypeId }) => {
  useEffect(() => {
    let config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    Axios.get("http://localhost:5000/api/products/getAll")
      .then(({ data }) => {
        console.log(data);
        setEmployees(data);
      })
      .catch();
  }, []);
  const handleEdit = (_id) => {
    const [employee] = employees.filter((employee) => employee._id === _id);
    console.log(employee);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };
  //
  return (
    <div className="p-20 flex flex-col space-y-10 bg-yellow-100">
      <div>
        <button className="peer px-5 py-2 bg-orange-600 hover:bg-orange-700 text-black">
          Type
        </button>

        <div
          className="hidden peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg"
        >
            {employees.length > 0 ? (
            employees.map((employee, i) => (
          <a className="px-5 py-3 hover:bg-gray-200" href="#">
            About Us
          </a>
          <a className="px-5 py-3 hover:bg-gray-200" href="#">
            Contact Us
          </a>
          <a className="px-5 py-3 hover:bg-gray-200" href="#">
            Privacy Policy
          </a>)))}
             
        </div>
      </div>
    </div>
  );
};

export default DropDown;
