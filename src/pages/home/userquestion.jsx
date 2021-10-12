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
//   import { FaTrashAlt } from "react-icons/fa";
import "./style.css";

const UserQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [showdata, setShowData] = useState(null);
  const [radiovalue, setradiovalue] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("Questions"));
    let getvalue = JSON.parse(localStorage.getItem("userStartQuiz"));
    // let arr = [];
    console.log(getvalue.quizId);
    if (get && get.length) {
      let arr = get.filter((quiz) => {
        return quiz.qcid === getvalue.quizId;
      });
      console.log(arr);
      setQuestions(arr);
      setShowData(arr[index]);
      //   for (let i = 0; i < get.length; i++) {
      //     if (get[i].qcid === getvalue.quizId) {
      //       arr.push(get[i]);
      //       console.log(get[i]);
      //     }
      //   }
      //   setshowdata(arr);
    }
  }, []);

  const nextData = () => {

          setShowData(questions[index + 1]);
          setIndex(index + 1);
  }
//   setTimeout(() => {
//     console.log({ questions });
//   }, 3000);

  console.log(showdata);
  return (
    <Container>
      {/* {showdata?.map((item, ind) => ( */}
      {!showdata ? (
        "loading..."
      ) : (
        <div>
          <Row className="mt-4">
            <Col md={6}>
              <div>
                <b>Question </b>
                {showdata?.Question} ?
              </div>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        onChange={() => setradiovalue(showdata?.option1)}
                        value={showdata?.option1}
                      />{" "}
                    </Label>
                  </InputGroupText>
                </InputGroupAddon>
                <Input disabled value={showdata?.option1} />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        onChange={() => setradiovalue(showdata?.option2)}
                        value={showdata?.option2}
                      />{" "}
                    </Label>
                  </InputGroupText>
                </InputGroupAddon>
                <Input disabled value={showdata?.option2} />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        onChange={() => setradiovalue(showdata?.option3)}
                        value={showdata?.option3}
                      />{" "}
                    </Label>
                  </InputGroupText>
                </InputGroupAddon>
                <Input disabled value={showdata?.option3} />
              </InputGroup>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        onChange={() => setradiovalue(showdata?.option4)}
                        value={showdata?.option4}
                      />{" "}
                    </Label>
                  </InputGroupText>
                </InputGroupAddon>
                <Input disabled value={showdata?.option4} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
              <Col className="mt-4">
                <Button color="outline-success" onClick={nextData}>NEXT</Button>
              </Col>
          </Row>
        </div>
      )}
      {/* ))} */}
    </Container>
  );
};
export default UserQuestion;
