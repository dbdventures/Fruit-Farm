import axios from 'axios';
import type { NextApiHandler } from 'next';
import ky from 'ky';

const external = ky.extend({
    hooks: {
      beforeRequest: [(request)=> {
        request.headers.set('x-api-key', "test_key_0MC5ElKfCf61Mi-WFObJDXVTEOphIkyoxHbT_2gl")
        request.headers.set('x-partner-id', "part_1234") //
        request.headers.set('x-account-id', "acct_1231231313")
      }]
    }
  })

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
        // const response = await external.get(`https://c6sty1jq5d.execute-api.us-east-1.amazonaws.com/dev/checkout/sessions/cs_2KA5sQZ7QA5AN19tT7GUQKGCbPR`).json();
        // return res.status(200).send(response)
        const response = await external.post(`${process.env.BASE_URL}/checkout/sessions`, {
            json: {
                cancel_url: "http://localhost:3000/success",
                success_url: "http://localhost:3000/success",
                customer_email: "test@test.com",
                reference_id: "uuid-1",
                payment_method_types: [
                  "card"
                ],
                subtotal: req.body.amount * 100,
                discount_amount: 100,
                payment_intent_data: {
                  currency: "usd",
                 amount: req.body.amount * 100 + ( 100 * 10 / req.body.amount) + (100 * 5 / req.body.amount),
                  application_fee_amount: 100 * 10 / req.body.amount,
                  tax_amount: 100 * 5 / req.body.amount,
                  card_surcharge_amount: 0,
                  capture: true,
                  reference_id: "internal-id",
                  payment_splits: []
                }
            }
        }).json()
        //@ts-ignore
        return res.status(200).send(response)
    } catch (error) {
        //@ts-ignore
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

export default handler;
