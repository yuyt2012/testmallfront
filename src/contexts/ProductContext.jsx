// src/contexts/ProductContext.jsx
import React, { useState } from 'react';

const ProductContext = React.createContext();

// eslint-disable-next-line react/prop-types
export function ProductProvider({ children }) {
  const [orderProduct, setOrderProduct] = useState(null); // Manage the orderProduct state

  return (
      <ProductContext.Provider value={{ orderProduct, setOrderProduct }}>
        {children}
      </ProductContext.Provider>
  );
}

export default ProductContext;