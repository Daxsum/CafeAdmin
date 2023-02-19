import React, { useState } from "react";
import swal from "sweetalert";
import Axios from "axios";
import { Card } from "@mantine/core";

function Edit({ orders, selectedProduct, setOrders, setIsEditing }) {
  const id = selectedProduct._id;

  const [isActive, setIsActive] = useState(false);
  const [productId, setProductId] = useState(selectedProduct.item._id);

  const handleUpdate = (e) => {
    e.preventDefault();

    // if (!id || !isActive) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Error!",
    //     text: "All fields are required.",
    //     showConfirmButton: true,
    //   });
    // }

    const order = {
      productId,
      isActive,
    };

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        orders.splice(i, 1, order);
        break;
      }
    }
    try {
      const orginalData = orders;
      let config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      };

      Axios.put(
        `${import.meta.env.VITE_API}/api/order/Update/${id}`,
        order,
        config
      );
      setOrders(orders);
      setIsEditing(false);
      swal(
        "Updated!",
        ` ${order.isActive}'s data has been deactivated.`,
        "success"
      );
    } catch (error) {
      swal("ops!", "something is wrong!", "error");
      setOrders(orginalData);
    }
  };

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <div
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  class="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  Void Order
                </h5>
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body relative p-4">
                are you sure you want to void this order? this change can not be
                back.
              </div>
              <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  type="button"
                  class="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  type="button"
                  class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Edit;
