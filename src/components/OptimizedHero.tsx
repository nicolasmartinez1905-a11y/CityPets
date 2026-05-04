"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

const heroSlides = ushuaiaMedia.dynamicHero;

export function OptimizedHero({ compact = false, showPreview = true }: OptimizedHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const posts = getFeedPosts();

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.imageUrl;
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isPaused || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section
      className={compact ? "urban-hero dynamic-hero compact-hero" : "urban-hero dynamic-hero"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slides" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.imageUrl}
            src={slide.imageUrl}
            alt=""
            className={index === activeSlide ? "hero-slide is-active" : "hero-slide"}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            style={{ objectPosition: slide.position }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <motion.div
        className="hero-copy centered-hero-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">CityPets Ushuaia</span>
        <h1>La ciudad también es de ellos</h1>
        <p>Tu mascota también tiene una historia que merece ser compartida.</p>
        <motion.span
          key={heroSlides[activeSlide].microcopy}
          className="hero-microcopy"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {heroSlides[activeSlide].microcopy}
        </motion.span>
        <motion.div
          className="hero-actions centered-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.16, ease: "easeOut" }}
        >
          <Link className="button" href="/registro">
            Sumate con tu mascota
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-dots" aria-label="Cambiar imagen del hero">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.imageUrl}
            type="button"
            aria-label={`Ver imagen ${index + 1}: ${slide.microcopy}`}
            aria-pressed={index === activeSlide}
            className={index === activeSlide ? "is-active" : ""}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>

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
