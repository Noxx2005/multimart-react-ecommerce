import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { jwtDecode } from 'jwt-decode'; // Corrected import

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));

    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        const productData = {
          productId: productItem.id,
          productName: productItem.productName,
          price: productItem.price,
          quantity: 1,
        };

        fetch(`http://localhost:5081/api/Cart/add/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        })
        .then(response => response.json())
        .then(data => {
          if (data.message && data.message === "Item added to cart") {
            toast.success("Product has been added to cart!");
          } else {
            toast.error("Failed to add product to cart.");
          }
        })
        .catch(error => {
          toast.error("Error adding product to cart.");
        });
      } catch (error) {
        toast.error("Invalid token.");
      }
    } else {
      toast.error("No token found. Please log in.");
    }
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        src={productItem.imgUrl}
        alt={productItem.productName}
        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>${productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
