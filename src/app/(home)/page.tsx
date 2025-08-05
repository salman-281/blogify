
import HeroSection from "@/components/HeroSection";
import MixCat from "@/components/MixCat";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";

export default function Home() {
  return (
   <div>
     <HeroSection/>
     <Section1/>
     <Section2/>
     
     <div className="md:flex block justify-between max-w-7xl mx-auto items-start">
      <MixCat/>
     </div>
   </div>
  );
}
