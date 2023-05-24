import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import styles from '../App.module.css';



export default function Home() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [insuranceSelected, setInsuranceSelected] = useState(false);

  const pay = async () => {
    setIsLoading(true);
    setShowModal(false);
    try {
      let totalPrice = amount;
      if (insuranceSelected) {
        totalPrice += 5;
      }

      const response = await axios.post('/api/payment', {
        amount: totalPrice
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAmount = (price: number) => {
    setAmount(amount + price);
  };

  const handleInsuranceSelection = (event: any) => {
    setInsuranceSelected(event.target.checked);
  };

  const handlePayButtonClick = () => {
    if (insuranceSelected) {
      setShowModal(true);
    } else {
      pay();
    }
  };

  return (
        <>
      <div className={styles.mainDiv}>
        <div className={styles.cards}>
          <Card className={styles.first} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={'../img/ya.png'} style={{ borderRadius: '5px' }} />
            <Card.Body>
              <Card.Title>
                <h2>Apple</h2>
              </Card.Title>
              <Card.Text>Delicious apple.</Card.Text>
              <div>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch1"
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
              <Card.Title>
                <h2>Orange</h2>
              </Card.Title>
              <Card.Text>Delicious orange.</Card.Text>
              <div>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch2"
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
            onClick={handlePayButtonClick}
          >
            {isLoading ? 'Loading...' : 'Pay'}
          </Button>
          <div className={styles.total}>Total: ${amount}</div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Insurance</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to add insurance for $5?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={pay}>
            Yes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}