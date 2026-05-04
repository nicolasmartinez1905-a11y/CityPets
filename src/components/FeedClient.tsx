"use client";

import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/data/mockData";
import { loadLocalState } from "@/lib/localAppState";
import { FeedPost } from "./FeedPost";

type FeedClientProps = {
  posts: Post[];
};

export function FeedClient({ posts }: FeedClientProps) {
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const sync = () => setLocalPosts(loadLocalState().posts);
    sync();
    window.addEventListener("citypets-state", sync);
    return () => window.removeEventListener("citypets-state", sync);
  }, []);

  const mergedPosts = useMemo(() => [...localPosts, ...posts], [localPosts, posts]);
  const visiblePosts = mergedPosts.slice(0, visibleCount);

  return (
    <>
      {visiblePosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
      {visibleCount < mergedPosts.length ? (
        <button className="button ghost load-more" type="button" onClick={() => setVisibleCount((count) => count + 4)}>
          Ver más publicaciones
        </button>
      ) : null}
    </>
  );
}
