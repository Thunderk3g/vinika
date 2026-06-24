import Link from "next/link";
import BlogForm from "../_components/BlogForm";
import type { BlogFormInput } from "../actions";

export const dynamic = "force-dynamic";

const empty: BlogFormInput = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverImageUrl: "",
  category: "",
  author: "Vinika",
  readTime: "",
  status: "draft",
};

export default function NewPostPage() {
  return (
    <div>
      <Link href="/admin/blog" className="blog-back" style={{ marginBottom: 16, display: "inline-flex" }}>
        ← Blog
      </Link>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "12px 0 20px", color: "var(--cream)" }}>
        New post
      </h1>
      <BlogForm mode="create" initial={empty} />
    </div>
  );
}
