import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import appleImg from '../img/ya.png';
import bananaImg from '../img/banana.png';
import orangeImg from '../img/or.png';
import wa from '../img/wa.png';
import styles from "../App.module.css";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

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

export default function Store() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [splits, setSplits] = useState([{}])

  const handleAddToCart = (fruit: {name: string, price: number, imageSrc: any}) => {
    //@ts-ignore
    setCart([...cart, fruit]);
    setTotal(total + fruit.price);
  };

  const pay = async () => {
    try {
      const response = await axios.post('/api/payment', {
        amount: total,
        splits: splits 
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };
  const handleSwitchChange = (event: any) => {
    const isChecked = event.target.checked;
    setTotal(isChecked ? total + 5 : total - 5);
    if(isChecked) {
      setSplits([{
        account_id: "acct_2PtU3X6AN0qoMJQRm7amai3TSMk",
        amount: 500,
        description: 'paying for the insurance!',
      }])
    } else {
      setSplits([])
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
            <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label=" Add insurance ($5)"
        onClick={handleSwitchChange}
      />
    </Form>
            <button onClick={pay}>Pay Now</button>
          </div>
        )}
      </main>
      </div>
      )
      }
