import "./styles.css";
import { useState, useEffect } from "react";
import Product from "./Components/Product";
const dummyURL = "https://dummyjson.com/products";
export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${dummyURL}?limit=50`);
      const data = await response.json();
      const distinctCategories = [
        ...new Set(data.products.map((product) => product.category))
      ];
      setProducts(data.products);
      setCategories(distinctCategories);
    } catch (err) {
      console.log("error", err);
    }
  };

  const fetchProductByCategory = async () => {
    try {
      const response = await fetch(`${dummyURL}/category/${category}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProductByCategory();
    } else {
      fetchProducts();
    }
  }, [category]);

  return (
    <div className="App">
      <header>
        <h1>Products</h1>
        <div className="filter-container">
          <div className="filter-label">Filter by Category:</div>
          <div className="filter-dropdown">
            <select
              className="filter-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-label">Sort By:</div>
          <div className="filter-dropdown">
            <select
              className="filter-select"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="title">name</option>
              <option value="category">category</option>
              <option value="price">price</option>
            </select>
          </div>
        </div>
      </header>
      <main>
        <div className="product-list">
          {products.length &&
            products
              .sort((a, b) => {
                if (sort === "price") {
                  return a[sort] - b[sort];
                } else {
                  return a[sort].localeCompare(b[sort]);
                }
              })
              .map((product) => <Product key={product.id} {...product} />)}
        </div>
      </main>
    </div>
  );
}
