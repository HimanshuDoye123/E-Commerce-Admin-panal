import CommentSection from "./CommentSection";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />

      <h4>{product.title}</h4>

      <p>₹ {product.price}</p>
      <p>{product.category}</p>
      <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
      <CommentSection productId={product?.id}/>
    </div>
  );
}