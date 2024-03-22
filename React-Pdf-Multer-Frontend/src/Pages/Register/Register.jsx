import React, { useContext } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Register = () => {
  const { createUser, verifyEmail } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password)
      .then((result) => {
        verifyEmail();
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch((error) => console.error("Error: ", error));
  };
  return (
    <div
      className="mx-auto border m-4 p-4 rounded bg-light"
      style={{ maxWidth: "500px" }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            name="photoURL"
            type="text"
            placeholder="Enter photo URL"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email address <Badge bg="danger">**</Badge>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Password <Badge bg="danger">**</Badge>
          </Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
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
        <Link to={"/login"}>Login Now</Link>
      </Form>
    </div>
  );
};

export default Register;
