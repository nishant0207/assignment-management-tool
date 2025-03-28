import React from "react";

const Unauthorized = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold text-red-600">Unauthorized Access</h2>
      <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;