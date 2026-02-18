import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const SEND_TELEGRAM_URL =
  "https://functions.poehali.dev/c9e09265-a4ea-4ebe-a4bd-caa5248dec68";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const openChat = () => {
      setIsOpen(true);
      setSent(false);
    };
    window.addEventListener("open-chat-widget", openChat);
    return () => window.removeEventListener("open-chat-widget", openChat);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(SEND_TELEGRAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      if (res.ok) {
        setSent(true);
        setName("");
        setPhone("");
        setMessage("");
      }
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSent(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-border bg-background shadow-2xl sm:w-96"
          >
            <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3">
              <span className="text-sm font-semibold text-primary-foreground">
                Напишите нам
              </span>
              <button
                onClick={handleClose}
                className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="p-4">
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon
                      name="CheckCircle"
                      size={28}
                      className="text-primary"
                    />
                  </div>
                  <p className="text-sm text-foreground">
                    Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <Input
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Телефон"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Сообщение"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="resize-none"
                    rows={3}
                  />
                  <Button type="submit" disabled={sending} className="w-full">
                    {sending ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="Send" size={16} />
                    )}
                    {sending ? "Отправка..." : "Отправить"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setSent(false);
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
      >
        <Icon name={isOpen ? "X" : "MessageCircle"} size={24} />
      </motion.button>
    </div>
  );
}