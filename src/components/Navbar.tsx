import Link from "next/link";
import { Bell, Compass, HeartHandshake, Home, ShieldCheck, ShoppingBag, Store, UserPlus, UserRound } from "lucide-react";

const links = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/servicios", label: "Servicios", icon: Store },
  { href: "/tienda", label: "Tienda", icon: ShoppingBag },
  { href: "/adopcion", label: "Adopcion", icon: HeartHandshake },
  { href: "/bienestar", label: "Confianza", icon: ShieldCheck },
  { href: "/match", label: "Explorar", icon: Compass },
  { href: "/dashboard", label: "Perfil", icon: UserRound },
  { href: "/registro", label: "Registro", icon: UserPlus }
];

export function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" href="/">
        <span>City</span>Pets
      </Link>
      <nav className="navlinks" aria-label="Navegacion principal">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href}>
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link className="nav-cta" href="/dashboard">
        <Bell size={17} /> Publicar
      </Link>
    </header>
  );
}
