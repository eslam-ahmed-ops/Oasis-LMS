"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const DEFAULT_SUGGESTIONS = [
  "اشرح لي أساسيات لغة Python",
  "ما الفرق بين تصميم UX و UI؟",
  "كيف أنظم خطتي الدراسية هذا الأسبوع؟",
  "كيف أستفيد من بنك الأسئلة؟",
];

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  python: `🐍 **مرحباً بك في مسار Python!**
لغة Python هي إحدى أقوى وأسهل لغات البرمجة الحديثة.

**أهم النقاط للبدء:**
1. **المتغيرات (Variables):** تخزين النصوص والأرقام بسهولة دون الحاجة لتحديد النوع مسبقاً.
2. **الجمل الشرطية والدوال:** تنظيم تدفق العمليات وإعادة استخدام الكود عبر \`def\`.
3. **التطبيقات:** تطوير الويب، الذكاء الاصطناعي، وتحليل البيانات.

💡 *يمكنك التوجه إلى قسم "دوراتي" لبدء مشاهدة دروس دورة Python وحل تمارينها الآن!*`,

  ux: `🎨 **عالم تصميم تجربة وواجهة المستخدم (UX/UI):**
- **تجربة المستخدم (UX):** تركز على سهولة الاستخدام، فهم احتياجات العميل، ورسم خرائط الرحلة (User Journey).
- **واجهة المستخدم (UI):** تركز على التنسيق البصري، اختيار الألوان المتناسقة، والطباعة (Typography).

💡 *نصيحة ذهبية:* ابدأ دائماً برسم الإطارات السلكية (Wireframes) بالقلم والورقة قبل فتح برامج التصميم مثل Figma!`,

  plan: `📅 **نصائح لإتقان خطتك التعليمية في الواحة:**
1. **جلسات تركيز يومية:** خصص ٤٥ دقيقة يومياً للدراسة بدون أي مشتتات.
2. **التطبيق الفوري:** طبق الكود أو التصميم بنفسك بعد مشاهدة الفيديو مباشرة.
3. **التدريب المستمر:** حل التمارين المتوفرة في **بنك الأسئلة** بعد كل وحدة.
4. **تتبع المهام:** راقب قائمة مهامك ومواعيد التسليم من صفحة **المهام**.`,

  quiz: `❓ **بنك الأسئلة والاختبارات التفاعلية:**
يوفر لك بنك الأسئلة في المنصة:
- اختبارات تجريبية مؤقتة بمؤقت زمني تنازلي.
- أسئلة اختيار من متعدد وصح/خطأ لجميع المسارات.
- تصحيح فوري وتقارير مراجعة توضح الإجابات النموذجية.

🚀 *انقر على "بنك الأسئلة" في القائمة الجانبية لبدء اختبارك الآن!*`,

  default: `شكراً لسؤالك! بصفتي مرشدك الذكي في منصة **الواحة التعليمية** 🌴:
أنا هنا لمساعدتك في استيعاب المفاهيم البرمجية، توجيهك للمسار المناسب، وتنظيم وقتك التعليمي.

هل ترغب في أن نشرح لك مفهوماً معيناً أو نساعدك في بدء دورة جديدة؟`,
};

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "bot",
      text: "مرحباً بك في الواحة التعليمية! 🌴 أنا مرشدك الذكي، كيف يمكنني مساعدتك في رحلتك التعليمية اليوم؟",
      timestamp: "الآن",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    // Simulate smart AI response locally
    setTimeout(() => {
      let botReply = KNOWLEDGE_RESPONSES.default;
      const lower = text.toLowerCase();

      if (lower.includes("python") || lower.includes("بايثون") || lower.includes("برمج") || lower.includes("كود")) {
        botReply = KNOWLEDGE_RESPONSES.python;
      } else if (lower.includes("ux") || lower.includes("ui") || lower.includes("تصميم") || lower.includes("واجه")) {
        botReply = KNOWLEDGE_RESPONSES.ux;
      } else if (lower.includes("خطة") || lower.includes("وقت") || lower.includes("تنظيم") || lower.includes("مذاكر")) {
        botReply = KNOWLEDGE_RESPONSES.plan;
      } else if (lower.includes("اختبار") || lower.includes("بنك") || lower.includes("اسئل") || lower.includes("أسئل")) {
        botReply = KNOWLEDGE_RESPONSES.quiz;
      }

      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "تم مسح المحادثة. كيف يمكنني مساعدتك في استفسار جديد؟",
        timestamp: "الآن",
      },
    ]);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-tajawal" dir="rtl">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 mb-4 animate-in fade-in slide-in-from-bottom-5 ${
            isExpanded
              ? "w-[90vw] md:w-[600px] h-[80vh]"
              : "w-[92vw] sm:w-[400px] h-[520px]"
          }`}
        >
          {/* Top Header */}
          <div className="bg-[#0F2440] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0F2440]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-none">مرشد الواحة الذكي</h3>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                </div>
                <span className="text-[11px] text-blue-200 block mt-1">مساعدك التعليمي اللحظي</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="مسح المحادثة"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                title={isExpanded ? "تصغير النافذة" : "تكبير النافذة"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[var(--background)]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs shadow-sm ${
                    msg.sender === "user"
                      ? "bg-brand-500 text-white"
                      : "bg-[#0F2440] text-blue-200"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`group relative max-w-[82%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-brand-500 text-white rounded-br-none"
                      : "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] opacity-75">
                    <span>{msg.timestamp}</span>

                    {msg.sender === "bot" && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-brand-500 flex items-center gap-1"
                        title="نسخ النص"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-green-500" />
                            <span className="text-green-500">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>نسخ</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-7 h-7 rounded-xl bg-[#0F2440] text-blue-200 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-[var(--input)]/50 border-t border-[var(--border)] flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <span className="text-[var(--muted)] whitespace-nowrap font-bold">مقترحات:</span>
            {DEFAULT_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="px-2.5 py-1 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-brand-500 hover:text-brand-500 transition-colors whitespace-nowrap"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Footer Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[var(--card)] border-t border-[var(--border)] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب سؤالك أو استفسارك هنا..."
              className="flex-1 bg-[var(--input)] border border-[var(--border)] rounded-2xl px-4 py-2.5 text-xs md:text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-brand-500"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-10 h-10 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow transition-all hover:scale-105 flex-shrink-0"
              title="إرسال"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (Bottom) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-[#0F2440] hover:bg-brand-600 text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-brand-500/25 transition-all duration-300 hover:scale-105 border border-slate-700"
          aria-label="فتح المحادثة الذكية"
        >
          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-500 border-2 border-white" />
          </span>

          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-inner">
            <Bot className="w-5 h-5" />
          </div>

          <div className="flex flex-col text-right leading-tight">
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <span>مرشد الواحة</span>
              <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </span>
            <span className="text-[10px] text-blue-200">اسألني أي شيء</span>
          </div>
        </button>
      )}
    </div>
  );
}
