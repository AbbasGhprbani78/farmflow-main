import { useState, useEffect } from "react";
import "../../Style//ModalEdit.css";

export default function ModalEdit() {
  const [isSave, setIsSave] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <>
      <div
        className={`modal-edit-container ${
          showEditModal ? "activeModal" : ""
        }}`}
      >
        <form className="modal-edit-form" onSubmit={handleSumbit}>
          <div className="product-input-wrapper">
            <label className="label-edit" htmlFor="">
              choose your product
            </label>
            <select className="selectproduct product-drop">
              <option value="product" selected disabled>
                product
              </option>
            </select>
          </div>
          <div className="product-input-wrapper">
            <label className="label-edit" htmlFor="">
              choose your land
            </label>

            <select className="selectproduct land-drop">
              <option value="land" selected disabled>
                land
              </option>
            </select>
          </div>
          <div className="product-input-wrapper">
            <label className="label-edit" htmlFor="">
              date
            </label>

            <input className="product-date-input" type="date" />
          </div>
          <div className="product-input-wrapper">
            <label className="label-edit" htmlFor="">
              description
            </label>
            <textarea className="product-description"></textarea>
          </div>
          <div className="edit-product-btns">
            <button className="product-btn edit-btn-product" type="submit">
              {isSave ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="product-btn cancel-btn-product"
            >
              cancel
            </button>
          </div>
        </form>
      </div>

    </>
  );
}
