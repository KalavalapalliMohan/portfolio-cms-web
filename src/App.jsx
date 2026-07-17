import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Resume from "./components/Resume";
import Certificates from "./components/Certificates";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <About />

        <Skills />

        <Resume />

        <Certificates />

        <Portfolio />

        <Services />

        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
