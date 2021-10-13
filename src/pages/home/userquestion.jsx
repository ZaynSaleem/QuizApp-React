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
  const [count, setCount] = useState(0);
  const [UserStartQuiz, setUserStartQuiz] = useState([]);
  const [UserAnswer, setUserAnswer] = useState([]);
  const [Result, setResult] = useState(null);
  const [Data, setData] = useState([]);

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("Questions"));
    let getvalue = JSON.parse(localStorage.getItem("userStartQuiz"));
    let getQuizTest = JSON.parse(localStorage.getItem("userQuizData"));
    if (getQuizTest && getQuizTest.length) {
      let quizResult = getQuizTest.filter((test) => {
        return (
          test.userid === getvalue.userid && test.quizid === getvalue.quizId
        );
      });
      setResult(quizResult[0]);
      setData(getQuizTest);
    }
    if (get && get.length) {
      let arr = get.filter((quiz) => {
        return quiz.qcid === getvalue.quizId;
      });
      setQuestions(arr);
      setShowData(arr[index]);
      setUserStartQuiz(getvalue);
    }
  }, []);

  const nextData = () => {
    let arr = questions.filter((ques) => {
      return ques.correctAnswer === radiovalue;
    });
    if (arr && arr.length) {
      setCount(1 + count);
    }

    setradiovalue("");
    setIndex(index + 1);
    setShowData(questions[index + 1]);
  };

  const finishQuiz = () => {
    let obj = {
      userid: UserStartQuiz.userid,
      quizid: UserStartQuiz.quizId,
      obtainedScore: count + 1,
      totalScore: questions.length,
    };

    let get = JSON.parse(localStorage.getItem("userQuizData"));
    let getvalue = JSON.parse(localStorage.getItem("userStartQuiz"));
    let main = true;
    if (get && get.length) {
      if (main) {
        let dupData = [...Data];
        dupData.push(obj);
        setData(dupData);
        localStorage.setItem("userQuizData", JSON.stringify(dupData));
      }
    }

    // setUserAnswer(obj);
    // localStorage.setItem("userQuizData", JSON.stringify([obj]));
  };
  // console.log(Result);

  return (
    <Container>
      {!Result ? (
        !showdata ? (
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
                {radiovalue ? (
                  questions.length <= index + 1 ? (
                    <Button color="outline-success" onClick={finishQuiz}>
                      FINISH
                    </Button>
                  ) : (
                    <Button color="outline-success" onClick={nextData}>
                      NEXT
                    </Button>
                  )
                ) : (
                  <Button color="outline-success" onClick={nextData} disabled>
                    NEXT
                  </Button>
                )}

                {}
              </Col>
            </Row>
          </div>
        )
      ) : (
        <Row>
          <Col md={6}>
            <h4>{Result.obtainedScore}</h4>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default UserQuestion;
