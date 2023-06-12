import type { NextApiHandler } from 'next';
import ky from 'ky';

const external = ky.extend({
    hooks: {
      beforeRequest: [(request)=> {
        request.headers.set('x-api-key', 'test_key_GuKlGA2bHWVZ0xKrz3QXzSQMbNSePoPIVIv98DYG')
        //  request.headers.set('x-api-key', "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImd0eSI6WyJhdXRob3JpemF0aW9uX2NvZGUiXSwia2lkIjoiUnJtMlBhWTFFS2FLOXhxTmZqa1NpbGJ4UjF3In0.eyJhdWQiOiI0NDQ0NDQ0NC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDQiLCJleHAiOjE2ODQ5NjE2ODksImlhdCI6MTY4NDk1ODA4OSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmRiZHZlbnR1cmVzLmNvbSIsInN1YiI6IjQyNzkyY2UwLTUyMGUtNGVlMi1hZTNmLTU5Y2ZiMjYyYmYxZSIsImp0aSI6ImMzZWM3ZWI4LTRhNmMtNGUzZi1iY2E0LWQ5YjFkYTRkYjEwZCIsImF1dGhlbnRpY2F0aW9uVHlwZSI6IlBJTkciLCJlbWFpbCI6InFhK2RiZF9hZG1pbkBkYmR2ZW50dXJlcy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6IjQ0NDQ0NDQ0LTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwNCIsInNjb3BlIjoib3BlbmlkIiwicm9sZXMiOlsiYnVzaW5lc3MudXNlcnMucmVhZCIsImJ1c2luZXNzLnVzZXJzLndyaXRlIiwibWNjX2NvZGVzLnJlYWQiLCJtZXJjaGFudC5ib2FyZGluZy5vdmVycmlkZV9wcm9jZXNzaW5nX3BsYW4iLCJtZXJjaGFudC5ib2FyZGluZy5yZWFkIiwibWVyY2hhbnQuYm9hcmRpbmcud3JpdGUiLCJtZXJjaGFudC5ib2FyZGluZy53cml0ZV9zdWJtaXR0ZWRfYXBwbGljYXRpb24iLCJwYXJ0bmVyLmFwaV9rZXlzLndyaXRlIiwicGFydG5lci5iYW5rX2FjY291bnQubWFudWFsX2FkZCIsInBhcnRuZXIuYmFua19hY2NvdW50LnJlYWQiLCJwYXJ0bmVyLmJhbmtfYWNjb3VudC53cml0ZSIsInBhcnRuZXIuYnVzaW5lc3MucmVhZCIsInBhcnRuZXIuYnVzaW5lc3Mud3JpdGUiLCJwYXJ0bmVyLmRldGFpbHMucmVhZCIsInBhcnRuZXIuZGV0YWlscy53cml0ZSIsInBhcnRuZXIubWNjX2NvZGVzLnJlYWQiLCJwYXJ0bmVyLm1jY19jb2Rlcy53cml0ZSIsInBhcnRuZXIubnBlLnJlYWQiLCJwYXJ0bmVyLm5wZS53cml0ZSIsInBhcnRuZXIucHJvZHVjdHNfZmVlcy5yZWFkIiwicGFydG5lci5wcm9kdWN0c19mZWVzLndyaXRlIiwicGFydG5lci5zdGF0dXNlcy5yZWFkIiwicGFydG5lci5zdGF0dXNlcy53cml0ZSIsInBhcnRuZXIudXNlcnMucmVhZCIsInBhcnRuZXIudXNlcnMud3JpdGUiLCJ0ZW5hbnQucGFydG5lcnMucmVhZCIsInRlbmFudC5wYXJ0bmVycy53cml0ZSIsInRlbmFudC51c2Vycy5yZWFkIiwidGVuYW50LnVzZXJzLndyaXRlIiwidGVuYW50LndyaXRlIl0sImF1dGhfdGltZSI6MTY4NDk1ODA4OSwidGlkIjoiMTExMTExMTEtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDA0IiwiZGF0YSI6eyJlbnRlcnByaXNlX2lkIjoiZW50XzJNdlFqQzhiengzUkxQVDZzaTAwYXVxTE9qVSIsInNlbGZfaWQiOiIwZTA3MDI1NC0wYzUwLTQwZmEtOWQ4YS1mZmI1ZmNlZGFkYzciLCJzZWxmX3N1YnR5cGUiOiJURU5BTlQiLCJzZWxmX3R5cGUiOiJVU0VSIiwidGVuYW50X2lkIjoidG50XzJNdlF0OFUzNmNiT1hLUGdkQjZxT1pqb1d0RyJ9fQ.W6LzkuiGjcA580Z__7fmzrsAzQnLn1lSGnKcGW7ti3GxcG0XGvUDz-I1ZP3O99uYpBRTDLYPfqkho17s2QS6v31ahMz3kugJhw4lrMKOhLWKrqwqx2-In0bJ7XL7MpylvmLGTeDzTKfB7G7U5pSpfeaQH7aeQHN0xumfOPLiWwraIeuVsAoUeDhWXtQTGOtmlapiB0ISr2__vnotZBfJDlciVGbV_mLoLtOWkog0sHD_a2vwhKz-0wJtlMRUHKyXJMGN713_ikJJxe1cFnPeudJCD4ji3Jp4IDr6B9zb1TNEKC1Bl7fAP0HSZaqQ3ipOrQ39Y--c7RKSORrh9Xnnbw")
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
        console.log(response)
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
