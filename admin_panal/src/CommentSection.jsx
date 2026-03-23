import { useState, useEffect } from "react";

export default function CommentSection({ productId }) {
  const storageKey = `comments-${productId}`;

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setComments(JSON.parse(saved));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...comments];
      updated[editIndex] = input;
      setComments(updated);
      setEditIndex(null);
    } else {
      setComments([...comments, input]);
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(comments[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          value={input}
          placeholder="Add review..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div style={{ marginTop: "8px" }}>
        {comments.map((c, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{c}</span>
            <button onClick={() => handleEdit(i)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
