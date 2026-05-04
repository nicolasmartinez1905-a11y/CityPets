"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FeedPost } from "@/components/FeedPost";
import { Stories } from "@/components/Stories";
import { pets } from "@/data/mockData";
import { ushuaiaMedia } from "@/data/media";
import { getFeedPosts } from "@/modules/social/queries";

type OptimizedHeroProps = {
  compact?: boolean;
  showPreview?: boolean;
};

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

const fallbackImage = ushuaiaMedia.heroFallback;

const videoSources = [
  {
    src: "https://cdn.coverr.co/videos/coverr-walking-the-dog-1564/1080p.mp4",
    type: "video/mp4"
  }
];

function shouldSkipVideo() {
  if (typeof window === "undefined") {
    return true;
  }

  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const slowConnection =
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";

  return prefersReducedMotion || slowConnection;
}

export function OptimizedHero({ compact = false, showPreview = true }: OptimizedHeroProps) {
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const posts = useMemo(() => getFeedPosts(), []);

  useEffect(() => {
    if (shouldSkipVideo()) {
      return;
    }

    const load = () => setCanLoadVideo(true);
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 1600 });
    } else {
      timeoutId = setTimeout(load, 900);
    }

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className={compact ? "urban-hero video-hero compact-hero" : "urban-hero video-hero"}>
      <img src={fallbackImage} alt="" className="hero-placeholder" fetchPriority="high" />
      {canLoadVideo ? (
        <video
          className={videoReady ? "hero-video is-ready" : "hero-video"}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={fallbackImage}
          onCanPlay={() => setVideoReady(true)}
        >
          {videoSources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : null}
      <div className="hero-overlay" />
      <motion.div
        className="hero-copy centered-hero-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">CityPets Ushuaia</span>
        <h1>La ciudad también es de ellos 🐾</h1>
        <p>Conectando mascotas y personas en Ushuaia</p>
        <motion.div
          className="hero-actions centered-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.16, ease: "easeOut" }}
        >
          <Link className="button" href="/feed">
            Sumate a la comunidad
          </Link>
        </motion.div>
      </motion.div>

      {showPreview ? (
        <motion.div
          className="hero-phone"
          aria-label="Vista previa del feed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Stories pets={pets.slice(0, 5)} />
          <FeedPost post={posts[0]} />
        </motion.div>
      ) : null}
    </section>
  );
}
