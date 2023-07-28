import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
const HeaderTitle = ({title,btnTxt,route}) => {
  return (
    <Row className='mt-2'>
            <Col xs={10}>
                <h2>{title}</h2>
            </Col>
            <Col>
                  <Link to={route}>
                          <Button variant="success" className='mt-1.5'>{btnTxt}</Button>
                  </Link>
           
            </Col>
   </Row>
  )
}

export default HeaderTitle