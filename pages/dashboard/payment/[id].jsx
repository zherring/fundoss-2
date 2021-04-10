import React from 'react';
import moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Error from '../../../components/Error';
import DashboardNav from '../../../components/dashboard/DashboardNav';
import UserCard from '../../../components/dashboard/UserCard';
import Layout from '../../../components/layout';
import Payments from '../../../lib/payment/paymentController';
import middleware from '../../../middleware/all';
import serializable from '../../../lib/serializable';
import { formatAmountForDisplay } from '../../../utils/currency';
import Dump from '../../../components/dashboard/Dump';

const PaymentsPage = ({ user, payment }) => {
  if (!user._id) {
    return <Error statusCode={401} />;
  }
  if (user?.role !== 'admin') {
    return <Error statusCode={403} />;
  }

  return (
    <Layout title="FundOSS | Dashboard" user={user} hidefooter={1}>
      <Container style={{ paddingTop: '40px' }}>
        <DashboardNav />
        <h1>Payments</h1>
        <Row>
          <Col>

            &nbsp;
            <h3>{formatAmountForDisplay(payment.amount)} 
              <small>-{payment.fee} fee</small>
              <Badge variant={payment.status === 'succeeded' ? 'success' : 'danger'}>{payment.status}</Badge>
            </h3>
            
            <h4>{moment(payment.time).format('lll')}</h4>
            session : <Button href={`/session/${payment.session.slug}`}>{payment.session.name}</Button>

          </Col>
          <Col><UserCard user={payment.user} /></Col>
        </Row>
        
        <h3>
          { payment.donations.map((don) => (
            <Badge key={don.collective.slug} variant="light" style={{ marginRight: '3px' }}>
              ${don.amount} <Image src={don.collective.imageUrl} roundedCircle width={20} />
              {don.collective.name}
            </Badge>
          ))}
        </h3>
        <Dump data={payment.confirmation} />
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  await middleware.run(req, res);
  const payment = await Payments.findById(query.id);
  return { props: { user: serializable(req.user), payment: serializable(payment) } };
}

export default PaymentsPage;
