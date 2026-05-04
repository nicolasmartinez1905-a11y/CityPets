"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send } from "lucide-react";
import { pets, posts as demoPosts } from "@/data/mockData";
import { getSupabase, hasSupabaseConfig } from "@/lib/supabase";
import { SlideUp } from "./Motion";

type FeedRow = {
  id: string;
  user_id: string;
  mascota_id: string | null;
  imagen_url: string | null;
  descripcion: string;
  ciudad: string;
  zona: string | null;
  created_at: string;
  users?: { nombre: string; foto_url: string | null; zona: string | null } | null;
  mascotas?: { nombre: string; foto_url: string | null; especie: string | null } | null;
  likes?: { id: string; user_id: string }[];
  comentarios?: {
    id: string;
    user_id: string;
    texto: string;
    created_at: string;
    users?: { nombre: string } | null;
  }[];
};

const PAGE_SIZE = 6;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function getDemoFeedRows(): FeedRow[] {
  return demoPosts.map((post) => {
    const pet = pets.find((item) => item.id === post.petId);
    return {
      id: post.id,
      user_id: `demo-${post.ownerName}`,
      mascota_id: post.petId,
      imagen_url: post.photoUrl,
      descripcion: post.text,
      ciudad: post.city,
      zona: post.zone,
      created_at: post.createdAt,
      users: {
        nombre: post.ownerName,
        foto_url: pet?.owner.avatarUrl ?? null,
        zona: post.zone
      },
      mascotas: {
        nombre: post.petName,
        foto_url: pet?.mainPhotoUrl ?? null,
        especie: pet?.type ?? null
      },
      likes: Array.from({ length: Math.min(post.likes, 12) }, (_, index) => ({
        id: `${post.id}-like-${index}`,
        user_id: `demo-like-${index}`
      })),
      comentarios: post.commentsList.map((comment) => ({
        id: comment.id,
        user_id: `demo-${comment.author}`,
        texto: comment.text,
        created_at: post.createdAt,
        users: { nombre: comment.author }
      }))
    };
  });
}

