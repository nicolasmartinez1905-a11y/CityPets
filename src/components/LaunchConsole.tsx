"use client";

import { FormEvent, useEffect, useState } from "react";
import { LogOut, Plus } from "lucide-react";
import { cityZones } from "@/data/mockData";
import { getSupabase, hasSupabaseConfig, type CityPetsDatabase } from "@/lib/supabase";

type Profile = CityPetsDatabase["public"]["Tables"]["users"]["Row"];
type PetRow = CityPetsDatabase["public"]["Tables"]["mascotas"]["Row"];

async function uploadFile(bucket: string, file: File | null, userId: string) {
  if (!file || file.size === 0) return null;
  const supabase = getSupabase();
  const path = `${userId}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function LaunchConsole() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pets, setPets] = useState<PetRow[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!hasSupabaseConfig()) {
        setError("Faltan variables de Supabase para usar el panel.");
        setLoading(false);
        return;
      }
      const supabase = getSupabase();
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        setLoading(false);
        return;
      }
      if (!user.email_confirmed_at) {
        setError("Confirmá tu email antes de operar tu cuenta.");
        setLoading(false);
        return;
      }
      const { data: profileData } = await supabase.from("users").select("*").eq("id", user.id).maybeSingle();
      if (profileData) {
        setProfile(profileData);
      } else {
        const { data: insertedProfile } = await supabase
          .from("users")
          .insert({
            id: user.id,
            nombre: String(user.user_metadata?.nombre ?? user.email ?? "Usuario CityPets"),
            email: user.email ?? "",
            ciudad: "Ushuaia",
            zona: String(user.user_metadata?.zona ?? "Centro")
          })
          .select("*")
          .single();
        if (insertedProfile) setProfile(insertedProfile);
      }
      const { data: petData } = await supabase.from("mascotas").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setPets(petData ?? []);
      setLoading(false);
    }
    void load();
  }, []);

  async function logout() {
    await getSupabase().auth.signOut();
    window.location.href = "/login";
  }

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const avatarUrl = await uploadFile("fotos-perfil", form.get("avatar") as File | null, profile.id);
      const { data, error: updateError } = await getSupabase()
        .from("users")
        .update({
          nombre: String(form.get("name") ?? profile.nombre),
          zona: String(form.get("zone") ?? profile.zona),
          bio: String(form.get("bio") ?? profile.bio),
          foto_url: avatarUrl ?? profile.foto_url
        })
        .eq("id", profile.id)
        .select("*")
        .single();
      if (updateError) throw updateError;
      setProfile(data);
      setMessage("Perfil actualizado.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos actualizar el perfil.");
    }
  }

  async function addPet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const photoUrl = await uploadFile("mascotas", form.get("photo") as File | null, profile.id);
      const { error: insertError } = await getSupabase().from("mascotas").insert({
        user_id: profile.id,
        nombre: String(form.get("name") ?? "").trim(),
        especie: String(form.get("type") ?? "Perro"),
        raza: String(form.get("breed") ?? ""),
        edad: Number(form.get("age") ?? 0),
        ciudad: "Ushuaia",
        zona: String(form.get("zone") ?? profile.zona),
        foto_url: photoUrl
      });
      if (insertError) throw insertError;
      const { data } = await getSupabase().from("mascotas").select("*").eq("user_id", profile.id).order("created_at", { ascending: false });
      setPets(data ?? []);
      setMessage("Mascota registrada.");
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos registrar la mascota.");
    }
  }

  async function addPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const imageUrl = await uploadFile("publicaciones", form.get("image") as File | null, profile.id);
      const { error: insertError } = await getSupabase().from("posts").insert({
        user_id: profile.id,
        mascota_id: String(form.get("petId") ?? "") || null,
        imagen_url: imageUrl,
        descripcion: String(form.get("text") ?? "").trim(),
        ciudad: "Ushuaia",
        zona: profile.zona
      });
      if (insertError) throw insertError;
      setMessage("Publicación creada.");
      event.currentTarget.reset();
      window.dispatchEvent(new Event("citypets-supabase-refresh"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos publicar.");
    }
  }

  async function addService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const imageUrl = await uploadFile("publicaciones", form.get("image") as File | null, profile.id);
      const { error: insertError } = await getSupabase().from("servicios").insert({
        user_id: profile.id,
        titulo: String(form.get("name") ?? "").trim(),
        categoria: String(form.get("category") ?? "Paseadores"),
        ciudad: "Ushuaia",
        zona: String(form.get("zone") ?? profile.zona),
        precio: String(form.get("price") ?? ""),
        descripcion: String(form.get("description") ?? ""),
        imagen_url: imageUrl
      });
      if (insertError) throw insertError;
      setMessage("Servicio publicado. Queda pendiente de verificación.");
      event.currentTarget.reset();
      window.dispatchEvent(new Event("citypets-supabase-refresh"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos publicar el servicio.");
    }
  }

  if (loading) return <section className="launch-console"><p className="muted">Cargando cuenta...</p></section>;
  if (!profile) {
    return (
      <section className="launch-console">
        <h2>Necesitás iniciar sesión</h2>
        <p className="muted">Registrate, confirmá tu email y volvé para cargar perfil, mascotas y publicaciones.</p>
      </section>
    );
  }

  return (
    <section className="launch-console">
      <div className="console-header onboarding-header">
        <div>
          <span className="eyebrow">Primeros pasos</span>
          <h2>Hola, {profile.nombre}</h2>
          <p className="muted">
            Sumá a tu compañero de vida, contanos cómo es y compartí su primera historia en Ushuaia.
            Perfil {profile.verificado ? "verificado" : "pendiente"}.
          </p>
        </div>
        <button className="button ghost" type="button" onClick={logout}><LogOut size={18} /> Salir</button>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-success">{message}</p> : null}

      <div className="console-grid">
        <form className="launch-form" onSubmit={updateProfile}>
          <span className="eyebrow">Tu historia</span>
          <h3>Completá tu perfil</h3>
          <input name="name" defaultValue={profile.nombre} placeholder="Nombre" />
          <select name="zone" defaultValue={profile.zona ?? "Centro"}>
            {cityZones.map((zone) => <option key={zone.zone}>{zone.zone}</option>)}
          </select>
          <input name="avatar" type="file" accept="image/*" />
          <textarea name="bio" defaultValue={profile.bio ?? ""} placeholder="Contá algo sobre vos y tu vida con mascotas" />
          <button className="button" type="submit">Guardar perfil</button>
        </form>

        <form className="launch-form" onSubmit={addPet}>
          <span className="eyebrow">Contanos sobre tu compañero de vida</span>
          <h3>Sumá a tu mascota a la comunidad</h3>
          <input name="name" placeholder="¿Cómo se llama?" required />
          <input name="breed" placeholder="Raza" />
          <input name="age" placeholder="Edad" type="number" min="0" />
          <select name="type"><option>Perro</option><option>Gato</option><option>Otro</option></select>
          <select name="zone">{cityZones.map((zone) => <option key={zone.zone}>{zone.zone}</option>)}</select>
          <input name="photo" type="file" accept="image/*" />
          <button className="button" type="submit"><Plus size={18} /> Crear perfil de mascota</button>
        </form>

        <form className="launch-form" onSubmit={addPost}>
          <span className="eyebrow">Primera historia</span>
          <h3>Compartí un momento</h3>
          <select name="petId">
            <option value="">Sin mascota asociada</option>
            {pets.map((pet) => <option key={pet.id} value={pet.id}>{pet.nombre}</option>)}
          </select>
          <input name="image" type="file" accept="image/*,video/*" />
          <textarea name="text" placeholder="¿Qué hizo hoy tu mascota? Un paseo, una travesura, una consulta..." required />
          <button className="button" type="submit">Publicar</button>
        </form>

        <form className="launch-form" onSubmit={addService}>
          <h3>Publicar servicio</h3>
          <input name="name" placeholder="Nombre del servicio" required />
          <select name="category">
            {["Paseadores", "Veterinarios", "Cuidadores", "Adiestradores", "Peluqueria", "Transporte"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <select name="zone">{cityZones.map((zone) => <option key={zone.zone}>{zone.zone}</option>)}</select>
          <input name="price" placeholder="Precio estimado" />
          <input name="image" type="file" accept="image/*" />
          <textarea name="description" placeholder="Descripción del servicio" required />
          <button className="button" type="submit">Publicar servicio</button>
        </form>
      </div>
    </section>
  );
}
