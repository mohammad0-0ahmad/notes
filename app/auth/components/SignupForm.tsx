import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <Grid container item direction="column" justifyContent="center" alignContent="center">
      <Card>
        <CardContent>
          <h1>Create an Account</h1>
          <Form
            submitText="Create Account"
            schema={Signup}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                await signupMutation(values)
                props.onSuccess?.()
              } catch (error: any) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return { email: "This email is already being used" }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
          </Form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default SignupForm
