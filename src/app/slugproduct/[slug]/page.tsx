import { itemType } from "@/app/types/typesImport";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React from "react";

// Fetch product data
async function getProduct(slug: string): Promise<itemType | null> {
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      "image": image.asset->url,
      price,
      description,
      discountPercentage,
      "slug": slug.current,
      stockLevel,
      category
    }`,
    { slug }
  );

  return product || null;
}

// Page component
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params; 
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-[#F6F5FF] w-full lg:h-[286px] py-4 text-center h-[120px] sm: px-5">
        <div className="absolute lg:my-10 lg:h-[36px] lg:top-[221px] lg:left-[374px]">
          <h1 className=" lg:text-[36px] leading-[42.19px] text-[#101750] font-josefin-sans text-center ">
            Product Detail Page
          </h1>
          <p className="lg:gap-2 flex lg:text-[15px] text-[10px] lg:font-medium leading-[19.2px] text-center text-black font-lato pl-2">
            Home. <span>Page.</span>
            <span className="text-[#FB2E86]">Product Detail Page</span>
          </p>
        </div>
      </header>

      <section className="grid lg:flex lg:flex-cols-2 lg:gap-12 rounded-lg shadow-xl mx-auto lg:m-20 lg:p-20 ">
        {/* image-div */}
        <div className="m-4 p-2">
          <Image
            className="lg:ml-20 shadow-xl hover:shadow-[#FB2E86] transition duration-500 ease-in-out rounded-lg"
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
          />
        </div>
        <div>
          <div className="p-5 m-5 lg:p-20 ">
            <h1 className=" text-2xl lg:text-[50px] lg:leading-[70px] font-josefin-sans font-semibold text-[#101750]">
              {product.name}
            </h1>

            <p className="lg:text-lg text-[#101750]">
              <span className="text-lg lg:text-2xl font-josefin-sans text-[#FB2E86]">
                Description{" "}
              </span>
              <br />
              {product.description}
            </p>

            <p className="lg:text-lg text-[#101750] my-2">
              <span className="text-lg lg:text-2xl font-josefin-sans text-[#FB2E86]">
                Price
              </span>
              <br />${product.price}
            </p>

            <div className="lg:flex gap-4 ">
              <p className="text-lg text-[#101750] mx-2">
                <span className="text-lg lg:text-2xl font-josefin-sans text-[#FB2E86] mx-2">
                  Discount:
                </span>
                {product.discountPercentage}%
              </p>

              <p className="text-lg text-[#101750] mx-2">
                <span className="text-lg lg:text-2xl font-josefin-sans text-[#FB2E86] mx-2">
                  Stock:
                </span>
                {product.stockLevel}
              </p>

              <p className="text-lg text-[#101750] mx-2">
                <span className="text-lg lg:text-2xl font-josefin-sans text-[#FB2E86] mx-2">
                  Category:
                </span>
                {product.category}
              </p>
            </div>

            {/* buttons */}
            <div className="items-center text-center mt-10 ">
              {/* back */}
              <div className="bg-[#FB2E86] rounded-md p-4 shadow-lg my-5">
                <Link href="/shop">
                  <button className="text-white font-josefin-sans font-semibold px-2">
                    BACK TO SHOP
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}