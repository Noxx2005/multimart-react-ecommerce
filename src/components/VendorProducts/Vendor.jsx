import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "./vendor.css";
import VendorProfile from "../Profile/VendorProfile";
import AddProductModal from "../AddProductModal";

const Vendor = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 6;

  const fetchProducts = () => {
    fetch("http://localhost:5081/api/Product/all")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilterList(data);
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterList.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="main-layout">
      <div className="left-pane">
        <VendorProfile onAddClick={() => setShowModal(true)} />
      </div>

      <div className="right-pane">
        <SearchBar
          setFilterList={(filtered) => {
            setFilterList(filtered);
            setCurrentPage(1);
          }}
          allProducts={allProducts}
        />

        <div className="vendor-container">
          {currentItems.map((product) => (
            <div key={product.id} className="card">
              <img src={product.imageUrl} alt={product.name} className="product-img" />
              <div className="icons">
                <i className="fi fi-rr-heart"></i>
                <i className="fi fi-rr-eye"></i>
                <i className="fi fi-rr-shopping-cart"></i>
              </div>
              <p className="company">Vendor {product.vendorId}</p>
              <p className="product-name">{product.name}</p>
              <div className="rating">⭐ ⭐ ⭐ ⭐ ☆</div>
              <div className="price-section">
                <span className="price">${product.price}</span>
              </div>
              <div className="sold">{product.stock} in stock</div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
};

export default Vendor;
