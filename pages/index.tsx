import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';

export default function Home() {
  const router = useRouter();
  const [region, setRegion] = useState('');

  const handleRegionChange = (event: any) => {
    setRegion(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (region) {
      router.push(`fruits/?region=${region}`);
    }
  };

  return (
    <div>
      <h1>Pick a Region</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Select Region:</Form.Label>
          <Form.Control as="select" value={region} onChange={handleRegionChange}>
            <option value="">Choose...</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </Form.Control>
        </Form.Group>
        <button type="submit">Go to Fruits</button>
      </Form>
    </div>
  );
}