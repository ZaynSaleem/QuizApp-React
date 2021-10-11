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
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import reactImg from "../../assets/javascript.jpg";

const Subcategory = () => {
  const [subcategory, setsubcategory] = useState("");
  const [data, setdata] = useState([]);
  const [showdata, setshowdata] = useState([]);

  let history = useHistory();

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("QuizCategory"));
    let getvalue = JSON.parse(localStorage.getItem("selectedvalue"));
    let arr = [];
    if (get && get.length) {
    for (let i = 0; i < get.length; i++) {
      if (get[i].qid === getvalue) {
        arr.push(get[i])
  // console.log(get[i]);
        
        setshowdata(arr)
      }
      
    }
    setdata(get);
  }
  console.log(getvalue);
}, []);

  const addsubcategory = () => {
    let getvalue = JSON.parse(localStorage.getItem("selectedvalue"));
    let obj = {
      id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      qid: getvalue,
      quizCat: subcategory,
    };

    if (subcategory == "") {
      alert("Please Add Quiz");
      return false;
    }
    let get = JSON.parse(localStorage.getItem("QuizCategory"));
    let main = true;

    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].quizCat == obj.quizCat) {
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
        let ls = localStorage.setItem("QuizCategory", JSON.stringify(dupdata));
      }
    } else {
      let ls = localStorage.setItem("QuizCategory", JSON.stringify([obj]));
    }
  };


 const addMoreDetail = (q_id) =>{
    // console.log(q_id);

    localStorage.setItem('quizCatId',JSON.stringify(q_id));
    history.push("/add-question")
 }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Input
            onChange={(event) => setsubcategory(event.target.value)}
            value={subcategory}
            placeholder="Create Quiz"
          />
        </Col>

        <Col md={4}>
          <Button color="outline-primary" onClick={addsubcategory}>
            Create Sub-Quiz
          </Button>
        </Col>
      </Row>
      <Row>
        {showdata.length
          ? showdata.map((item, index) => {
              return (
                <Col md={4} key={index}>
                  <Card>
                    <CardImg top width="100%" src={reactImg} alt="Card image cap" />
                    <CardBody>
                      <CardTitle tag="h5" value={item.quizCat}>
                        {item.quizCat}
                      </CardTitle>

                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button color="outline-success" onClick={() => addMoreDetail(item.id)}>Add More details</Button>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default Subcategory;
