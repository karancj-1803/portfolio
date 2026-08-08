import Background from '@/components/Background';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import About from '@/components/About';
import Journey from '@/components/Journey';
import Capabilities from '@/components/Capabilities';
import Recognition from '@/components/Recognition';
import BeyondCode from '@/components/BeyondCode';
import Contact from '@/components/Contact';

function App() {
  return (
    <>
      <Background />
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <SelectedWork />
        <About />
        <Journey />
        <Capabilities />
        <Recognition />
        <BeyondCode />
        <Contact />
      </main>
    </>
  );
}

export default App;
