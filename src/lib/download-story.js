import { toBlob } from "html-to-image";

function drawWrappedText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(/\s+/);
  let line = "";
  let currentY = y;
  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = nextLine;
    }
  }
  if (line) context.fillText(line, x, currentY);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadHtmlImage(element, filename) {
  if (!element) throw new Error("Could not find the message image.");

  await document.fonts.ready;
  const blob = await toBlob(element, {
    width: 1080,
    height: 1350,
    pixelRatio: 2,
    cacheBust: true,
    style: {
      bottom: "auto",
      left: "0px",
      position: "relative",
      right: "auto",
      top: "0px",
      transform: "none",
    },
  });
  if (!blob) throw new Error("Could not export this message image.");
  downloadBlob(blob, filename);
}
