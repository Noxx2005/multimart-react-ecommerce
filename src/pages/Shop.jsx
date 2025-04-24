import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const getRandomItems = (arr, count = 6) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Shop = () => {
  const [filterList, setFilterList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  useWindowScrollToTop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, typeRes] = await Promise.all([
          axios.get("http://localhost:5081/api/Product/all"),
          axios.get("http://localhost:5081/api/Product/GetProductTypes"),
        ]);

        const productData = productRes.data;
        const productTypes = typeRes.data;

        const processed = productData.map(item => {
          const type = productTypes.find(t => t.id === item.productTypeId);
          return {
            id: item.id,
            productName: item.name,
            imgUrl: item.imageUrl,
            category: type ? type.name : "Unknown",
            price: item.price,
          };
        });

        setAllProducts(processed);
        setFilterList(getRandomItems(processed));
      } catch (err) {
        console.error("Failed to fetch products or product types:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
