import Link from "next/link";
import { Camera, Plus } from "lucide-react";
import { AIAssistant } from "@/components/AIAssistant";
import { LaunchConsole } from "@/components/LaunchConsole";
import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <main className="page-shell social-shell">
      <Navbar />

      <section className="profile-cover">
        <div className="profile-cover-copy">
          <span className="eyebrow">Mi CityPets</span>
          <h1>Tu base real para participar en Ushuaia</h1>
          <p>
            Completá tu perfil, registrá mascotas, publicá en el feed y ofrecé servicios con datos guardados en Supabase.
          </p>
          <div className="profile-actions">
            <Link className="button" href="/feed">
              <Camera size={18} /> Ver feed
            </Link>
            <Link className="button glass" href="/match">
              <Plus size={18} /> Buscar compañeros
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <LaunchConsole />
      </section>

      <section className="section">
        <AIAssistant />
      </section>
    </main>
  );
}
