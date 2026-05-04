import Link from "next/link";
import { Bell, ChevronDown, Compass, HeartHandshake, Home, PawPrint, ShieldCheck, ShoppingBag, Store, UserRound } from "lucide-react";

const primaryLinks = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/match", label: "Explorar", icon: Compass },
  { href: "/#mascotas", label: "Mascotas", icon: PawPrint },
  { href: "/dashboard", label: "Perfil", icon: UserRound }
];

const secondaryLinks = [
  { href: "/tienda", label: "Tienda", icon: ShoppingBag },
  { href: "/servicios", label: "Servicios", icon: Store },
  { href: "/bienestar", label: "Confianza", icon: ShieldCheck },
  { href: "/adopcion", label: "Adopción", icon: HeartHandshake }
];

export function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" href="/">
        <span>City</span>Pets
      </Link>
      <nav className="navlinks" aria-label="Navegacion principal">
        {primaryLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href}>
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
        <details className="nav-secondary">
          <summary>
            Más
            <ChevronDown size={15} />
          </summary>
          <div className="nav-secondary-menu">
            {secondaryLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link key={link.href} href={link.href}>
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </details>
      </nav>
      <Link className="nav-cta" href="/dashboard">
        <Bell size={17} /> Publicar
      </Link>
    </header>
  );
}
