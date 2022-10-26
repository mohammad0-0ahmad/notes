import { BlitzPage } from "@blitzjs/next"
import { useTranslation } from "@m0-0a/next-intl"
import Head from "app/core/components/Head"

const Home: BlitzPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title="page.Home.title" />
    </>
  )
}

export default Home
