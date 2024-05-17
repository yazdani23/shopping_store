const Category = require("../models/Category");
const Product = require("../models/Product");

const createDefaultProducts = async () => {
  const products = await Product.find();
  if (!products.length) {
    const ProductsInfo = [
      {
        image:
          "http://localhost:5000/public/images/products/default/DiningRoom_10.webp",
        title: "Wooden Dining Table",
        height: 75,
        width: 150,
        depth: 90,
        weight: 35,
        color: "Brown",
        price: 450,
        description:
          "This elegant dining table is crafted from solid wood and features a timeless design that complements any dining room decor.",
        category: "Dinning Room",
        rate: 5,
        brand: "FurniturePlus",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/DiningRoom_11.webp",
        title: "Set of 4 Dining Chairs",
        height: 95,
        width: 50,
        depth: 50,
        weight: 15,
        color: "Black",
        price: 200,
        description:
          "This set includes four modern dining chairs with comfortable padded seats and sleek metal legs, perfect for gatherings around the dining table.",
        category: "Dinning Room",
        rate: 4.5,
        brand: "FurniturePlus",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/LivingRoom_11.webp",
        title: "Modern L-shaped Sofa",
        height: 80,
        width: 250,
        depth: 150,
        weight: 50,
        color: "Gray",
        price: 900,
        description:
          "This modern L-shaped sofa features a sleek design with comfortable cushions and stylish metal legs, perfect for any contemporary living room.",
        category: "Living Room",
        rate: 4.8,
        brand: "FurniturePlus",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/LivingRoom_10.webp",
        title: "Glass Coffee Table",
        height: 45,
        width: 120,
        depth: 70,
        weight: 20,
        color: "Clear",
        price: 250,
        description:
          "This elegant glass coffee table adds a touch of sophistication to any living room with its minimalist design and sturdy construction.",
        category: "Living Room",
        rate: 4.5,
        brand: "FurniturePlus",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/Bedroom_10.webp",
        title: "Queen Size Bed Frame",
        height: 120,
        width: 160,
        depth: 210,
        weight: 60,
        color: "Walnut",
        price: 1200,
        description:
          "This stylish queen size bed frame is made from high-quality walnut wood and features a sleek design with sturdy support for a comfortable night's sleep.",
        category: "Bedroom",
        rate: 4.7,
        brand: "DreamCraft",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/BedRoom_11.webp",
        title: "Set of Two Nightstands",
        height: 55,
        width: 40,
        depth: 35,
        weight: 15,
        color: "White",
        price: 300,
        description:
          "This set of two nightstands is the perfect addition to any bedroom, offering ample storage space and a modern design that complements any decor.",
        category: "Bedroom",
        rate: 4.6,
        brand: "HomeEssentials",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/Office_10.webp",
        title: "Executive Office Desk",
        height: 75,
        width: 150,
        depth: 80,
        weight: 30,
        color: "Mahogany",
        price: 850,
        description:
          "This executive office desk is crafted from solid mahogany wood and features a spacious work surface, multiple drawers, and elegant design, making it ideal for any professional workspace.",
        category: "Office",
        rate: 4.8,
        brand: "ExecutiveCraft",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/Office_11.jpg",
        title: "Ergonomic Office Chair",
        height: 110,
        width: 65,
        depth: 60,
        weight: 15,
        color: "Black",
        price: 250,
        description:
          "This ergonomic office chair provides exceptional support and comfort for long hours of sitting. It features adjustable armrests, lumbar support, and breathable mesh material, promoting good posture and reducing fatigue.",
        category: "Office",
        rate: 4.9,
        brand: "ComfortSeating",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/Outdoor_10.webp",
        title: "Outdoor Dining Table",
        height: 75,
        width: 150,
        depth: 90,
        weight: 25,
        color: "Brown",
        price: 450,
        description:
          "This outdoor dining table is perfect for enjoying meals in your garden or patio. Made of durable weather-resistant material, it can withstand outdoor elements while providing a stylish and functional addition to your outdoor space.",
        category: "Outdoor",
        rate: 4.7,
        brand: "GardenElegance",
      },
      {
        image:
          "http://localhost:5000/public/images/products/default/Outdoor_11.webp",
        title: "Double Hammock with Stand",
        height: 160,
        width: 250,
        depth: 100,
        weight: 12,
        color: "Blue Striped",
        price: 120,
        description:
          "Relax and unwind in this comfortable double hammock with a sturdy stand. It features a soft cotton fabric with vibrant blue stripes, providing a cozy spot for lounging outdoors. Perfect for backyard relaxation or camping trips.",
        category: "Outdoor",
        rate: 4.9,
        brand: "RelaxationZone",
      },
    ];
    const bedroom = await Category.findOne({ name: "Bedroom" });
    const livingRoom = await Category.findOne({ name: "Living Room" });
    const diningRoom = await Category.findOne({ name: "Dining Room" });
    const outdoor = await Category.findOne({ name: "Outdoor" });
    const office = await Category.findOne({ name: "Office" });

    ProductsInfo[0].category = bedroom.id;
    ProductsInfo[1].category = bedroom.id;
    ProductsInfo[2].category = livingRoom.id;
    ProductsInfo[3].category = livingRoom.id;
    ProductsInfo[4].category = diningRoom.id;
    ProductsInfo[5].category = diningRoom.id;
    ProductsInfo[6].category = office.id;
    ProductsInfo[7].category = office.id;
    ProductsInfo[8].category = outdoor.id;
    ProductsInfo[9].category = outdoor.id;

    for (const item of ProductsInfo) {
      let result = await Product.findOne({ title: item.title });
      if (!result) {
        const product = new Product(item);
        await product.save();
      }
    }

    console.log("Default Products created");
  }
};

module.exports = { createDefaultProducts };
