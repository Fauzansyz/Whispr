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

export async function downloadStoryImage({
  label,
  headline,
  subtext,
  footer,
  filename,
}) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create a story image.");

  const gradient = context.createLinearGradient(0, 0, 1080, 1920);
  gradient.addColorStop(0, "#ff2e63");
  gradient.addColorStop(0.5, "#7c174a");
  gradient.addColorStop(1, "#17102e");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(900, 350, 10, 900, 350, 800);
  glow.addColorStop(0, "rgba(255, 142, 83, 0.6)");
  glow.addColorStop(1, "rgba(255, 142, 83, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(15, 12, 32, 0.36)";
  context.beginPath();
  context.roundRect(88, 490, 904, 940, 56);
  context.fill();

  context.textAlign = "center";
  context.fillStyle = "#ffffff";
  context.font = "700 34px system-ui, sans-serif";
  context.fillText(label.toUpperCase(), 540, 615);
  context.font = "900 68px system-ui, sans-serif";
  drawWrappedText(context, headline, 540, 790, 760, 92);

  if (subtext) {
    context.fillStyle = "rgba(255, 255, 255, 0.76)";
    context.font = "600 34px system-ui, sans-serif";
    drawWrappedText(context, subtext, 540, 1190, 760, 48);
  }

  context.fillStyle = "#ffffff";
  context.font = "900 44px system-ui, sans-serif";
  context.fillText(footer, 540, 1630);
  context.font = "700 32px system-ui, sans-serif";
  context.fillStyle = "rgba(255, 255, 255, 0.8)";
  context.fillText("ngl.link", 540, 1695);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("Could not export this story image."));
    }, "image/png");
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
