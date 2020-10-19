import React from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import styled from "styled-components";
import theme from "../styles/theme";

const RegisterForm = styled.div`
  width: 400px;
  margin: auto;
  color: white;

  button {
    ${theme.mixins.smallButton};
  }
`;

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <RegisterForm>
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            console.log("im here");
            router.push("/");
          }
        }}
      >
        {() => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="Username or email"
              autocomplete="username"
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              autocomplete="old-password"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </RegisterForm>
  );
};

export default Login;
