import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const { signIn, providerLogin, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const googleProvider = new GoogleAuthProvider();

  const returnToCurrentLocation = (user) => {
    if (user.emailVerified) {
      navigate(from, { replace: true });
    } else {
      alert("Your Email is not verified, Check Email");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError("");
        returnToCurrentLocation(user);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleGoogleLogin = (event) => {
    event.preventDefault();

    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        returnToCurrentLocation(user);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  return (
    <div
      className="mx-auto border m-4 p-4 rounded bg-light"
      style={{ maxWidth: "500px" }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Agree to {Terms and Conditions}" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <br />
        <Link>Forgot password?</Link> <br />
        <Link to={"/register"}>Register Now</Link>
      </Form>
      <br />
      <Button onClick={handleGoogleLogin} className="w-100">
        Google Login
      </Button>
      <br />
      <Form.Text className="text-danger">{error}</Form.Text>
    </div>
  );
};

export default Login;
