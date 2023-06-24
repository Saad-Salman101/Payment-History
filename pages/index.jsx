import OrderTable from "@/components/OrderTable";
import { decremented, incremented } from "@/src/store/features/counterSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {


  return (
    <>
      <Head>
        <title>Boilerplate</title>
      </Head>
      <OrderTable/>
      <main>

      </main>
    </>
  );
}
