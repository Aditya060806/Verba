import React from "react";

const BrandLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <img
          src="/verba.png"
          alt="Verba Logo"
          className="w-14 h-14 object-contain"
          style={{ display: 'block' }}
        />
      </div>
      <span className="text-3xl font-heading font-bold text-neutral-900" style={{color: '#a48be0'}}>
        Verba
      </span>
    </div>
  );
};

export default BrandLogo;