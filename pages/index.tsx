import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import appleImg from '../img/ya.png';
import bananaImg from '../img/banana.png';
import orangeImg from '../img/or.png';
import wa from '../img/wa.png';
import styles from "../App.module.css";
import axios from 'axios';

const fruits = [
  {
    name: 'Apple',
    price: 1.99,
    imageSrc: appleImg,
  },
  {
    name: 'Banana',
    price: 0.99,
    imageSrc: bananaImg,
  },
  {
    name: 'Orange',
    price: 1.49,
    imageSrc: orangeImg,
  },
  {
    name: 'Watermelon',
    price: 4.99,
    imageSrc: wa,
  },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (fruit: {name: string, price: number, imageSrc: any}) => {
    //@ts-ignore
    setCart([...cart, fruit]);
    setTotal(total + fruit.price);
  };

  const pay = async () => {
    try {
      const response = await axios.post('/api/payment', {
        amount: total
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <Head>
        <title className={styles.title}>Hey DBD, Welcome to My Fruit Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Hey DBD, Welcome to My Fruit Shop</h1>

        <div className={styles.grid}>
          {fruits.map((fruit, index) => (
            <div key={index} className={styles.card}>
              <Image src={fruit.imageSrc} alt={fruit.name} width={300} height={200} />
              <h3>{fruit.name}</h3>
              <p>${fruit.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(fruit)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className={styles.cart}>
            <h2>Cart</h2>
            {cart.map((fruit:{name: string, price: number, imageSrc: string}, index) => (
              <div key={index} className={styles.cart_item}>
                <span>{fruit.name}</span>
                <span>${fruit.price.toFixed(2)}</span>
              </div>
            ))}
            <div className={styles.cart_total}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={pay}>Pay Now</button>
          </div>
        )}
      </main>
      </div>
      )
      }
