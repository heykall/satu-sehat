import HeroSection from "../components/HeroDashBoard";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
      <>
      <Navbar/>
        <div className='w-full px-5 sm:px-[120px] pt-60 sm:pb-24'>
          <HeroSection />
        </div>
      </>
    );
  };
  
  export default Home;