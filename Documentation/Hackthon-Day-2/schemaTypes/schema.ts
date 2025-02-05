//Schema for Products.

export const product = {
  name: "product",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Product Name",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "stock",
      type: "number",
      title: "Stock Level",
    },
    {
      name: "category",
      type: "string",
      title: "Category",
    },
    {
      name: "image",
      type: "image",
      title: "Product Image",
    },
  ],
};

//Schame of User

export const user = {
  name: "user",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Full Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email Address",
    },
    {
      name: "password",
      type: "string",
      title: "Password",
    },
    {
      name: "address",
      type: "text",
      title: "Address",
    },
    {
      name: "phone",
      type: "string",
      title: "Phone Number",
    },
  ],
};

//Schema for Order

export const order = {
  name: "order",
  type: "document",
  fields: [
    {
      name: "userId",
      type: "reference",
      title: "User",
    },
    {
      name: "products",
      type: "array",
      title: "Products",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
    {
      name: "totalPrice",
      type: "number",
      title: "Total Price",
    },
    {
      name: "paymentStatus",
      type: "string",
      title: "Payment Status",
      options: {
        list: ["Pending", "Paid", "Failed"],
      },
    },
    {
      name: "shippingStatus",
      title: "Shipping Status",
      type: "string",
      options: {
        list: [
          { title: "In Transit", value: "inTransit" },
          { title: "Delivered", value: "delivered" },
          { title: "Pending", value: "pending" },
        ],
      },
    },
  ],
};


