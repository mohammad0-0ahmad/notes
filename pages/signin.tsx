import { BlitzPage } from "@blitzjs/next"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"

const SignInPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    </>
  )
}

export default SignInPage
