"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="form-note" role="status">
        Thank you. Your message has been received, and someone will reply
        directly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Name</span>
        <input type="text" name="name" required maxLength={200} autoComplete="name" />
      </label>

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          required
          maxLength={320}
          autoComplete="email"
        />
      </label>

      <label className="field">
        <span>
          Company <em>(optional)</em>
        </span>
        <input
          type="text"
          name="company"
          maxLength={200}
          autoComplete="organization"
        />
      </label>

      <label className="field">
        <span>Message</span>
        <textarea name="message" required maxLength={5000} />
      </label>

      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="form-note err" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
