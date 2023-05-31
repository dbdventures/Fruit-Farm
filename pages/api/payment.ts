import type { NextApiHandler } from 'next';
import ky from 'ky';

const external = ky.extend({
    hooks: {
      beforeRequest: [(request)=> {
        // request.headers.set('x-api-key', 'test_key_GuKlGA2bHWVZ0xKrz3QXzSQMbNSePoPIVIv98DYG')
         request.headers.set('x-api-key', "some-key-12345")
         request.headers.set('x-partner-id',  'part_2PtQ13uxTnP4E3EwA9LEhHfKwMT')
         request.headers.set('x-account-id',  'acct_2PtU3X6AN0qoMJQRm7amai3TSMk')
      }]
    }
  })

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {

      const appFee = 2 * 100;
      const taxAmmount = 1 * 100;
        const response = await external.post(`${process.env.BASE_URL}/checkout/sessions`, {
            json: {
              "cancel_url": `${process.env.FRUIT_FARM_URL}/error`,
              "success_url": `${process.env.FRUIT_FARM_URL}/success`,
              "customer_email": "alec@dbdventures.com",
              "reference_id": "string",
              "payment_method_types": [
                "card"
              ],
              "subtotal": ((req.body.amount) * 100).toFixed(2),
              "discount_amount": 100,
              "payment_intent_data": {
                "currency": "USD",
                "amount":((req.body.amount) * 100 + appFee + taxAmmount).toFixed(2),
                "application_fee_amount": appFee,
                "tax_amount": taxAmmount,
                "tip_amount": null,
                "surcharge_amount": 2,
                "capture": true,
                "reference_id": "internal-id",
                "payment_splits": req.body.splits,
                "description": "Paying for fruits"
              }
            }
        }).json()
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
