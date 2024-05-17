const Category = require("../models/Category");

const createDefaultCategories = async (createDefaultProducts) => {
  const categories = await Category.find();
  if (!categories.length) {
    const CategoriesInfo = [
      {
        name: "Bedroom",
        image:
          "http://localhost:5000/public/images/categories/default/Bedroom_1.webp",
      },
      {
        name: "Dining Room",
        image:
          "http://localhost:5000/public/images/categories/default/DiningRoom_2.webp",
      },
      {
        name: "Living Room",
        image:
          "http://localhost:5000/public/images/categories/default/LivingRoom_3.webp",
      },
      {
        name: "Outdoor",
        image:
          "http://localhost:5000/public/images/categories/default/Outdoor_1.webp",
      },
      {
        name: "Office",
        image:
          "http://localhost:5000/public/images/categories/default/Office_3.jpg",
      },
    ];

    let createdMode = false;
    for (const item of CategoriesInfo) {
      const result = await Category.findOne({ name: item.name });
      if (!result) {
        createdMode = true;
        const category = new Category(item);
        await category.save();
      }
    }

    console.log("Default Categories created");
  }
  createDefaultProducts();
};

module.exports = { createDefaultCategories };
