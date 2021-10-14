// import Swal from "sweetalert2";
import reactImg from "../../assets/ReactJs.png";
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
} from "reactstrap";
// import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Index = () => {
  const [data, setdata] = useState([]);
  const [mainQuiz, setmainQuiz] = useState("");
  const [user, setuser] = useState("");
  let history = useHistory();
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("Quiz"));
    if (get && get.length) {
      setdata(get);
    }
    let user = JSON.parse(localStorage.getItem("loginData"));
    if (user) {
      setuser(user);
    }
    else{
      history.push("/login-user");
    }
  }, []);

  const valueGet = (id) => {
    // console.log(id);
    localStorage.setItem("selectedvalue", JSON.stringify(id));
    history.push("/quiz-subcategory");
  };

  const logOut = () => {
    localStorage.setItem('loginData',JSON.stringify(""));
    history.push("/login-user");
  }
  

  const createquiz = () => {
    if (mainQuiz === "") {
      alert("Please Add Quiz");
      return false;
    }
    let obj = {
      id: Math.floor(Math.random() * 100),
      quiz: mainQuiz,
    };
    // console.log(obj);
    let get = JSON.parse(localStorage.getItem("Quiz"));
    let main = true;

    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].quiz === obj.quiz) {
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
        localStorage.setItem("Quiz", JSON.stringify(dupdata));
        //   console.log("True data");
      }
    } else {
      localStorage.setItem("Quiz", JSON.stringify([obj]));
    }
    // console.log(main);
  };
  // console.log(data);

  return (
    <div>
      {user.email === "Admin@gmail.com" ? (
        <div>
          <h4 className="admin-index-text">QUIZ APP - ADMIN PANEL</h4>
          <Button color="outline-success" className="Logout-btn" onClick={logOut}>
                  Logout  
                </Button>
          <h6 className="admin-index-subject">SUBJECT </h6>

          <div>
            <Row className="mt-4 admin-input">
              <Col md={8}>
                <Input
                  onChange={(event) => setmainQuiz(event.target.value)}
                  value={mainQuiz}
                  placeholder="ADD SUBJECT"
                />
              </Col>

              <Col md={4}>
                <Button color="outline-dark" onClick={createquiz}>
                  ADD SUBJECT
                </Button>
              </Col>
            </Row>
            <div>
              <Container>
                <Row className="mt-4">
                  {data.length
                    ? data.map((item, index) => {
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
                                <CardTitle value={item.quiz}>
                                  <b>Subject : </b> {item.quiz}
                                </CardTitle>

                                <CardText>
                                  Some quick example text to build on the card
                                  title and make up the bulk of the card's
                                  content.
                                </CardText>
                                <Button
                                  color="outline-success"
                                  onClick={() => valueGet(item.id)}
                                >
                                  Show Quiz
                                </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        );
                      })
                    : null}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Row >
            
            <div className="admin-index-text">

              QUIZ APP - {user.email}
              
                <Button color="outline-success" className="Logout-btn" onClick={logOut}>
                  Logout  
                </Button>
                
            </div>
              
            </Row>
        <Row>

            <h6 className="admin-index-subject">SUBJECT</h6>
        </Row>
          </div>
          <Container>
            <Row className="mt-4">
              {data.length
                ? data.map((item, index) => {
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
                            <CardTitle value={item.quiz}>
                              <b>Subject : </b> {item.quiz}
                            </CardTitle>

                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                            <Button
                              color="outline-success"
                              onClick={() => valueGet(item.id)}
                            >
                              Show Quiz
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Index;
