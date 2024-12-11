import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, Typography } from "@mui/material";
import Header from "./Header";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

  useEffect(() => {
    fetch("http://localhost:7001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    console.log(setProducts);
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        description: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        pictureUrl: faker.image.urlLoremFlickr(),
        quantityInStock: 1,
      },
    ]);
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </>
  );
}

export default App;
