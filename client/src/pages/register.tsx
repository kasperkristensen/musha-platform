import React from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import styled from "styled-components";
import theme from "../styles/theme";

interface registerProps {}

const RegisterForm = styled.div`
  width: 400px;
  margin: auto;

  button {
    ${theme.mixins.smallButton};
  }
`;

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <RegisterForm>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            console.log("im here");
            router.push("/");
          }
        }}
      >
        {() => (
          <Form>
            <InputField
              name="username"
              label="Username"
              autocomplete="username"
            />
            <InputField name="email" label="Email" autocomplete="email" />
            <InputField
              name="password"
              label="Password"
              type="password"
              autocomplete="new-password"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </RegisterForm>
  );
};

export default Register;
