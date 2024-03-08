import Layout from "./layout";
import MainLayout from "@/layout/MainLayout";
import Landing from "../views/landing";

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  return (
    <MainLayout>
      <Landing />
    </MainLayout>
  );
}
