import phone08 from "../Images/phone-08.png";
import wireless01 from "../Images/wireless-01.png";
import sofaSlide from "../Images/hero-img.png";
import watchSlide from "../Images/watch-07.png";

export const SliderData = [
  {
    id: 1,
    title: "50% Off For Your First Shopping",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
    cover: sofaSlide,
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

export const products = []; // products array will be populated below

// 🔥 Load products dynamically from API
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
      imgUrl: `http://localhost:5081/api/Product/image/${item.id}`, // 💥 Dynamic Image URL
      category: productType ? productType.name : 'Unknown',
      price: item.price,
    });
  });

  console.log("Loaded Products with Type Names:", products);
})
.catch(error => {
  console.error('Error loading product or type data:', error);
});
