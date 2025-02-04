
'use client';

import {itemType} from "../types/typesImport";
import Link from "next/link";

export default function ProductList({ products }: { products: itemType }) {
  const handleClick = (product: itemType) => {
    console.log("Adding to cart:", product);

    const jsonProduct = JSON.parse(localStorage.getItem("JsonProduct") || "[]");

    const existingProductIndex = jsonProduct.findIndex(
      (item: itemType) => item._id === product._id
    );

    if (existingProductIndex > -1) {
      jsonProduct[existingProductIndex].quantity += 1;
    } else {
      jsonProduct.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("JsonProduct", JSON.stringify(jsonProduct));

    console.log("Updated Cart:", jsonProduct);

    alert(`The item "${product.name}" has been added to your cart!`);
  };

  return (
    <div>
      <div className="lg:flex lg:justify-around lg:pb-2">
        <button
          onClick={() => handleClick(products)}
          className="bg-[#FB2E86] p-4 shadow-lg rounded-md text-white font-josefin-sans font-semibold px-6 ">
          ADD TO CART
        </button>
        <Link href="/cart">
        <button className="bg-[#FB2E86] p-4 shadow-lg rounded-md text-white font-josefin-sans font-semibold px-6 lg:my-0 my-2">
          View Cart
          </button>
        </Link>
        
      </div>
    </div>
  );
}