import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import "./product.css";
import Navbar from "./Navbar";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const limit = 8;

  useEffect(() => {
    fetchProducts(query, page);
  }, [page, query]);

  const fetchProducts = async (search = "", pageNo = 0) => {
    const skip = pageNo * limit;

    const url = search
      ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.products);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(0)
    fetchProducts(value, 0);
  };

  const handlePrev = () => {
    if (page > 0) setPage((p) => p - 1);
  };

  const handleNext = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className="product-container">
        
    <Navbar />
      <h2>Product Management</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />

      <ProductList products={products} />

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 0}>
          Prev
        </button>

        <span>Page {page + 1}</span>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}