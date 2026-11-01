import { useState, useEffect } from "react";
import { MessageData } from "@/services/MessageData";

export function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  async function fetchMessages() {
    setLoading(true);
    try {
      const data = await MessageData();
      setMessages(data.messages);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);
  return {
    messages,
    setMessages,
    error,
    setError,
    isLoading,
    refetch: fetchMessages,
  };
}
