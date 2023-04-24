import type { NextApiHandler } from 'next';
import ky from 'ky';

const external = ky.extend({
    hooks: {
      beforeRequest: [(request)=> {
        request.headers.set('x-api-key', "test_key_iVzfMz5OlUpVv38pqgzZlc1GSIOGF-aCtavy4nJJ")
        // request.headers.set('x-partner-id', "part_2OaJVyeHkwTBB5Y4Nl8ql10KkJL")
        request.headers.set('x-account-id', "acct_2O2xs8qIeFsyyaQPsDwFqpdgLQp")
      }]
    }
  })

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
        const response = await external.post(`${process.env.BASE_URL}/checkout/sessions`, {
            json: {
              "cancel_url": "http://localhost:3000/error",
              "success_url": "http://localhost:3000/success",
              "customer_email": "alec@dbdventures.com",
              "reference_id": "string",
              "payment_method_types": [
                "card"
              ],
              "subtotal": 2000,
              "discount_amount": 100,
              "payment_intent_data": {
                "currency": "USD",
                "amount": Math. trunc(req.body.amount) * 100,
                "application_fee_amount": 2,
                "tax_amount": 1,
                "tip_amount": 1,
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
