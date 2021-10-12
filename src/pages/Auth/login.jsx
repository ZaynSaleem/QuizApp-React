import Swal from "sweetalert2";
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
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState([]);

  let history = useHistory();
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("sign-up"));
    if (get && get.length) {
      setdata(get);
    }
  }, []);

  const loginUser = () => {
    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Input must not be empty!",
      });
      return false;
    }
    let obj = {
      id: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      email: email,
      password: password,
    };
    // console.log(obj);

    let get = JSON.parse(localStorage.getItem("sign-up"));
    let main = true;

    if (get && get.length) {
      for (let i = 0; i < get.length; i++) {
        if (get[i].email === obj.email && get[i].pass === obj.password) {
          main = false;
          localStorage.setItem("loginData", JSON.stringify(obj));
          history.push("/user-panel");
          //   Swal.fire({
          //     icon: "error",
          //     title: "Oops...",
          //     text: "Already Exist!",
          //   });
          break;
        }
        // console.log(get[i].email);
      }
      if (main) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect Email or password!",
        });
      }
    }
  };

  return (
    <Container>
      <div className="login-text mt-4">
        <h1>Login Form</h1>
      </div>
      <div className="login-box">
        <Row>
          <Col className="mt-4">
            <Label>Email</Label>
            <Input
              type="email"
              onChange={(event) => setemail(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-4">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(event) => setpassword(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              color="outline-success"
              onClick={loginUser}
              className="mt-4 login-button"
            >
              Login
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default Login;
