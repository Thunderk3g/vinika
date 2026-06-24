"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createPostAction,
  updatePostAction,
  deletePostAction,
  type BlogFormInput,
} from "../actions";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({
  mode,
  postId,
  initial,
}: {
  mode: "create" | "edit";
  postId?: string;
  initial: BlogFormInput;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();
  const [form, setForm] = useState<BlogFormInput>(initial);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const set = <K extends keyof BlogFormInput>(k: K, v: BlogFormInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setMsg(null);
  };

  const onTitle = (v: string) => {
    setForm((f) => ({
      ...f,
      title: v,
      slug: !slugTouched && mode === "create" ? slugify(v) : f.slug,
    }));
    setMsg(null);
  };

  function save() {
    startTransition(async () => {
      const res =
        mode === "create"
          ? await createPostAction(form)
          : await updatePostAction(postId!, form);
      if (res.ok) {
        if (mode === "create" && "data" in res && res.data) {
          router.push(`/admin/blog/${res.data.id}`);
        } else {
          setMsg({ ok: true, text: "Saved." });
          router.refresh();
        }
      } else {
        setMsg({ ok: false, text: res.error });
      }
    });
  }

  function remove() {
    if (!postId) return;
    if (!confirm("Delete this post permanently?")) return;
    startDelete(async () => {
      const res = await deletePostAction(postId);
      if (res.ok) router.push("/admin/blog");
      else setMsg({ ok: false, text: res.error });
    });
  }

  const labeled = (label: string, node: React.ReactNode, hint?: string) => (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      {node}
      {hint && <p className="adm-hint">{hint}</p>}
    </div>
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: 20,
        alignItems: "start",
      }}
      className="grid-2-collapse"
    >
      <div className="adm-card">
        {labeled(
          "Title",
          <input
            className="field-input"
            value={form.title}
            onChange={(e) => onTitle(e.target.value)}
          />,
        )}
        {labeled(
          "Slug",
          <input
            className="field-input"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value);
            }}
          />,
          "URL: /insights/your-slug",
        )}
        {labeled(
          "Excerpt",
          <textarea
            className="field-input"
            style={{ minHeight: 70, resize: "vertical" }}
            value={form.excerpt ?? ""}
            onChange={(e) => set("excerpt", e.target.value)}
          />,
        )}
        {labeled(
          "Body (Markdown)",
          <textarea
            className="field-input"
            style={{ minHeight: 360, resize: "vertical", fontFamily: "'Geist Mono', monospace", fontSize: 14 }}
            value={form.body ?? ""}
            onChange={(e) => set("body", e.target.value)}
          />,
          "Supports markdown: ## headings, **bold**, lists, links.",
        )}
      </div>

      <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="adm-card">
          {labeled(
            "Status",
            <select
              className="field-input"
              value={form.status}
              onChange={(e) => set("status", e.target.value as "draft" | "published")}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>,
          )}
          {labeled(
            "Category",
            <input
              className="field-input"
              value={form.category ?? ""}
              placeholder="STRATEGY"
              onChange={(e) => set("category", e.target.value)}
            />,
          )}
          {labeled(
            "Read time",
            <input
              className="field-input"
              value={form.readTime ?? ""}
              placeholder="5 min read"
              onChange={(e) => set("readTime", e.target.value)}
            />,
          )}
          {labeled(
            "Author",
            <input
              className="field-input"
              value={form.author ?? ""}
              placeholder="Vinika"
              onChange={(e) => set("author", e.target.value)}
            />,
          )}
          {labeled(
            "Cover image URL",
            <input
              className="field-input"
              value={form.coverImageUrl ?? ""}
              placeholder="https://…"
              onChange={(e) => set("coverImageUrl", e.target.value)}
            />,
          )}
        </div>

        <div className="adm-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="btn-accent" onClick={save} disabled={pending}>
            {pending ? "Saving…" : mode === "create" ? "Create post" : "Save changes"}
          </button>
          {mode === "edit" && (
            <button className="btn-ghost btn-danger" onClick={remove} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete post"}
            </button>
          )}
          {msg && (
            <span style={{ fontSize: 13.5, color: msg.ok ? "var(--amber)" : "#e89" }}>
              {msg.text}
            </span>
          )}
        </div>
      </aside>
    </div>
  );
}
