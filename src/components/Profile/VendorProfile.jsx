import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./vendorprofile.css";

const VendorProfile = ({ onAddClick }) => {
  const [vendor, setVendor] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetch("http://localhost:5081/api/Vendor/profile/1")
      .then((res) => res.json())
      .then((data) => setVendor(data))
      .catch((err) => console.error("Vendor Fetch Error:", err));

    fetch("http://localhost:5081/api/Product/all")
      .then((res) => res.json())
      .then((products) => setTotalProducts(products.length))
      .catch((err) => console.error("Product Fetch Error:", err));
  }, []);

  const handleLogout = () => {
    // Clear any session or local storage (if necessary)
    sessionStorage.clear(); // Example, if you're using session storage for authentication

    // Navigate to the homepage
    navigate("/");
  };

  if (!vendor) return <div>Loading vendor info...</div>;

  return (
    <div className="vendor-profile">
      <div className="profile-image" />

      <h2 className="shop-name">Nigalisuos</h2>
      <p className="shop-desc">A <em>fashionable</em> shop</p>

      <div className="info-section">
        <p><strong>Total Products</strong><br />{totalProducts}</p>
        <p><strong>Shop Ratings</strong><br />Good</p>
        <p><strong>Date</strong><br />16-04-2025</p>
      </div>

      <button className="edit-btn" onClick={onAddClick}>Add Product</button>
      <button className="logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default VendorProfile;