export function SupabaseFeed() {
  const [posts, setPosts] = useState<FeedRow[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const canUseSupabase = useMemo(() => hasSupabaseConfig(), []);

  async function loadFeed(nextVisible = visible) {
    setError("");

    if (!canUseSupabase) {
      setPosts(getDemoFeedRows().slice(0, nextVisible));
      setMessage("Estás viendo contenido demo de la comunidad. Conectá Supabase para guardar publicaciones reales.");
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    const { data: authData } = await supabase.auth.getUser();
    setCurrentUserId(authData.user?.id ?? null);

    const { data, error: feedError } = await supabase
      .from("posts")
      .select(
        "id,user_id,mascota_id,imagen_url,descripcion,ciudad,zona,created_at,users(nombre,foto_url,zona),mascotas(nombre,foto_url,especie),likes(id,user_id),comentarios(id,user_id,texto,created_at,users(nombre))"
      )
      .eq("ciudad", "Ushuaia")
      .order("created_at", { ascending: false })
      .range(0, nextVisible - 1);

    setLoading(false);
    if (feedError) {
      setPosts(getDemoFeedRows().slice(0, nextVisible));
      setMessage("No pudimos cargar la base real ahora. Te mostramos una vista demo mientras tanto.");
      return;
    }

    const realPosts = (data ?? []) as unknown as FeedRow[];
    setPosts(realPosts.length ? realPosts : getDemoFeedRows().slice(0, nextVisible));
    if (!realPosts.length) {
      setMessage("Todavía no hay publicaciones reales. Te mostramos una comunidad demo para que la app no se sienta vacía.");
    }
  }

  useEffect(() => {
    loadFeed(PAGE_SIZE);
    const sync = () => loadFeed(visible);
    window.addEventListener("citypets-supabase-refresh", sync);
    return () => window.removeEventListener("citypets-supabase-refresh", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleLike(post: FeedRow) {
    setMessage("");
    setError("");
    if (!currentUserId || post.user_id.startsWith("demo-")) {
      setError("Ingresá con tu cuenta confirmada para guardar likes reales.");
      return;
    }

    const supabase = getSupabase();
    const liked = post.likes?.some((like) => like.user_id === currentUserId);
    const request = liked
      ? supabase.from("likes").delete().eq("post_id", post.id).eq("user_id", currentUserId)
      : supabase.from("likes").insert({ post_id: post.id, user_id: currentUserId });

    const { error: likeError } = await request;
    if (likeError) return setError(likeError.message);
    await loadFeed(visible);
  }

  async function addComment(event: FormEvent<HTMLFormElement>, postId: string) {
    event.preventDefault();
    setError("");
    setMessage("");

    const post = posts.find((item) => item.id === postId);
    if (!currentUserId || post?.user_id.startsWith("demo-")) {
      setError("Ingresá para comentar y que tu mensaje quede guardado.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const text = String(form.get("comment") ?? "").trim();
    if (text.length < 2) return setError("Escribí un comentario un poco más completo.");

    const { error: commentError } = await getSupabase()
      .from("comentarios")
      .insert({ post_id: postId, user_id: currentUserId, texto: text });

    if (commentError) return setError(commentError.message);
    event.currentTarget.reset();
    setMessage("Comentario publicado.");
    await loadFeed(visible);
  }

  if (loading) {
    return (
      <div className="feed-stack">
        {[0, 1, 2].map((item) => (
          <div className="social-card skeleton-card" key={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="feed-stack">
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-success">{message}</p> : null}

      {!posts.length ? (
        <SlideUp>
          <section className="social-card empty-state">
            <h2>Todavía no hay publicaciones.</h2>
            <p>Sumá a tu mascota y compartí la primera historia de la comunidad.</p>
          </section>
        </SlideUp>
      ) : null}

      {posts.map((post, index) => {
        const liked = Boolean(currentUserId && post.likes?.some((like) => like.user_id === currentUserId));
        const avatar = post.mascotas?.foto_url ?? post.users?.foto_url ?? "/icons/icon-192.svg";
        return (
          <SlideUp key={post.id} delay={index * 0.03}>
            <article className="social-card">
              <header className="post-header">
                <img className="avatar" src={avatar} alt={post.mascotas?.nombre ?? post.users?.nombre ?? "Mascota"} />
                <div>
                  <strong>{post.mascotas?.nombre ?? "Mascota de CityPets"}</strong>
                  <span>
                    {post.users?.nombre ?? "Tutor/a"} · {post.zona ?? post.users?.zona ?? "Ushuaia"}
                  </span>
                </div>
              </header>

              {post.imagen_url ? (
                <img className="post-image" src={post.imagen_url} alt={post.descripcion} loading="lazy" />
              ) : null}

              <div className="post-body">
                <p>{post.descripcion}</p>
                <small>{formatDate(post.created_at)}</small>
              </div>

              <div className="post-actions">
                <motion.button
                  type="button"
                  className={`icon-action ${liked ? "active" : ""}`}
                  whileTap={{ scale: 1.18 }}
                  onClick={() => toggleLike(post)}
                >
                  <Heart size={19} fill={liked ? "currentColor" : "none"} />
                  {post.likes?.length ?? 0}
                </motion.button>
                <span className="icon-action muted">
                  <MessageCircle size={19} />
                  {post.comentarios?.length ?? 0}
                </span>
              </div>

              <div className="comments-list">
                {(post.comentarios ?? []).slice(0, 3).map((comment) => (
                  <p key={comment.id}>
                    <strong>{comment.users?.nombre ?? "CityPet"}</strong> {comment.texto}
                  </p>
                ))}
              </div>

              <form className="comment-form" onSubmit={(event) => addComment(event, post.id)}>
                <input name="comment" placeholder="Sumá un comentario..." />
                <button type="submit" aria-label="Publicar comentario">
                  <Send size={17} />
                </button>
              </form>
            </article>
          </SlideUp>
        );
      })}

      {posts.length >= visible ? (
        <button
          type="button"
          className="button ghost load-more"
          onClick={() => {
            const nextVisible = visible + PAGE_SIZE;
            setVisible(nextVisible);
            loadFeed(nextVisible);
          }}
        >
          Ver más publicaciones
        </button>
      ) : null}
    </div>
  );
}
