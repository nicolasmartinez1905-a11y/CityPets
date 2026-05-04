import { Navbar } from "@/components/Navbar";
import { OptimizedHero } from "@/components/OptimizedHero";
import { PageTransition, SlideUp } from "@/components/Motion";
import { SupabaseFeed } from "@/components/SupabaseFeed";

export default function FeedPage() {
  return (
    <PageTransition className="page-shell social-shell">
      <Navbar />
      <OptimizedHero compact showPreview={false} />

      <section className="feed-layout">
        <div className="feed-main">
          <SlideUp>
            <div className="feed-composer">
              <div className="avatar placeholder-avatar">CP</div>
              <div>
                <strong>¿Qué está pasando en tu paseo por Ushuaia?</strong>
                <p>Compartilo con tutores de tu zona.</p>
              </div>
              <a href="/dashboard" className="button">
                Publicar
              </a>
            </div>
          </SlideUp>

          <SupabaseFeed />
        </div>

        <aside className="feed-sidebar">
          <SlideUp>
            <section className="sidebar-card city-card">
              <span className="eyebrow">Ushuaia ahora</span>
              <h2>La ciudad también es de ellos 🐾</h2>
              <p>Feed real conectado a Supabase para tutores, mascotas y servicios de Ushuaia.</p>
            </section>
          </SlideUp>

          <section className="sidebar-card">
            <div className="section-heading compact">
              <h2>Cómo participar</h2>
            </div>
            <ol className="feature-list">
              <li>Registrate y confirmá tu email.</li>
              <li>Completá tu perfil local.</li>
              <li>Registrá tu mascota.</li>
              <li>Publicá fotos, likes y comentarios reales.</li>
            </ol>
          </section>

          <section className="sidebar-card">
            <div className="section-heading compact">
              <h2>Ciudad activa</h2>
            </div>
            <p className="muted">
              Las publicaciones nuevas se guardan en la base de datos y respetan políticas RLS.
            </p>
          </section>
        </aside>
      </section>
    </PageTransition>
  );
}
