"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Bookmark, Heart, MapPin, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Comment, Post } from "@/data/mockData";
import { pets } from "@/data/mockData";
import { formatDate } from "@/lib/format";

type FeedPostProps = {
  post: Post;
};

export function FeedPost({ post }: FeedPostProps) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.commentsList);
  const pet = pets.find((item) => item.id === post.petId);

  function toggleLike() {
    setLiked((current) => !current);
    setLikes((current) => current + (liked ? -1 : 1));
  }

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = String(form.get("comment") ?? "").trim();

    if (!text) {
      return;
    }

    setComments((current) => [
      ...current,
      { id: `local-${Date.now()}`, author: "Vos", text }
    ]);
    event.currentTarget.reset();
  }

  return (
    <motion.article
      className="social-post"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="post-header">
        <Link href={`/pets/${post.petId}`} className="post-author">
          <img src={pet?.mainPhotoUrl ?? post.photoUrl} alt={post.petName} />
          <div>
            <h3>{post.petName}</h3>
            <p>{post.ownerName} | {post.city}</p>
          </div>
        </Link>
        <div className="post-meta">
          <span><MapPin size={13} /> {post.zone}</span>
          <span>{formatDate(post.createdAt)}</span>
          <button type="button" className="icon-button" aria-label="Mas opciones">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="post-image-wrap">
        <img src={post.photoUrl} alt={post.petName} className="post-image" />
        <AnimatePresence>
          {liked ? (
            <motion.div
              className="like-burst"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.25 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <Heart size={74} fill="currentColor" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="post-toolbar">
        <div>
          <motion.button
            type="button"
            className={liked ? "icon-button active" : "icon-button"}
            aria-label="Me gusta"
            onClick={toggleLike}
            whileTap={{ scale: 0.82 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.18 }}
          >
            <Heart size={23} fill={liked ? "currentColor" : "none"} />
          </motion.button>
          <motion.button type="button" className="icon-button" aria-label="Comentar" whileHover={{ scale: 1.08 }}>
            <MessageCircle size={23} />
          </motion.button>
          <motion.button type="button" className="icon-button" aria-label="Compartir" whileHover={{ scale: 1.08 }}>
            <Send size={23} />
          </motion.button>
        </div>
        <motion.button type="button" className="icon-button" aria-label="Guardar" whileHover={{ scale: 1.08 }}>
          <Bookmark size={23} />
        </motion.button>
      </div>

      <strong className="likes-line">{likes} personas de Ushuaia conectaron con esto</strong>
      <p className="post-text">
        <Link href={`/pets/${post.petId}`}>{post.petName}</Link> {post.text}
      </p>

      <div className="comments-list">
        {comments.slice(-3).map((comment) => (
          <p key={comment.id}>
            <strong>{comment.author}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className="comment-form" onSubmit={addComment}>
        <input name="comment" placeholder="Comentar como vecino de Ushuaia..." />
        <button type="submit">Enviar</button>
      </form>
    </motion.article>
  );
}
