import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import "../styles/SingleProductPage.css";

function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-product-page">
      <div className="product-image">
        <img src={product.imageURL} alt={product.productName} />
      </div>
      <div className="product-details">
        <h2>{product.productName}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div className="product-buttons">
          <button className="buy-now">Buy Now</button>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
