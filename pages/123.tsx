import { Inter } from '@next/font/google';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../App.module.css";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const pay = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/payment', {
        amount: amount
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAmount = (price: number) => {
    setAmount(amount + price);
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.cards}>
          <Card className={styles.first} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={'../img/ya.png'} style={{ borderRadius: '5px' }} />
            <Card.Body>
              <Card.Title><h2>Apple</h2></Card.Title>
              <Card.Text>Delicious apple.</Card.Text>
              <div>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={`Add to cart ($40)`}
                    onChange={() => updateAmount(40)}
                  />
                </Form>
              </div>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={'../img/or.png'} style={{ borderRadius: '5px' }} />
            <Card.Body>
              <Card.Title><h2>Orange</h2></Card.Title>
              <Card.Text>Delicious orange.</Card.Text>
              <div>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={`Add to cart ($50)`}
                    onChange={() => updateAmount(50)}
                  />
                </Form>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className={styles.payBtnDiv}>
          <Button
            variant="primary"
            disabled={isLoading}
            className={styles.payBtn}
            onClick={pay}
          >
            {isLoading ? 'Loading...' : 'Pay'}
          </Button>
          <div className={styles.total}>Total: ${amount}</div>
        </div>
      </div>
    </>
  );
}