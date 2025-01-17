import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import csvify from 'csv-stringify';
import Payment from '../../../lib/payment/paymentController';
import { all } from '../../../middleware/index';

const handler = nextConnect();

handler.use(all);

handler.get(async (req: any, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden ');
  }
  if (req.query.session) {
    const disbursments = await Payment.getSessionDisbursement(req.query.session);
    res.setHeader('Content-Disposition', `${'attachment; filename="fundoss-disbursments-'}${Date.now()}.csv"`);
    return res.status(200).send(csvify(disbursments, {
      header: true,
      columns: {
        slug: 'Collective',
        donation: 'Donations',
        matched: 'Matched',
        fee: 'Stripe fee',
        total: 'Total',
      },
    }));
  }
});

export default handler;
