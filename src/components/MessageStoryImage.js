export default function MessageStoryImage({ message, username, storyRef }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-[-1200px] top-0"
      ref={storyRef}
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 80% 18%, rgba(255,142,83,.5), transparent 34%), linear-gradient(150deg, #ff2e63 0%, #9f174e 48%, #17102e 100%)",
        boxSizing: "border-box",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        height: 1920,
        justifyContent: "space-between",
        padding: "170px 90px 120px",
        width: 1080,
      }}
    >
      <header style={{ textAlign: "center" }}>
        <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: "-5px", lineHeight: 1 }}>
          ngl
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "6px",
            marginTop: 24,
            opacity: 0.8,
          }}
        >
          ANONYMOUS MESSAGE
        </div>
      </header>
      <article
        style={{
          alignItems: "center",
          background: "#fff8fb",
          borderRadius: 52,
          boxShadow: "0 32px 80px rgba(8,5,20,.35)",
          boxSizing: "border-box",
          color: "#221728",
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          justifyContent: "center",
          margin: "90px 0",
          maxHeight: 1160,
          minHeight: 600,
          padding: "80px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ color: "#e83d70", fontSize: 24, fontWeight: 900, letterSpacing: "4px" }}>
          ANONYMOUS
        </div>
        {message.prompt && (
          <p
            style={{
              color: "#a82559",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.35,
              margin: "42px 0 0",
            }}
          >
            {message.prompt}
          </p>
        )}
        <p
          style={{
            fontSize: Math.max(24, Math.min(64, 6400 / Math.max(message.content.length, 100))),
            fontWeight: 700,
            lineHeight: 1.3,
            margin: message.prompt ? "56px 0 0" : "52px 0 0",
            overflowWrap: "anywhere",
            whiteSpace: "pre-wrap",
          }}
        >
          “{message.content}”
        </p>
      </article>
      <footer style={{ fontSize: 34, fontWeight: 800, textAlign: "center" }}>
        <div>reply to @{username}</div>
        <div style={{ fontSize: 28, marginTop: 18, opacity: 0.8 }}>ngl.link</div>
      </footer>
    </div>
  );
}
