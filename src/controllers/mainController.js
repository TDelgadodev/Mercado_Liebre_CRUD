const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    // Do the magic
    const productsView = products.filter(
      (product) => product.category === "visited"
    );
    const productsOnSale = products.filter(
      (product) => product.category === "in-sale"
    );
    return res.render("index", {
      productsView,
      productsOnSale,
      toThousand,
    });
  },
  search: (req, res) => {
    const { keywords } = req.query;
    const productFilter = products.filter(
      (product) =>
        product.name.toLowerCase().includes(keywords.toLowerCase()) ||
        product.description.toLowerCase().includes(keywords.toLowerCase())
    );

    res.render("results", {
		productFilter,
		toThousand,
		keywords
	});
  },
};

module.exports = controller;
