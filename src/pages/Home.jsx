import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products as initialProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const [newArrivalData, setNewArrivalData] = useState([]);
  useWindowScrollToTop();

  useEffect(() => {
    const checkProducts = () => {
      if (initialProducts.length > 0) {
        const latestSix = initialProducts.slice(-6); // Get the last 6 items
        setNewArrivalData(latestSix);
      } else {
        setTimeout(checkProducts, 100);
      }
    };
    checkProducts();
  }, []);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
    </Fragment>
  );
};

export default Home;
