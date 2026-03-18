import { useEffect, useState } from "react";

export const useDashboardData = (userId) => {
  const [data, setData] = useState({
    totalPrice: 0,
    totalQuantity: 0,
    totalDiscounted: 0,
    products: [],
  });

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://dummyjson.com/users/${userId}/carts`
      );
      const json = await res.json();

      let totalPrice = 0;
      let totalQuantity = 0;
      let totalDiscounted = 0;
      let products = [];

      json.carts.forEach((cart) => {
        cart.products.forEach((p) => {
          totalPrice += p.total;
          totalQuantity += p.quantity;
          totalDiscounted += p.discountedTotal;
          products.push(p);
        });
      });

      setData({ totalPrice, totalQuantity, totalDiscounted, products });
    };

    fetchData();
  }, [userId]);

  return data;
};