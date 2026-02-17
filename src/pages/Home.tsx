import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";

type HomeProps = {
  cartCount: number;
  onAddToCart: (productId: number) => void;
};

export default function Home({ cartCount, onAddToCart }: HomeProps) {
  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <FeaturedProducts onAddToCart={onAddToCart} />
        <About />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
