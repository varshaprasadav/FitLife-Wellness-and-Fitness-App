// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import bg from "../assets/images/w.jpg";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-900">

//       <div
//         className="min-h-screen bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${bg})` }}
//       >
     
//         <Navbar />

//         <div className="relative flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-40 mt-20 md:mt-32">
          
//           {/* Heading: breaks downwards on small screens */}
//           <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ">
//             TRANSFORM YOUR BODY AND
//           </h1>

//           <h1 className="text-red-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 ">
//             MIND FOR LASTING SUCCESS
//           </h1>

//           <p className="text-white text-base sm:text-lg md:text-xl mt-4 font-serif max-w-xl">
//             Join our fitness programs and achieve your goals with expert trainers and personalized plans.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             <Link to="/signup">
//               <button className="bg-orange-500 text-white font-bold h-10 w-full sm:w-48 rounded-full">
//                 Register
//               </button>
//             </Link>

//             <Link to="/offlineclasses">
//               <button className="text-black bg-orange-500 font-bold h-10 w-full sm:w-48 rounded-full">
//                 Offline Classes
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Home;



import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bg from "../assets/images/w.jpg";

const Home = () => {
  return (

    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <Navbar />

      <div className="flex flex-col justify-center px-40 mt-80">

        <h1 className="text-white text-6xl font-bold">
          TRANSFORM YOUR BODY AND
        </h1>

        <h1 className="text-red-600 text-6xl font-bold mt-2">
          MIND FOR LASTING SUCCESS
        </h1>

        <p className="text-white text-xl mt-4 font-serif">
          Join our fitness programs and achieve your goals with expert trainers and personalized plans.
        </p>

        
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/signup">
              <button className="bg-orange-500 text-white font-bold h-10 w-full sm:w-48 rounded-full">
                Register
              </button>
            </Link>

            <Link to="/offlineclasses">
              <button className="text-black bg-orange-500 font-bold h-10 w-full sm:w-48 rounded-full">
                Offline Classes
              </button>
            </Link>
          </div>

      </div>

    </div>
  );
};

export default Home;