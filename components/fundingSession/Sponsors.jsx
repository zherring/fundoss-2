import React from 'react';
import { Button } from 'react-bootstrap';
import OscLogo from '../../svg/osc.svg';
import GitcoinLogo from '../../svg/gitcoin.svg';

const Sponsors = ({ sponsors }) => (
  <div className="content" style={{marginTop:'10px'}}>
    <p>Brought to You By</p>
    <Button href="https://www.oscollective.org/" variant="link" target="_blank"><OscLogo /></Button>
    &nbsp;&nbsp;
    <Button href="https://gitcoin.co/" variant="link" target="_blank"><GitcoinLogo /></Button>
    <div className="session-sponsors" dangerouslySetInnerHTML={{ __html: sponsors }} />
  </div>
);

export default Sponsors;
