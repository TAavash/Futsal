// import React from "react";
// import CardComponent from "../CardComponent/CardComponent";

// const HomeComponent = () => {
//   const beautyProduct = [
//     {
//       imgUrl:
//         "https://plus.unsplash.com/premium_photo-1680012589533-9ba597be37b1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "The Coldest Sunset",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
//     },
//     {
//       imgUrl:
//         "https://plus.unsplash.com/premium_photo-1705554519595-c1143c7fef97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "The Coolest Dress",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
//     },
//     {
//       imgUrl:
//         "https://plus.unsplash.com/premium_photo-1680012589533-9ba597be37b1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "The Coldest Sunset",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
//     },
//     {
//       imgUrl:
//         "https://plus.unsplash.com/premium_photo-1705554519595-c1143c7fef97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       title: "The Coolest Dress",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
//     },
//   ];
//   return (
//     <>
//       {/* <CardComponent productData={beautyProduct} /> */}
//       <div className="">
//         <div className="w-full h-60 flex flex-col justify-center items-center bg-[#00df9a]">
//           <input placeholder="Search" type="text" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomeComponent;

import React from "react";
import HeroSection from "./HeroSection";
import CourtCard from "../Court/CourtCard";

function HomeComponent() {
  return (
    <div className="bg-green-500 min-h-screen">
      <HeroSection />
      <CourtCard />
    </div>
  );
}

export default HomeComponent;
