import {
  Input,
  Button,
  Col,
  Row,
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import reactImg from "../../assets/javascript.jpg";
import "./style.css";
import Swal from "sweetalert2";


const Subcategory = () => {
  const [subcategory, setsubcategory] = useState("");
  const [data, setdata] = useState([]);
  const [showdata, setshowdata] = useState([]);
  const [user, setuser] = useState([]);
  const [Key, setKey] = useState("");
  const [modal, setModal] = useState(false);
  const [UserKey, setUserKey] = useState("");
  // console.log(data);
  const toggle = () => setModal(!modal);

  let history = useHistory();

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("QuizCategory"));
    let getvalue = JSON.parse(localStorage.getItem("selectedvalue"));
    let arr = [];
    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].qid === getvalue) {
          arr.push(get[i]);
          // console.log(get[i]);

          setshowdata(arr);
        }
      }
      setdata(get);
    }
    let user = JSON.parse(localStorage.getItem("loginData"));
    if (user) {
      setuser(user);
    }
  }, []);

  const addsubcategory = () => {
    let getvalue = JSON.parse(localStorage.getItem("selectedvalue"));
    let obj = {
      id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      qid: getvalue,
      quizCat: subcategory,
      key: Key,
    };

    if (subcategory === "") {
      alert("Please Add Quiz");
      return false;
    }
    let get = JSON.parse(localStorage.getItem("QuizCategory"));
    let main = true;

    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].quizCat === obj.quizCat) {
          main = false;
          console.log(obj);
          alert("Already exist");
          break;
        }
      }
      if (main) {
        let dupdata = [...data];
        dupdata.push(obj);
        setdata(dupdata);
        localStorage.setItem("QuizCategory", JSON.stringify(dupdata));
      }
    } else {
      localStorage.setItem("QuizCategory", JSON.stringify([obj]));
    }
  };
  // console.log(Key);
  const addMoreDetail = (q_id) => {
    // console.log(q_id);

    localStorage.setItem("quizCatId", JSON.stringify(q_id));
    history.push("/add-question");
  };

  const startQuiz = (itemId, userId) => {
    let d = data.filter((item) => {
      return item.key === UserKey && item.id === itemId;
    });
    if (d && d.length) {
      let obj = {
        quizId: itemId,
        userid: userId,
      };
      localStorage.setItem("userStartQuiz", JSON.stringify(obj));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Key verified successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/user-quiz");
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect KEY!",
      });
    }
  };

  return (
    <div>
      <h4 className="admin-index-text">QUIZ APP </h4>

      <h6 className="admin-index-subject">QUIZEZ</h6>

      <div>
        <Container>
          {user.email === "Admin@gmail.com" ? (
            <div>
              <Row className="admin-input-subcat">
                <Col md={8}>
                  <Input
                    onChange={(event) => setsubcategory(event.target.value)}
                    value={subcategory}
                    placeholder="ADD QUIZ"
                  />
                </Col>

                <Col md={2}>
                  <Input
                    onChange={(event) => setKey(event.target.value)}
                    value={Key}
                    maxLength="6"
                    placeholder="ADD KEY"
                  />
                </Col>

                <Col md={2}>
                  <Button color="outline-success" onClick={addsubcategory}>
                    ADD QUIZ
                  </Button>
                </Col>
              </Row>

              <Row>
                {showdata.length
                  ? showdata.map((item, index) => {
                      return (
                        <Col md={4} key={index}>
                          <Card>
                            <CardImg
                              top
                              width="100%"
                              src={reactImg}
                              alt="Card image cap"
                            />
                            <CardBody>
                              <CardTitle tag="h5" value={item.quizCat}>
                                <b>QUIZ : </b> {item.quizCat}
                              </CardTitle>

                              <CardText>
                                <b>KEY : </b> {item.key}
                              </CardText>
                              <Button
                                color="outline-success"
                                onClick={() => addMoreDetail(item.id)}
                              >
                                ADD QUESTIONS
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </div>
          ) : (
            <Row>
              {showdata.length
                ? showdata.map((item, index) => {
                    return (
                      <Col md={4} key={index}>
                        <Card>
                          <CardImg
                            top
                            width="100%"
                            src={reactImg}
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle tag="h5" value={item.quizCat}>
                              {item.quizCat}
                            </CardTitle>

                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                            <Button
                              color="outline-success"
                              // onClick={() => startQuiz(item.id, user.id) }
                              onClick={toggle}
                            >
                              Start Quiz
                            </Button>
                          </CardBody>
                        </Card>
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalHeader toggle={toggle}>ENTER KEY</ModalHeader>
                          <ModalBody>
                            <Input
                              onChange={(event) =>
                                setUserKey(event.target.value)
                              }
                              
                              maxLength="6"
                              placeholder="ADD KEY"
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={() => startQuiz(item.id, user.id)}
                            >
                              VERIFIY KEY
                            </Button>{" "}
                            <Button color="secondary" onClick={toggle}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Col>
                    );
                  })
                : null}
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Subcategory;
