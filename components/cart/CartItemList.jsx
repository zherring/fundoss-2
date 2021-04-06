import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Form, InputGroup, Card } from 'react-bootstrap';
import { formatAmountForDisplay } from '../../utils/currency';
import Icons from '../icons';

const CartItem = ({
  item, onDelete, onSelect, selectedId, cartAmount, onChange, 
  calculateMatch, previousMatch, previousDonation,
}) => {
  const { collective } = item;
  const [amount, setAmount] = useState(cartAmount);
  const [selected, setSelected] = useState(selectedId);
  
  return (
    <div>
      <div 
        onClick={() => {
          const selection = collective._id === selected ? null : collective._id;
          onSelect(selection);
          setSelected(selection);
        }}
        style={{ borderBottom: '1px solid #ccc', padding: '0.9rem', cursor: 'pointer' }}
      >
        <Row className="no-gutters">
          <Col xs={1}>
            <span className={selected === collective._id ? 'with-caret-up' : 'with-caret'} />
            <Image src={collective.imageUrl} width={30} roundedCircle fluid />
          </Col>
          <Col className="text-fat" style={{ fontSize: '1.1rem' }}>
            {collective.name}
          </Col>
          {selected !== collective._id ? (
            <Col xs={4} className="text-right text-nowrap">
              <Badge className="round" style={{ fontSize: '0.8rem' }} variant="primary">
                {formatAmountForDisplay(amount, 'USD')}
              </Badge> +&nbsp;
              <span className="match">
                {formatAmountForDisplay(calculateMatch(amount, collective._id), 'USD')}
              </span>
              &nbsp;
              <Button
                size="sm"
                style={{ fontSize: '0.6rem', padding: '2px 3px' }} 
                variant="outline-secondary round"
                onClick={(e) => { onDelete(collective._id); }}
              ><Icons.Trash size={15} />
              </Button>
            </Col>
          ) : (
            <Col xs={2} className="text-right">
              <Button
                size="sm"
                style={{ fontSize: '0.6rem', padding: '2px 3px' }} 
                block
                variant="outline-secondary round"
                onClick={() => { onDelete(collective._id); }}
              ><Icons.Trash size={15} /> Remove
              </Button>
            </Col>
          ) }

        </Row>
      </div>
        
      {selected === collective._id ? (
        <Card.Body style={{ background: '#f8f9fa' }}>
          <Row className="align-items-center">
            <Col xs={5}>
              <InputGroup className="cart-amount">
                <InputGroup.Prepend><InputGroup.Text>$</InputGroup.Text></InputGroup.Prepend>
                <Form.Control
                  size="lg"
                  value={amount}
                  type="number"
                  max={5000}
                  min={1}
                  onChange={(e) => {
                    const amt = e.currentTarget.value > 5000 ? 5000 : e.currentTarget.value;
                    onChange(amt, collective);
                    setAmount(amt);
                  }}
                />
              </InputGroup>
            </Col>
            <Col className="text-center">
              <span className="lead">+</span>
            </Col>
            <Col xs={5} className="text-right">
              <div style={{ marginBottom: '-10px', fontSize: '2rem' }} className="match">
                {formatAmountForDisplay(calculateMatch(amount, collective._id), 'USD')}
              </div>
              <small>estimated match</small>
            </Col>
            <Col>
              { item.previous ? (
                <div className="previous text-center">
                  <div className="small">Your match is calculated on the sum of your donations.</div>
                  {formatAmountForDisplay(item.previous)} + est.
                  <span className="match">{formatAmountForDisplay(item.previousMatch)}</span> match
                </div>
              ) : null }
            </Col>
            <Col xs={12} style={{ marginTop: '10px' }}>

              {[10, 20, 30, 50, 100].map(
                (amt) => (
                  <Button 
                    className="round"
                    size="sm"
                    style={{ marginRight: '10px' }}
                    key={`btn${amt}`} 
                    onClick={() => {
                      onChange(amt, collective);
                      setAmount(amt);
                    }}
                    variant={amt === amount ? 'primary' : 'outline-primary'}
                  >
                    ${amt}
                  </Button>
                ),
              )}
            </Col>
          </Row>
        </Card.Body>
      ) : null }
      
    </div>
  );
};

const CartItemList = ({
  cart, deleteItem, onSelect, selectedId, onChange, calculateMatch,
}) => (
  cart.map(
    (item) => (
      <CartItem 
        item={item} 
        key={item.collective._id} 
        onDelete={deleteItem} 
        onSelect={onSelect}
        onChange={onChange}
        selectedId={selectedId}
        cartAmount={item.amount}
        calculateMatch={calculateMatch}
      />
    ),
  )
);

export default CartItemList;
