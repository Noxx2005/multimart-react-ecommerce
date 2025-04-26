import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, deleteProduct } from "../app/features/cart/cartSlice";
import { jwtDecode } from "jwt-decode";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const token = sessionStorage.getItem("token");
  let userId = null;
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (error) {
      console.error("Invalid token");
    }
  }

  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items when the component loads
  useEffect(() => {
    if (token && userId) {
      const fetchCartItems = () => {
        fetch(`http://localhost:5081/api/Cart/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setCartItems(data);  // Store cart data including cartItemId
          })
          .catch((error) => {
            console.error("Error fetching cart items:", error);
          });
      };

      fetchCartItems();
    }
  }, [userId, token]);  // Add necessary dependencies

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, num: 1 }));

    if (token && userId) {
      const productData = {
        productId: product.id,
        productName: product.productName,
        price: product.price,
        quantity: 1,
      };
      fetch(`http://localhost:5081/api/Cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })
      .catch(error => {
        console.error("Error adding product to cart:", error);
      });
    }
  };

  // Handle decreasing quantity
  const handleDecreaseQty = (product) => {
    const cartItem = cartItems.find(item => item.productId === product.id);

    if (!cartItem) {
      console.error("Cart item not found");
      return;
    }

    dispatch(decreaseQty(product));

    if (token && userId) {
      if (cartItem.qty === 1) {
        handleDeleteProduct(product);
      } else {
        decrementProductQuantity(cartItem.id);
      }
    }
  };

  // Decrement the quantity via API
  const decrementProductQuantity = (cartItemId) => {
    fetch(`http://localhost:5081/api/Cart/cart/decrement/${cartItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to decrement product quantity");
      }
    })
    .catch((error) => {
      console.error("Error decrementing product quantity:", error);
    });
  };

  // Handle deleting product
  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product));

    if (token && userId) {
      fetch(`http://localhost:5081/api/Cart/remove/${userId}`, {
        method: "DELETE ",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id }),
      })
      .catch(error => {
        console.error("Error deleting product from cart:", error);
      });
    }
  };

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => handleAddToCart(item)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => handleDecreaseQty(item)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => handleDeleteProduct(item)}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}.00</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
