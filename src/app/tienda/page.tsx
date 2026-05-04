import { Navbar } from "@/components/Navbar";
import { PageTransition, SlideUp } from "@/components/Motion";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/platformData";

const categories = ["Alimentos", "Accesorios", "Ropa", "Caniles", "Juguetes"];

export default function StorePage() {
  return (
    <PageTransition className="page-shell">
      <Navbar />
      <section className="page-title">
        <span className="eyebrow">Tienda CityPets</span>
        <h1>Productos para la vida urbana con mascotas</h1>
        <p>Un marketplace tipo MercadoLibre, con vendedores, resenas y contacto directo.</p>
      </section>
      <div className="category-strip">
        {categories.map((category) => <span key={category}>{category}</span>)}
      </div>
      <section className="grid three">
        {products.map((product, index) => (
          <SlideUp key={product.id} delay={index * 0.03}>
            <ProductCard product={product} />
          </SlideUp>
        ))}
      </section>
    </PageTransition>
  );
}
