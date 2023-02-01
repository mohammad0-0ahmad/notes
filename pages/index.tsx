import { BlitzPage } from "@blitzjs/next";
import EntryForm from "app/auth/components/EntryForm";
import Head from "app/core/components/Head";
import { useSession } from "next-auth/react";

const Home: BlitzPage = () => {
  const { status } = useSession();

  return status === "authenticated" ? (
    <div>Hello Next.js!</div>
  ) : (
    <>
      <Head title="page.Home.title" />
      <EntryForm />
    </>
  );
};

export default Home;
