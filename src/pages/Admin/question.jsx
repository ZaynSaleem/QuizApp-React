import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Col,
  Row,
  Container,
  Label,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import reactImg from "../../assets/javascript.jpg";
import { FaTrashAlt } from "react-icons/fa";
import "./style.css";

const Question = () => {
  const [question, setquestion] = useState("");
  const [option1, setoption1] = useState("");
  const [option2, setoption2] = useState("");
  const [option3, setoption3] = useState("");
  const [option4, setoption4] = useState("");
  const [radiovalue, setradiovalue] = useState("");
  const [data, setdata] = useState([]);
  const [showdata, setshowdata] = useState([]);

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("Questions"));
    let getvalue = JSON.parse(localStorage.getItem("quizCatId"));
    let arr = [];
    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].qcid === getvalue) {
          arr.push(get[i]);
          setshowdata(arr);
        }
      }
      setdata(get);
    }
    // console.log();
  }, []);
  
  const addQuestion = () => {
    let quizCatId = JSON.parse(localStorage.getItem("quizCatId"));
    // console.log(quizCatId);
    let obj = {
      id: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      qcid: quizCatId,
      Question: question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      correctAnswer: radiovalue,
    };
    
    let get = JSON.parse(localStorage.getItem("Questions"));
    let main = true;
    
    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].Question === obj.Question) {
          main = false;
          //   console.log(obj);
          alert("Already exist");
          break;
        }
      }
      if (main) {
        let dupdata = [...data];
        dupdata.push(obj);
        setdata(dupdata);
        localStorage.setItem("Questions", JSON.stringify(dupdata));
      }
    } else {
      localStorage.setItem("Questions", JSON.stringify([obj]));
    }
    setquestion("");
    setoption1("");
    setoption2("");
    setoption3("");
    setoption4("");
    setradiovalue("");
  };
  console.log(showdata);

  const dltQuestion = (e) => {
    data.map((per, index) => {
      if (per.id === e) {
        console.log(per);
        console.log(e + " & " + per.id + "Matched at index :" + index);
        let dupdata = [...data];
        dupdata.splice(index, 1);
        setdata(dupdata);
        localStorage.setItem("Questions", JSON.stringify(dupdata));
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Input
            type="textarea"
            placeholder="add Question"
            onChange={(event) => setquestion(event.target.value)}
            value={question}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mt-4">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setradiovalue(option1)}
                    value={option1}
                  />{" "}
                </Label>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Option 1"
              value={option1}
              onChange={(event) => setoption1(event.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-4">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setradiovalue(option2)}
                    value={option2}
                  />{" "}
                </Label>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Option 2"
              onChange={(event) => setoption2(event.target.value)}
              value={option2}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-4">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setradiovalue(option3)}
                    value={option3}
                  />{" "}
                </Label>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Option 3"
              onChange={(event) => setoption3(event.target.value)}
              value={option3}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-4">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Label check>
                  <Input
                    type="radio"
                    name="radio1"
                    onChange={() => setradiovalue(option4)}
                    value={option4}
                  />
                </Label>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Option 4"
              onChange={(event) => setoption4(event.target.value)}
              value={option4}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Button color="outline-success" onClick={addQuestion}>
            Add Quiz
          </Button>
        </Col>
      </Row>

      <Row>
        {showdata.length ? (
          showdata.map((item, index) => {
            return (
              <Col md={12} key={index}>
                <Card className="mt-4">
                  <CardBody>
                    <CardTitle value={item.quizCat}>
                      <b> Question {index + 1} : </b> {item.Question} ?
                      <Button
                        color="outline-danger"
                        onClick={() => dltQuestion(item.id)}
                        className="question-trash"
                      >
                        <FaTrashAlt />
                      </Button>
                    </CardTitle>
                    <CardText>
                      <b>A : </b> {item.option1}
                    </CardText>
                    <CardText>
                      <b>B : </b>
                      {item.option2}
                    </CardText>
                    <CardText>
                      <b>C : </b>
                      {item.option3}
                    </CardText>
                    <CardText>
                      <b>D : </b>
                      {item.option4}
                    </CardText>
                    <CardText>
                      <b>Correct Answer : </b>
                      {item.correctAnswer}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        ) : (
          <Card className="mt-4">
            <CardBody>
              <h5>No Question Added</h5>
            </CardBody>
          </Card>
        )}
      </Row>
    </Container>
  );
};

export default Question;
