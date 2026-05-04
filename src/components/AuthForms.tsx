"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSupabase,
  getSupabaseConfigDiagnostics,
  hasSupabaseConfig,
  logSupabaseConfigDiagnostics
} from "@/lib/supabase";
import { emailIsValid } from "@/lib/localAppState";

function missingConfigMessage() {
  const diagnostics = getSupabaseConfigDiagnostics();

  if (diagnostics.anonKeyLooksTruncated || diagnostics.anonKeyJwtSegments !== 3) {
    return "La anon key de Supabase parece incompleta o cortada. Pegá la NEXT_PUBLIC_SUPABASE_ANON_KEY completa en .env.local.";
  }

  if (!diagnostics.urlEndsWithSupabaseCo) {
    return "La URL de Supabase debe tener formato https://tu-proyecto.supabase.co.";
  }

  if (diagnostics.urlProjectRef !== diagnostics.anonKeyProjectRef) {
    return "La URL de Supabase no coincide con el proyecto de la anon key. Revisá el project ref en .env.local.";
  }

  return "Faltan variables de Supabase. Configurá SUPABASE_URL y SUPABASE_ANON_KEY en .env.local.";
}

export function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    logSupabaseConfigDiagnostics("registro");
    if (!hasSupabaseConfig()) return setError(missingConfigMessage());

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");
    const zone = String(form.get("zone") ?? "Centro");

    if (name.length < 2) return setError("Ingresá tu nombre completo.");
    if (!emailIsValid(email)) return setError("Ingresá un email válido.");
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");

    setLoading(true);
    const supabase = getSupabase();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre: name, ciudad: "Ushuaia", zona: zone }
      }
    });

    if (signUpError) {
      setLoading(false);
      return setError(signUpError.message);
    }

    if (data.user) {
      await supabase.from("users").upsert({
        id: data.user.id,
        nombre: name,
        email,
        ciudad: "Ushuaia",
        zona: zone,
        verificado: false
      });
    }

    setLoading(false);
    setMessage("Cuenta creada. Revisá tu email para confirmar el registro.");
  }

  return (
    <form className="launch-form" onSubmit={submit}>
      <h2>Crear cuenta en CityPets Ushuaia</h2>
      <input name="name" placeholder="Nombre y apellido" />
      <input name="email" placeholder="Email" type="email" />
      <input name="password" placeholder="Contraseña" type="password" />
      <select name="zone" defaultValue="Centro">
        {["Centro", "Andorra", "Pipo", "Costanera", "Bahía Encerrada", "Kuanip"].map((zone) => (
          <option key={zone}>{zone}</option>
        ))}
      </select>
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-success">{message}</p> : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Creando..." : "Registrarme"}
      </button>
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    logSupabaseConfigDiagnostics("login");
    if (!hasSupabaseConfig()) return setError(missingConfigMessage());

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");

    setLoading(true);
    const supabase = getSupabase();
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (loginError) return setError(loginError.message);
    if (!data.user?.email_confirmed_at) {
      await supabase.auth.signOut();
      return setError("Necesitás confirmar tu email antes de ingresar.");
    }

    await supabase.from("users").upsert(
      {
        id: data.user.id,
        nombre: String(data.user.user_metadata?.nombre ?? data.user.email ?? "Usuario CityPets"),
        email: data.user.email ?? email,
        ciudad: String(data.user.user_metadata?.ciudad ?? "Ushuaia"),
        zona: String(data.user.user_metadata?.zona ?? "Centro"),
        verificado: false
      },
      { onConflict: "id" }
    );

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="launch-form" onSubmit={submit}>
      <h2>Ingresar</h2>
      <input name="email" placeholder="Email" type="email" />
      <input name="password" placeholder="Contraseña" type="password" />
      {error ? <p className="form-error">{error}</p> : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export function RecoveryForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    logSupabaseConfigDiagnostics("recuperacion");
    if (!hasSupabaseConfig()) return setError(missingConfigMessage());

    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!emailIsValid(email)) return setError("Ingresá un email válido.");

    setLoading(true);
    const { error: recoveryError } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined
    });
    setLoading(false);

    if (recoveryError) return setError(recoveryError.message);
    setMessage("Si el email existe, enviamos instrucciones de recuperación.");
  }

  return (
    <form className="launch-form" onSubmit={submit}>
      <h2>Recuperar contraseña</h2>
      <input name="email" placeholder="Email" type="email" />
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-success">{message}</p> : null}
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar instrucciones"}
      </button>
    </form>
  );
}
