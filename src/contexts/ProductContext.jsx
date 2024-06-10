import React, { useState } from 'react';

const ProductContext = React.createContext()

// eslint-disable-next-line react/prop-types
export function ProductProvider({ children }) {
    const [orderProduct, setOrderProduct] = useState(null); // Manage the orderProduct state
    const [orderProducts, setOrderProducts] = useState([]); // Manage the orderProducts state
    const [orderQuantities, setOrderQuantities] = useState([]); // Manage the orderQuantities state

    return (
        <ProductContext.Provider value={{ orderProduct, setOrderProduct, orderProducts, setOrderProducts, orderQuantities, setOrderQuantities }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext;