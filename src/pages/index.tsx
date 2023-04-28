import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "~/utils/api";

type Product = {
  name: string;
  id: string;
  price: number;
};

const discountApple = true;
const buy1get2Pear = false;

const applyOptionalDiscount = (product: Product) => {
  if (!discountApple) {
    return product.price;
  }
  if (product.id === "A0001") {
    return Math.round(product.price * 0.9 * 100) / 100;
  } else {
    return product.price;
  }
};

const calculateBuy1Get1Reduction = (products: Product[]) => {
  if (!buy1get2Pear) {
    return 0;
  }
  const relevantProducts = products.filter((product) => product.id === "A0002");
  const number = relevantProducts.length;
  const firstProduct = relevantProducts.find(() => true);
  if (firstProduct === undefined) {
    return 0;
  } else {
    console.log(Math.floor(number / 2) * applyOptionalDiscount(firstProduct));
    return Math.floor(number / 2) * applyOptionalDiscount(firstProduct);
  }
};

const getTotalPrice = (products: Product[]) => {
  let sum = 0;
  for (const product of products) {
    //force integers
    sum += Math.round(applyOptionalDiscount(product) * 100);
  }
  console.log(sum);
  sum -= calculateBuy1Get1Reduction(products) * 100;
  console.log(sum);
  return sum / 100;
};

const Home: NextPage = () => {
  const { data } = api.example.getProducts.useQuery();

  const [basket, setBasket] = useState<Product[]>([]);

  return (
    <>
      <Head>
        <title>Shopping Basket</title>
        <meta name="description" content="Shopping Basket demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Store Catalogue
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            {data &&
              data.productJson.map((product) => (
                <div key={product.id} className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <div className="text-lg">{product.price}€</div>
                  {product.id}
                  <button
                    className="rounded border-2 border-white p-2  hover:bg-white/20"
                    onClick={() => setBasket([...basket, product])}
                  >
                    Add to Basket
                  </button>
                </div>
              ))}
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Shopping Basket
          </h1>
          <ul>
            {basket.map((product, index) => (
              <li key={index} className="text-xl font-bold text-white">
                {product.name}: {product.price}€
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold text-white">
            Total: {getTotalPrice(basket)}€
          </h3>
          )
        </div>
      </main>
    </>
  );
};

export default Home;
