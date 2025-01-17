import React from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const AdminLinks = ({
  session, view, edit, disbursments, all, donations,
}) => {
  const {
    start, end, slug,
  } = session;

  return (
    <>
      {edit || all ? (
        <Link href={`/dashboard/funding-session/${slug}/edit`}>
          <Button 
            variant="outline-primary" 
          >
            edit
          </Button>
        </Link>
      ) : null }
      {view || all 
        ? (
          <Link href={`/session/${slug}`}>
            <Button variant="outline-secondary">view</Button>
          </Link>
        ) : null }
      {(donations || all) && moment(start) < moment() && moment(end) > moment() ? (
        <>
          <Link href={`/dashboard/funding-session/${slug}/donations`}>
            <Button variant="outline-secondary">donations</Button>
          </Link>
        </>
      ) : null}
      {(disbursments || all) && moment(start) < moment() ? (
        <>
          <Link href={`/dashboard/funding-session/${slug}/table`}>
            <Button variant="outline-secondary">disbursments</Button>
          </Link>
        </>
      ) : null}
    </>
  );
};

export default AdminLinks;
