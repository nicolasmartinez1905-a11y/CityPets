"use client";

import { useEffect, useState } from "react";
import { getSupabase, hasSupabaseConfig } from "@/lib/supabase";

type UserRow = {
  id: string;
  nombre: string;
  email: string;
  ciudad: string;
  zona: string | null;
  verificado: boolean;
  role: string;
};

type ServiceRow = {
  id: string;
  titulo: string;
  ciudad: string;
  zona: string | null;
  categoria: string;
  verificado: boolean;
};

export function AdminPanel() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadAdminData() {
    setError("");
    if (!hasSupabaseConfig()) {
      setLoading(false);
      setError("Faltan variables de Supabase. Configurá .env.local para usar administración.");
      return;
    }

    const supabase = getSupabase();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user?.email_confirmed_at) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      setLoading(false);
      setError(profileError.message);
      return;
    }

    const admin = profile?.role === "admin";
    setIsAdmin(admin);

    if (!admin) {
      setLoading(false);
      return;
    }

    const [{ data: userData, error: usersError }, { data: serviceData, error: servicesError }] =
      await Promise.all([
        supabase.from("users").select("id,nombre,email,ciudad,zona,verificado,role").order("created_at", { ascending: false }),
        supabase.from("servicios").select("id,titulo,ciudad,zona,categoria,verificado").order("created_at", { ascending: false })
      ]);

    setLoading(false);
    if (usersError) return setError(usersError.message);
    if (servicesError) return setError(servicesError.message);
    setUsers(userData ?? []);
    setServices(serviceData ?? []);
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  async function verifyUser(userId: string, verificado: boolean) {
    const { error: updateError } = await getSupabase().from("users").update({ verificado }).eq("id", userId);
    if (updateError) return setError(updateError.message);
    setMessage(verificado ? "Usuario aprobado." : "Usuario marcado como no verificado.");
    await loadAdminData();
  }

  async function verifyService(serviceId: string, verificado: boolean) {
    const { error: updateError } = await getSupabase().from("servicios").update({ verificado }).eq("id", serviceId);
    if (updateError) return setError(updateError.message);
    setMessage(verificado ? "Servicio aprobado." : "Servicio marcado como no verificado.");
    await loadAdminData();
  }

  if (loading) return <article className="manifest-card">Cargando administración...</article>;

  if (!isAdmin) {
    return (
      <article className="manifest-card">
        <span className="eyebrow">Acceso restringido</span>
        <h2>Panel de administración protegido</h2>
        <p>Ingresá con una cuenta con rol <strong>admin</strong> en Supabase para revisar verificaciones.</p>
        {error ? <p className="form-error">{error}</p> : null}
      </article>
    );
  }

  return (
    <section className="launch-console">
      <div className="console-header">
        <div>
          <span className="eyebrow">Administración</span>
          <h2>Verificación de usuarios y servicios</h2>
          <p className="muted">Aprobá o rechazá perfiles antes de darles mayor visibilidad.</p>
        </div>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-success">{message}</p> : null}

      <div className="admin-list">
        {users.map((user) => (
          <article key={user.id} className="policy-card">
            <h3>{user.nombre}</h3>
            <p>{user.email} | {user.zona ?? "Ushuaia"}, {user.ciudad}</p>
            <p>Rol: <strong>{user.role}</strong> | Verificado: <strong>{user.verificado ? "sí" : "no"}</strong></p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={() => verifyUser(user.id, true)}>Aprobar</button>
              <button className="button ghost" type="button" onClick={() => verifyUser(user.id, false)}>Rechazar</button>
            </div>
          </article>
        ))}
      </div>

      <div className="admin-list">
        {services.map((service) => (
          <article key={service.id} className="policy-card">
            <h3>{service.titulo}</h3>
            <p>{service.categoria} | {service.zona ?? "Ushuaia"}, {service.ciudad}</p>
            <p>Verificado: <strong>{service.verificado ? "sí" : "no"}</strong></p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={() => verifyService(service.id, true)}>Aprobar</button>
              <button className="button ghost" type="button" onClick={() => verifyService(service.id, false)}>Rechazar</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
