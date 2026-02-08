import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";
import About from "./Components/Aboutus/About";
import Accountancy from "./Components/Accountancy/Accountancy";
import AIChat from "./Components/AskImplement/Aiimplement";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Benefit from "./Components/Benefit-Slider/Benefit";
import Bio from "./Components/Biology/Bio";
import Business from "./Components/Business-Studies/Business";
import EventCard from "./Components/C-get/EventCard.js";
import CertificateButton from "./Components/Certificate/Certificate";
import Chemistry from "./Components/Chemistry/Chemistry";
import Economics from "./Components/Economics/Economics";
import English from "./Components/English/English";
import Footer from "./Components/Footer/Footer";
import Hindi from "./Components/Hindi/Hindi";
import Home from "./Components/Homepage/Home";
import FAQ from "./Components/Information/Information";
import Maths from "./Components/Mathematics/Maths";
import Navbar from "./Components/Navbar/Navbar";
import Physics from "./Components/Physics/Physics";
import LogicPuzzle from "./Components/Projectile/Aptitude";
import HumanBodyPuzzle from "./Components/Projectile/Bio";
import PeriodicTableQuiz from "./Components/Projectile/Chem";
import SentenceRace from "./Components/Projectile/English";
import FourCards from "./Components/Projectile/Main";
import HeroSection from "./Components/Q&G/Q&G";
import QuizApp from "./Components/Quiz/QuizPage";
import ScheduleMeeting from "./Components/ScheduleMeeting/ScheduleMeeting";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Subjects from "./Components/Subjects/Subject";
import TeachersCard from "./Components/Teachers/Teacher";

function AppRoutes() {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Main App Routes */}
        <Route
          exact
          path="/home"
          element={
            <>
              <Home />
              <Subjects />
              <HeroSection />
              <About />
              <TeachersCard />
              <Benefit />
              <EventCard />
              <FAQ />
            </>
          }
        />
        <Route
          path="/subject"
          element={
            <>
              <Home />
              <Subjects />
              <footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route
          path="/benefit"
          element={
            <>
              <Navbar />
              <Benefit />
            </>
          }
        />
        <Route
          path="/maths"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Maths />
            </>
          }
        />
        <Route
          path="/physics"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Physics />
            </>
          }
        />
        <Route
          path="/chemistry"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Chemistry />
            </>
          }
        />
        <Route
          path="/english"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <English />
            </>
          }
        />
        <Route
          path="/hindi"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Hindi />
            </>
          }
        />
        <Route
          path="/bio"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Bio />
            </>
          }
        />
        <Route
          path="/account"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Accountancy />
            </>
          }
        />
        <Route
          path="/business"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Business />
            </>
          }
        />
        <Route
          path="/economics"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <Economics />
            </>
          }
        />
        <Route
          path="/ask-question"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <AIChat />
            </>
          }
        />
        <Route
          path="/Quiz-page"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <QuizApp />
            </>
          }
        />
        <Route
          path="/teacher/:id"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <ScheduleMeeting />
            </>
          }
        />
        <Route
          path="/Chemistry-games"
          element={
            <>
              <ScrollToTop />
              <PeriodicTableQuiz />
            </>
          }
        />
        <Route
          path="/Biology-games"
          element={
            <>
              <ScrollToTop />
              <HumanBodyPuzzle />
            </>
          }
        />
        <Route
          path="/English-games"
          element={
            <>
              <ScrollToTop />
              <SentenceRace />
            </>
          }
        />
        <Route
          path="/Aptitude-games"
          element={
            <>
              <ScrollToTop />
              <LogicPuzzle />
            </>
          }
        />
        <Route
          path="/Main-games"
          element={
            <>
              <Navbar />
              <ScrollToTop />
              <FourCards />
            </>
          }
        />
        <Route
          path="/pdf"
          element={
            <>
              <Navbar />
              <ScrollToTop />
              <CertificateButton />
            </>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
