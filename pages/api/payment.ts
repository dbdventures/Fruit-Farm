import type { NextApiHandler } from 'next';
import ky from 'ky';

const external = ky.extend({
    hooks: {
      beforeRequest: [(request)=> {
        request.headers.set('x-api-key', process.env.API_KEY ?? "")
        // request.headers.set('x-partner-id', "part_2Mv534r8FYWhswRKEvWuVU7VKer")
        request.headers.set('x-account-id', "acct_1231231313")
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
              "cancel_url": "http://localhost:3000/error",
              "success_url": "http://localhost:3000/success",
              "customer_email": "alec@dbdventures.com",
              "reference_id": "string",
              "payment_method_types": [
                "card"
              ],
              "subtotal":  (req.body.amount) * 100,
              "discount_amount": 100,
              "payment_intent_data": {
                "currency": "USD",
                "amount":(req.body.amount) * 100 + appFee + taxAmmount,
                "application_fee_amount": appFee,
                "tax_amount": taxAmmount,
                "tip_amount": null,
                "surcharge_amount": 2,
                "capture": true,
                "reference_id": "internal-id",
                "payment_splits": []
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
