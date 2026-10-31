"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  Check,
  Download,
  Inbox,
  LoaderCircle,
  MailOpen,
  MessageCircle,
  Star,
  Trash2,
} from "lucide-react";
import { downloadHtmlImage } from "@/lib/download-story";
import MessageStoryImage from "@/components/fragment/StoryImage/MessageStoryImage";
import { Messages } from "@/hooks/MessageHooks";
const FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "starred", label: "Starred" },
  { id: "spam", label: "Spam" },
];

function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function InboxView({ username }) {
  const [activeMessage, setActiveMessage] = useState(null);
  const storyRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [isDownloading, setIsDownloading] = useState(false);
  const [notice, setNotice] = useState("");
  const { messages, isLoading, error, refetch } = Messages();

  const unreadCount = messages.filter(
    (message) => !message.isRead && !message.isSpam,
  ).length;
  const visibleMessages = useMemo(
    () =>
      messages.filter((message) => {
        if (filter === "unread") return !message.isRead && !message.isSpam;
        if (filter === "starred") return message.isStarred && !message.isSpam;
        if (filter === "spam") return message.isSpam;
        return !message.isSpam;
      }),
    [filter, messages],
  );

  const updateMessage = async (messageId, action) => {
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not update this message.");
      const changes = {
        read: { isRead: true },
        unread: { isRead: false },
        star: { isStarred: true },
        unstar: { isStarred: false },
        spam: { isSpam: true },
        unspam: { isSpam: false },
      }[action];
      setMessages((current) =>
        current.map((item) =>
          item.id === messageId ? { ...item, ...changes } : item,
        ),
      );
      setActiveMessage((current) =>
        current?.id === messageId ? { ...current, ...changes } : current,
      );
    } catch (actionError) {
      setError(actionError.message || "Could not update this message.");
    }
  };

  const handleOpenMessage = async (message) => {
    setActiveMessage(message);
    if (!message.isRead) await updateMessage(message.id, "read");
  };

  const handleDelete = async (messageId) => {
    setError("");
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not delete this message.");
      setMessages((current) =>
        current.filter((message) => message.id !== messageId),
      );
      setActiveMessage(null);
      setNotice("Message deleted.");
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete this message.");
    }
  };

  const handleDownloadStory = async () => {
    setIsDownloading(true);
    setError("");
    try {
      await downloadHtmlImage(
        storyRef.current,
        `ngl-reply-${activeMessage.id}.png`,
      );
    } catch (downloadError) {
      setError(downloadError.message || "Could not download the story image.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="w-full px-4 py-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight">
            Inbox
            {unreadCount > 0 && (
              <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-black text-white">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Anonymous messages sent to @{username}.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <Inbox className="h-6 w-6 text-[#FF2E63] " />
        </div>
      </header>

      {notice && (
        <p
          className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300"
          role="status"
        >
          {notice}
        </p>
      )}
      {error && (
        <p
          className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300"
          role="alert"
        >
          {error}
        </p>
      )}

      <nav
        aria-label="Filter messages"
        className="mb-4 flex gap-2 overflow-x-auto pb-1"
      >
        {FILTERS.map((item) => (
          <button
            aria-pressed={filter === item.id}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
              filter === item.id
                ? "border-rose-400/50 bg-rose-500/15 text-rose-200"
                : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            }`}
            key={item.id}
            onClick={() => setFilter(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {isLoading ? (
        <div className="flex min-h-48 items-center justify-center text-sm font-semibold text-zinc-400">
          <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-rose-400" />
          Loading messages...
        </div>
      ) : visibleMessages.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 px-6 py-12 text-center">
          <MessageCircle className="mx-auto mb-3 h-8 w-8 text-zinc-500" />
          <h2 className="text-lg font-black">
            {filter === "spam" ? "No spam messages" : "Your inbox is quiet"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {filter === "all"
              ? "Share your link to start receiving anonymous messages."
              : "There are no messages in this section."}
          </p>
          {filter === "all" && (
            <button
              className="mt-5 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold transition hover:bg-white/15"
              onClick={() => {
                refetch();
              }}
              type="button"
            >
              Refresh inbox
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleMessages.map((message) => (
            <article
              className={`rounded-3xl border p-4 transition ${
                message.isRead
                  ? "border-white/10 bg-zinc-900/80"
                  : "border-rose-500/35 bg-gradient-to-r from-rose-500/10 to-zinc-900/80"
              }`}
              key={message.id}
            >
              <button
                className="block w-full text-left"
                onClick={() => handleOpenMessage(message)}
                type="button"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    <span className="rounded-full border-white/10 bg-white/5 px-2 py-1">
                      anonymous
                    </span>
                    {!message.isRead && (
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                    )}
                  </span>
                  <time
                    className="text-[11px] text-zinc-500"
                    dateTime={message.createdAt}
                  >
                    {formatDate(message.createdAt)}
                  </time>
                </div>
                <p className="line-clamp-3 text-sm font-bold leading-6 text-zinc-100">
                  {message.content}
                </p>
                {message.prompt && (
                  <p className="mt-2 truncate text-xs text-zinc-500">
                    Prompt: {message.prompt}
                  </p>
                )}
              </button>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                <span className="text-[11px] font-semibold text-zinc-500">
                  {message.isRead ? "Read" : "New message"}
                </span>
                <button
                  aria-label={
                    message.isStarred ? "Remove star" : "Star message"
                  }
                  className={`rounded-lg p-2 transition hover:bg-white/10 ${
                    message.isStarred
                      ? "text-amber-300"
                      : "text-zinc-500 hover:text-amber-200"
                  }`}
                  onClick={() =>
                    updateMessage(
                      message.id,
                      message.isStarred ? "unstar" : "star",
                    )
                  }
                  type="button"
                >
                  <Star
                    className={`h-4 w-4 ${message.isStarred ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {activeMessage && (
        <>
          <MessageStoryImage
            message={activeMessage}
            storyRef={storyRef}
            username={username}
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveMessage(null)}
            role="presentation"
          >
            <section
              aria-labelledby="message-detail-heading"
              aria-modal="true"
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-5 shadow-2xl sm:p-7"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <button
                aria-label="Close message"
                className="absolute right-5 top-5 rounded-full p-3 text-zinc-300 transition hover:bg-white/20"
                onClick={() => setActiveMessage(null)}
                type="button"
              >
                ×
              </button>
              <div className="mb-4 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#FF8E53] p-4 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/75">
                  Anonymous message
                </span>
                {activeMessage.prompt && (
                  <p className="mt-2 text-sm font-bold">
                    {activeMessage.prompt}
                  </p>
                )}
              </div>
              <h2 className="sr-only" id="message-detail-heading">
                Message details
              </h2>
              <blockquote className="break-words rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-lg font-bold leading-7">
                “{activeMessage.content}”
              </blockquote>
              <time
                className="mt-3 block text-center text-xs text-zinc-500"
                dateTime={activeMessage.createdAt}
              >
                Received {formatDate(activeMessage.createdAt)}
              </time>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-bold transition hover:bg-white/10"
                  onClick={() =>
                    updateMessage(
                      activeMessage.id,
                      activeMessage.isRead ? "unread" : "read",
                    )
                  }
                  type="button"
                >
                  <MailOpen className="h-4 w-4" />
                  Mark {activeMessage.isRead ? "unread" : "read"}
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-bold transition hover:bg-white/10"
                  onClick={() =>
                    updateMessage(
                      activeMessage.id,
                      activeMessage.isStarred ? "unstar" : "star",
                    )
                  }
                  type="button"
                >
                  <Star
                    className={`h-4 w-4 ${activeMessage.isStarred ? "fill-current text-amber-300" : ""}`}
                  />
                  {activeMessage.isStarred ? "Unstar" : "Star"}
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-xs font-bold text-rose-200 transition hover:bg-rose-500/20"
                  onClick={() =>
                    updateMessage(
                      activeMessage.id,
                      activeMessage.isSpam ? "unspam" : "spam",
                    )
                  }
                  type="button"
                >
                  <Archive className="h-4 w-4" />
                  {activeMessage.isSpam ? "Restore" : "Report spam"}
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-bold text-zinc-300 transition hover:bg-white/10"
                  onClick={() => handleDelete(activeMessage.id)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
              <button
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF2E63] px-4 py-3 text-sm font-black shadow-lg shadow-rose-500/15 transition hover:opacity-90 disabled:opacity-60"
                disabled={isDownloading}
                onClick={handleDownloadStory}
                type="button"
              >
                {isDownloading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download reply story
              </button>
              {error && (
                <p
                  className="mt-3 text-center text-xs font-semibold text-rose-300"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </section>
          </div>
        </>
      )}
    </section>
  );
}
