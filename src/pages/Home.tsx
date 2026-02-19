import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";

type HomeProps = {
  onAddToCart: (productId: number, stock: number) => void;
};

export default function Home({ onAddToCart }: HomeProps) {
  return (
    <main>
      <Hero />
      <FeaturedProducts onAddToCart={onAddToCart} />
      <About />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
