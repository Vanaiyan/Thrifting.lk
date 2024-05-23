const exampleData = [
  {
    id: 1,
    name: "JBL 5510 BT Headphones",
    price: 149.99,
    images: [
      {
        image:
          "D:AcademicsThrifting.lk\frontendsrcAssetsImagessellerPagesteps_img1.png",
      },
      { image: "https://image2.jpg" },
    ],
    category: "Electronics",
    description: "Wireless Bluetooth headphones with excellent sound quality.",
    user: "user_id_1",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 1,
    name: "JBL 5510 BT Headphones",
    price: 149.99,
    images: [
      {
        image:
          "D:AcademicsThrifting.lk\frontendsrcAssetsImagessellerPagesteps_img1.png",
      },
      { image: "https://image2.jpg" },
    ],
    category: "Electronics",
    description: "Wireless Bluetooth headphones with excellent sound quality.",
    user: "user_id_1",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 1,
    name: "JBL 5510 BT Headphones",
    price: 149.99,
    images: [
      {
        image:
          "D:AcademicsThrifting.lk\frontendsrcAssetsImagessellerPagesteps_img1.png",
      },
      { image: "https://image2.jpg" },
    ],
    category: "Electronics",
    description: "Wireless Bluetooth headphones with excellent sound quality.",
    user: "user_id_1",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Samsung Galaxy S21",
    price: 799.99,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1610401464716-455c14e94f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYxNTE1MzMyMQ&ixlib=rb-4.0.3&q=80&w=1080",
      },
      { image: "https://image4.jpg" },
      { image: "https://image5.jpg" },
    ],
    category: "Electronics",
    description:
      "Latest flagship smartphone from Samsung with advanced camera features.",
    user: "user_id_2",
    createdAt: new Date(),
  },
];

module.exports = exampleData;
