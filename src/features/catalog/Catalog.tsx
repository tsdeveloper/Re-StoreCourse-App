import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list().then((products) => setProducts(products));
  }, []);

  console.log(products);

  if (loading) return <LoadingComponent />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
