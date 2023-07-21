import React from "react";

import "./EmpDash.css";

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const EmpDash = () => {
  return (
    <div>
      <div class='left'>
        <Link to='/' className='a'>
          <h1>Employee Dashboard</h1>
        </Link>

        <div class='btn-group'>
          <div className='d-grid gap-2'>
            <Button variant='primary' className='btn'>
              Customer
            </Button>

            <Link to='/emptab'>
              <Button variant='primary' className='btn'>
                Employee
              </Button>
            </Link>

            <Link to='/empadmintab'>
              <Button variant='primary' className='btn'>
                Order
              </Button>
            </Link>

            <Link to='/delivery'>
              <Button variant='primary' className='btn'>
                Delivery
              </Button>
            </Link>

            <Button variant='primary' className='btn'>
              Stock
            </Button>

            <Button variant='primary' className='btn'>
              Menu
            </Button>

            <Button variant='primary' className='btn'>
              Event
            </Button>

            <Button variant='primary' className='btn'>
              Supplier
            </Button>

            <Link to='/admin'>
              <Button variant='primary' className='btn'>
                Financial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDash;
