import React, { useEffect, useState } from "react";
import "./addproductmodal.css";

const AddProductModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    isAvailable: true,
    productTypeId: 0,
    imageUrl: ""
  });

  const [productTypes, setProductTypes] = useState([]);
  const [showTypePopup, setShowTypePopup] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const fetchProductTypes = () => {
    fetch("http://localhost:5081/api/Product/GetProductTypes")
      .then((res) => res.json())
      .then((data) => setProductTypes(data))
      .catch((err) => console.error("Product type fetch error:", err));
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "productTypeId" && value === "add") {
      setShowTypePopup(true);
      return;
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5081/api/Product/vendor/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleAddType = async () => {
    if (!newTypeName.trim()) return;

    try {
      const res = await fetch("http://localhost:5081/api/Product/AddType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTypeName), // ✅ just the string
      });      

      if (res.ok) {
        setNewTypeName("");
        setShowTypePopup(false);
        fetchProductTypes();
      } else {
        console.error("Failed to add new product type");
      }
    } catch (err) {
      console.error("Error adding type:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
          <input name="imageUrl" placeholder="Image URL" onChange={handleChange} required />

          <select
            name="productTypeId"
            value={form.productTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product Type</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
            <option value="add">➕ Add New Type</option>
          </select>

          <label>
            <input
              name="isAvailable"
              type="checkbox"
              checked={form.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose} className="close-btn">Cancel</button>
        </form>
      </div>

      {/* Mini popup for adding type */}
      {showTypePopup && (
        <div className="type-popup">
          <div className="type-popup-content">
            <h4>Add New Product Type</h4>
            <input
              type="text"
              placeholder="Type Name"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={handleAddType}>Add</button>
              <button onClick={() => setShowTypePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductModal;
