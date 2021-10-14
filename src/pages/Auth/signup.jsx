import Swal from "sweetalert2";
import { Input, Button, Col, Row, Container, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";

const SignUp = () => {
  let history = useHistory();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState([]);
  const [Login, setLogin] = useState("");
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("sign-up"));
    let loginCredential = localStorage.getItem("loginData");

    if (get && get.length) {
      setdata(get);
    }
    // console.log(loginCredential);
    // if (loginCredential) {
      // setLogin(loginCredential);
    //   history.push('/user-panel')
    // }
   
    
    // console.log(Login);
  }, []);
  const signup = () => {
    if (username === "" || email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Input Must not be empty!",
      });
      return false;
    }

    let obj = {
      id: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      name: username,
      email: email,
      pass: password,
    };

    let get = JSON.parse(localStorage.getItem("sign-up"));
    let main = true;

    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].email === email) {
          main = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Already Exist!",
          });
          break;
        }
        // console.log(get[i].email);
      }
      if (main) {
        let dupdata = [...data];
        dupdata.push(obj);
        setdata(dupdata);
        localStorage.setItem("sign-up", JSON.stringify(dupdata));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Registered Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/login-user");
      }
    } else {
      localStorage.setItem("sign-up", JSON.stringify([obj]));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Registered Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/login-user");
    }
    // console.log("Signed");
    // console.log(obj);
    // console.log(email);
    // console.log(password);
  };

  return (
    <Container>
      <div className="sign-up-text mt-4">
        <h1>SignUp Form</h1>
      </div>
      <div className="sign-up-box">
        <Row>
          <Col sm={12}>
            <Label>Username</Label>
            <Input
              type="text"
              onChange={(event) => setusername(event.target.value)}
            ></Input>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4" sm={12}>
            <Label>Email</Label>
            <Input
              type="email"
              onChange={(event) => setemail(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-4" sm={12}>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(event) => setpassword(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mt-4">
              Already a user? <a href="/login-user">click here</a> to login
            </p>
          </Col>

          <Col>
            <Button
              color="outline-success"
              onClick={signup}
              className="mt-4 signup-button"
            >
              SignUp
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default SignUp;
