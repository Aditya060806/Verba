import React from "react";
import { Link } from "react-router-dom";

const BrandLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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
    </Link>
  );
};

export default BrandLogo;