// loading spinning

// import React from 'react';
// import Logo from '../../public/Satu_Sehat.webp'

// const Loading = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="flex flex-col items-center">
//         <img
//           className="animate-spin h-12 w-12 rounded-full mb-4"
//           src={Logo}
//           alt="Loading"
//         />
//         <p className="text-teal-500 text-lg font-semibold">Loading...</p>
//       </div>
//     </div>
//   );
// };

// export default Loading;

import React from 'react';
import Logo from '../../public/Satu_Sehat.webp'
import './loading.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <img
          className="zoom-animation h-12 w-12 rounded-full mb-4"
          src={Logo}
          alt="Loading"
        />
        <p className="text-teal-500 text-lg font-semibold loading-animation">Loading<span className="loading-dots">...</span></p>
      </div>
    </div>
  );
};

export default Loading;
