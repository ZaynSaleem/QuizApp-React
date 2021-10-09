import Swal from "sweetalert2";
import reactImg from "../../assets/ReactJs.png";
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
import { useEffect,useState } from "react";

const Index = () => {
  const [data, setdata] = useState([]);
  const [mainQuiz, setmainQuiz] = useState("");
  
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("Quiz"));
    setdata(get);
  },[]);
  
  const valueGet = () => {
    
  }
  const createquiz = () => {
    if (mainQuiz == "") {
      alert("Please Add Quiz")
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
        if (get[i].quiz == obj.quiz) {
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
        let ls = localStorage.setItem("Quiz", JSON.stringify(dupdata));
        //   console.log("True data");
      }
    } else {
      let ls = localStorage.setItem("Quiz", JSON.stringify([obj]));
    }
    // console.log(main);
  };
  // console.log(data);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Input
            onChange={(event) => setmainQuiz(event.target.value)}
            value={mainQuiz}
            placeholder="Create Quiz"
          />
        </Col>

        <Col md={4}>
          <Button color="outline-primary" onClick={createquiz}>
            Create Quiz
          </Button>
        </Col>
      </Row>
      <div>
        <Row className="mt-4">

          {data.map((item, index) => {
            return(
            <Col md={4} key={index}>
            <Card >
              <CardImg top width="100%" src={reactImg} alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5" value={item.quiz}>{item.quiz}</CardTitle>

                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button color="outline-success" >Show Quiz</Button>
              </CardBody>
            </Card>
          </Col>
            )
          })}
        </Row>
      </div>
    </Container>
  );
};

export default Index;
