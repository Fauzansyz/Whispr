export default function MessageStoryImage({ message, username, storyRef }) {
  const contentLength = message.content?.length ?? 0;

  const messageFontSize = Math.max(
    28,
    Math.min(72, Math.sqrt(800000 / Math.max(contentLength, 100)))
  );

  return (
    <div
      ref={storyRef}
      aria-hidden="true"
      className="pointer-events-none fixed -left-[1200px] top-0 flex h-[1350px] w-[1080px] items-center justify-center overflow-hidden bg-[#080709] font-sans text-white"
    >
      {/* Main chat card */}
      <div className="flex w-[990px] flex-col rounded-[68px] border-2 border-white/[0.10] bg-[#19191b] p-[56px]">

        {/* Anonymous message header */}
        <div className="relative mb-[44px] flex min-h-[236px] flex-col items-center justify-center rounded-[44px] bg-gradient-to-r from-[#ff2e63] to-[#ff8e53] px-[42px] py-[38px] text-center">
          <span className="text-[25px] font-black uppercase tracking-[4px] text-white/80">
            Anonymous message
          </span>

          {message.prompt && (
            <p className="mt-[36px] text-[36px] font-bold leading-tight">
              {message.prompt}
            </p>
          )}
        </div>

        {/* Message bubble */}
        <blockquote
          className="flex min-h-[196px] items-center justify-center rounded-[42px] border-2 border-white/[0.07] bg-[#242426] px-[42px] py-[46px] text-center font-bold leading-[1.3]"
          style={{
            fontSize: `${messageFontSize}px`,
            overflowWrap: "anywhere",
            wordBreak: "normal",
          }}
        >
          “{message.content}”
        </blockquote>

        {/* Timestamp */}
        <div className="mt-[36px] text-center text-[30px] font-medium text-[#85858d]">
          Received anonymous message
        </div>

        {/* Footer */}
        <footer className="mt-[54px] flex flex-col items-center gap-[18px] text-center">
          <div className="text-[32px] font-extrabold">
            reply to @{username}
          </div>

          <div className="text-[27px] font-bold text-white/65">
            whispr
          </div>
        </footer>
      </div>
    </div>

  );
}
