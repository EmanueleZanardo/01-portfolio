"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog-posts";
import { formatPostDate } from "./blog-utils";

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {post.readingMinutes} min read
          </span>
        </div>
        <CardTitle className="font-headline text-2xl tracking-wide">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors group-hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <CardDescription className="text-sm leading-relaxed">
          {post.excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export function BlogList({
  posts,
  tags,
}: {
  posts: BlogPost[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeTag === null
        ? posts
        : posts.filter((p) => p.tags.includes(activeTag)),
    [activeTag, posts]
  );

  return (
    <div>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter posts by tag"
      >
        <Button
          variant={activeTag === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={cn(activeTag === null && "pointer-events-none")}
        >
          All
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </Button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No posts with this tag yet.
        </p>
      )}

      <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
        Showing {filtered.length} of {posts.length}{" "}
        {posts.length === 1 ? "post" : "posts"}
        {activeTag ? ` tagged “${activeTag}”` : ""}.
      </p>
    </div>
  );
}
