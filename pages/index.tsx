import { Inter } from '@next/font/google'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ya from '../img/ya.png';
import or from '../img/or.png';
import styles from "../App.module.css";
import React, { useState, useEffect, useRef, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [apple, addApple] = useState(false);
  const [orange, addOrange] = useState(false);
  const [loaded, isLoading]= useState(false);
  const [amount, setAmount] = useState(0);

  const pay = async () => {
    try{
      isLoading(true)
    let data =  await axios.post('/api/payment', {
      amount: amount
      });
            //@ts-ignore
      setTimeout(() =>
      isLoading(false), 5000);
      const checkout_url_parts = data.data.url.split('/');
      const checkout_id = checkout_url_parts[checkout_url_parts.length -1];
      const checkout_url = `http://localhost:3002/${checkout_id}`;
      console.log('checkout_url', checkout_url);
      location.replace(
        //@ts-ignore
        // `${data.data.url}`
        checkout_url
      );
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
    <div className={styles.mainDiv}>
    <div className={styles.cards}>
    <Card className={styles.first} style={{ width: '18rem' }}>
    <Card.Img variant="top" src={ya.src} />
      <Card.Body>
        <Card.Title>Apple</Card.Title>
        <Card.Text>
        вкусные яблоки
        </Card.Text>
        <div>
          <Form>
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="Add to card"
        onChange={()=>setAmount(amount+40)}
      />
      </Form>
        </div>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <Card.Img  src={or.src} />
      <Card.Body>
        <Card.Title>Oranges</Card.Title>
        <Card.Text>
        вкусные апельсины
        </Card.Text>
        <div>
          <Form>
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="Add to card"
        onChange={()=>setAmount(amount+40)}
      />
      </Form>
        </div>
      </Card.Body>
      <h1>Total: {amount}</h1>
    </Card>
    </div>
    <Button
      variant="primary"
      disabled={!isLoading}
      className={styles.payBtn}
      onClick={pay}
    >
      {loaded ? 'Loading…' : 'Pay'}
    </Button>
    </div>
    </>
  )
}


