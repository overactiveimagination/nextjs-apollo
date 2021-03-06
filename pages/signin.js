import React from "react";
import Link from "next/link";
import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import Field from "../components/field";
import { getErrorMessage } from "../lib/form";
import { useRouter } from "next/router";
import tw, { css } from "twin.macro";

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value
        }
      });
      if (data.signIn.user) {
        await router.push("/");
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <div css={[tw`flex flex-col items-center py-16`]}>
      <div tw="flex flex-col justify-center">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          {errorMsg && <p>{errorMsg}</p>}
          <Field
            name="email"
            type="email"
            autoComplete="email"
            required
            label="Email"
          />
          <Field
            name="password"
            type="password"
            autoComplete="password"
            required
            label="Password"
          />
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </button>{" "}
          or{" "}
          <Link href="signup">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign up
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withApollo(SignIn);
