"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Field, ItemField, SectionSpec } from "@/lib/admin/content-spec";
import { saveSectionAction } from "../actions";

/* eslint-disable @typescript-eslint/no-explicit-any */

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setByPath(obj: any, path: string, v: any): any {
  const keys = path.split(".");
  const root = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur: any = root;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const child = cur[k];
    cur[k] = Array.isArray(child) ? [...child] : { ...(child ?? {}) };
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = v;
  return root;
}

const inputStyle = { width: "100%" } as const;

function ScalarInput({
  field,
  value,
  onChange,
}: {
  field: { kind: "text" | "textarea"; label: string; placeholder?: string };
  value: any;
  onChange: (v: string) => void;
}) {
  return (
    <div className="adm-field">
      <label className="adm-label">{field.label}</label>
      {field.kind === "textarea" ? (
        <textarea
          className="field-input"
          style={{ ...inputStyle, minHeight: 88, resize: "vertical" }}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="field-input"
          style={inputStyle}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function ItemFieldInput({
  field,
  value,
  onChange,
}: {
  field: ItemField;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === "stringlist") {
    const arr: string[] = Array.isArray(value) ? value : [];
    return (
      <div className="adm-field">
        <label className="adm-label">{field.label}</label>
        <input
          className="field-input"
          style={inputStyle}
          value={arr.join(", ")}
          placeholder="Comma-separated"
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
        <p className="adm-hint">Separate with commas.</p>
      </div>
    );
  }
  return (
    <ScalarInput
      field={{ kind: field.type === "textarea" ? "textarea" : "text", label: field.label }}
      value={value}
      onChange={onChange}
    />
  );
}

export default function SectionEditor({
  sectionKey,
  spec,
  initial,
}: {
  sectionKey: string;
  spec: SectionSpec;
  initial: any;
}) {
  const router = useRouter();
  const [value, setValue] = useState<any>(initial ?? {});
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const update = (path: string, v: any) => {
    setValue((prev: any) => setByPath(prev, path, v));
    setMsg(null);
  };

  // List edits derive from the latest state (prev), not a stale render snapshot,
  // so rapid edits/reorders never discard a concurrent change.
  const updateList = (path: string, updater: (list: any[]) => any[]) => {
    setValue((prev: any) => setByPath(prev, path, updater(getByPath(prev, path) ?? [])));
    setMsg(null);
  };

  function renderField(field: Field, i: number) {
    if (field.kind === "list") {
      const list: any[] = getByPath(value, field.path) ?? [];
      const updateItem = (idx: number, key: string, v: any) =>
        updateList(field.path, (lst) =>
          lst.map((it, j) => (j === idx ? { ...it, [key]: v } : it)),
        );
      const addItem = () =>
        updateList(field.path, (lst) => {
          const blank: any = {};
          field.itemFields.forEach((f) => (blank[f.key] = f.type === "stringlist" ? [] : ""));
          return [...lst, blank];
        });
      const removeItem = (idx: number) =>
        updateList(field.path, (lst) => lst.filter((_, j) => j !== idx));
      const move = (idx: number, dir: -1 | 1) =>
        updateList(field.path, (lst) => {
          const j = idx + dir;
          if (j < 0 || j >= lst.length) return lst;
          const next = [...lst];
          [next[idx], next[j]] = [next[j], next[idx]];
          return next;
        });
      return (
        <div key={i} style={{ marginTop: 8 }}>
          <div className="adm-label" style={{ fontSize: 13, marginBottom: 12 }}>
            {field.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {list.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: 16,
                  background: "rgba(245,225,200,0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    {field.itemLabel} {idx + 1}
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button type="button" className="btn-ghost btn-sm" onClick={() => move(idx, -1)}>
                      ↑
                    </button>
                    <button type="button" className="btn-ghost btn-sm" onClick={() => move(idx, 1)}>
                      ↓
                    </button>
                    <button
                      type="button"
                      className="btn-ghost btn-sm btn-danger"
                      onClick={() => removeItem(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {field.itemFields.map((f) => (
                  <ItemFieldInput
                    key={f.key}
                    field={f}
                    value={item?.[f.key]}
                    onChange={(v) => updateItem(idx, f.key, v)}
                  />
                ))}
              </div>
            ))}
          </div>
          <button type="button" className="btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={addItem}>
            + Add {field.itemLabel.toLowerCase()}
          </button>
        </div>
      );
    }

    if (field.kind === "stringlist") {
      const arr: string[] = getByPath(value, field.path) ?? [];
      return (
        <ItemFieldInput
          key={i}
          field={{ key: field.path, label: field.label, type: "stringlist" }}
          value={arr}
          onChange={(v) => update(field.path, v)}
        />
      );
    }

    return (
      <ScalarInput
        key={i}
        field={field}
        value={getByPath(value, field.path)}
        onChange={(v) => update(field.path, v)}
      />
    );
  }

  function save() {
    startTransition(async () => {
      const res = await saveSectionAction(sectionKey, value);
      if (res.ok) {
        setMsg({ ok: true, text: "Saved — the live site is updating." });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error });
      }
    });
  }

  return (
    <div>
      <div className="adm-card">{spec.fields.map((f, i) => renderField(f, i))}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 18,
          position: "sticky",
          bottom: 0,
          padding: "14px 0",
        }}
      >
        <button className="btn-accent" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {msg && (
          <span style={{ fontSize: 13.5, color: msg.ok ? "var(--amber)" : "#e89" }}>{msg.text}</span>
        )}
      </div>
    </div>
  );
}
