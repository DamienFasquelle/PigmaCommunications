import Footer from "../../components/public/Footer";
import DynamicHeader from "../../components/user/DynamicHeader";
import Description from "./Description";


function Homepage() {
  return (
    <>
      <DynamicHeader />
      <main>
        <Description />
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
