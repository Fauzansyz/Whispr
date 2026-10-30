export const MessageData = async () => {
  const res = await fetch("/api/messages");
  if (!res.ok) {
    throw new Error("Cannot fetch inbox");
  }
  return res.json();
};
