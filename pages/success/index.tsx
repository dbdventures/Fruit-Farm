import React from 'react';
import { useRouter } from 'next/router';
import styles from "../../App.module.css";

export default function Success() {
  const router = useRouter();
  const { amount } = router.query;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Successful!</h1>
      <p className={styles.message}>Thank you for your purchase.</p>
    </div>
  );
}