import { faker } from '@faker-js/faker';


interface IProduct {
  _id: number;
  name: string;
  price: number;
}

faker.seed(1)
function createRandomProduct(): IProduct
{
 return {
  _id: faker.number.int({ min: 1, max: 1000}),
  name: faker.commerce.product(),
  price: +faker.commerce.price(),
 }
}

const products = faker.helpers.multiple(createRandomProduct, { count: 5})

console.log(createRandomProduct())
console.log(products)

function App() {
  return (
    <div>
      <h1>Re-StoreCourse App</h1>
      <ul>
        {products.map(item => (
          <li key={item._id}>{item._id} - {item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
