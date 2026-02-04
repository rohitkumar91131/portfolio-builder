import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact"; 

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Education />
      <Contact /> 
    </main>
  );
}