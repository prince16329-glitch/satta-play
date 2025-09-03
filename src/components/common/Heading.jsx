import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="bg-gradient w-full text-center pt-24 pb-4 px-3">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-20 sm:mt-10 uppercase">{title}</h1>
    </div>
  );
};

export default Heading;
