import Swal from "sweetalert2";
import reactImg from "../../assets/ReactJs.png"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
  Col,
  Row,
  Container,
  Label,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
// import { useHistory } from "react-router-dom";
import { useState } from "react";

function index() {
  return (
    <Container>
     <div>
         <Row>
<Col md={4}>
      <Card>
        <CardImg top width="100%" src={reactImg} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">REACT</CardTitle>
         
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button color="outline-success">Show Quiz</Button>
        </CardBody>
      </Card>
</Col>
         </Row>
    </div>
    </Container>
  );
}

export default index;
