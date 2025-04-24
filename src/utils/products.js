// products.js

// Commented out imported images
// import productImg01 from "../Images/double-sofa-01.png";
// import productImg02 from "../Images/double-sofa-02.png";
// import productImg03 from "../Images/double-sofa-03.png";
// import productImg04 from "../Images/single-sofa-01.jpg";
// import productImg05 from "../Images/single-sofa-02.jpg";
// import productImg06 from "../Images/single-sofa-03.jpg";
// import productImg07 from "../Images/arm-chair-01.jpg";
// import productImg08 from "../Images/arm-chair-02.jpg";
// import productImg09 from "../Images/arm-chair-03.jpg";
// import phone03 from "../Images/phone-03.png";
// import phone04 from "../Images/phone-04.jpg";
import phone08 from "../Images/phone-08.png";
import wireless01 from "../Images/wireless-01.png";
import sofaSlide from "../Images/hero-img.png";
import watchSlide from "../Images/watch-07.png";

export const SliderData = [
  {
      id: 1,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: sofaSlide,  // Keep the existing images or fetch dynamically
  },
  {
      id: 2,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: phone08,
  },
  {
      id: 3,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: wireless01,
  },
  {
      id: 4,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: watchSlide,
  },
];

export const serviceData = [
  {
    icon: <ion-icon name="car"></ion-icon>,
    title: "Free Shipping",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#fdefe6",
  },
  {
    icon: <ion-icon name="card"></ion-icon>,
    title: "Safe Payment",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#ceebe9",
  },
  {
    icon: <ion-icon name="shield-half-outline"></ion-icon>,
    title: "Secure Payment",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#e2f2b2",
  },
  {
    icon: <ion-icon name="headset"></ion-icon>,
    title: "Back Guarantee",
    subtitle: "Lorem ipsum dolor sit amet.",
    bg: "#d6e5fb",
  },
];


export const products = [];

Promise.all([
  fetch('http://localhost:5081/api/Product/all').then(res => res.json()),
  fetch('http://localhost:5081/api/Product/GetProductTypes').then(res => res.json())
])
  .then(([productData, productTypes]) => {
    productData.forEach(item => {
      const productType = productTypes.find(type => type.id === item.productTypeId);

      products.push({
        id: item.id,
        productName: item.name,
        imgUrl: item.imageUrl,  // Use the image URL from the fetched product data
        category: productType ? productType.name : 'Unknown',  // Assign product type
        price: item.price,
      });
    });

    console.log("Loaded Products with Type Names:", products);
  })
  .catch(error => {
    console.error('Error loading product or type data:', error);
  });

// Example of discounted products using dynamic API data
export const discoutProducts = [
  {
    id: "01",
    productName: "Stone and Beam Westview",
    imgUrl: "http://localhost:5081/api/Product/Images/stone-beam-westview.jpg", // Use dynamic image URL
    category: "sofa",
    price: 193,
    discount: 30,
    shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident!",
    reviews: [
      {
        rating: 4.7,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.5,
  },
  {
    id: "02",
    productName: "Rivet Bigelow Modern",
    imgUrl: "http://localhost:5081/api/Product/Images/rivet-bigelow-modern.jpg", // Use dynamic image URL
    category: "sofa",
    price: 253,
    discount: 20,
    shortDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure quas illo voluptates labore tempore!",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident!",
    reviews: [
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        rating: 4.8,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
    ],
    avgRating: 4.7,
  },
  // Additional products can be added here...
];
