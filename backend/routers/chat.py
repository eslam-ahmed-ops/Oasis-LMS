from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os

router = APIRouter(tags=["ChatBot"])

class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []
    course_context: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    suggestions: Optional[List[str]] = []

KNOWLEDGE_BASE = {
    "python": """لغة Python هي إحدى أشهر لغات البرمجة وأسهلها للمبتدئين. 
أهم مميزاتها:
1. بناء جملة (Syntax) سهل وبسيط يشبه اللغة الإنجليزية.
2. تدعم مجالات متعددة: تطوير الويب (Django/FastAPI)، الذكاء الاصطناعي، وتحليل البيانات.
3. مجتمع دعم ضخم ومكتبات جاهزة مثل Pandas وNumPy.""",
    
    "ux": """تجربة المستخدم (UX) تركز على شعور وسهولة استخدام المستخدم للمنتج، بينما واجهة المستخدم (UI) تركز على المظهر الجمالي وتنسيق الألوان والأزرار.
خطوات العمل الأساسية:
1. فهم وبحث احتياجات المستخدم (User Research).
2. بناء الإطارات السلكية (Wireframes).
3. تصميم النماذج التفاعلية في Figma (Prototyping).""",

    "data": """تحليل البيانات هو عملية فحص وتنظيف ونمذجة البيانات لاستخراج رؤى مفيدة لاتخاذ القرارات.
الأدوات الأساسية:
- Python (Pandas, Matplotlib)
- SQL للاستعلام من قواعد البيانات
- PowerBI أو Tableau لإنشاء لوحات المعلومات التفاعلية.""",

    "general": """مرحباً بك في منصة الواحة التعليمية! 🌴
أنا مرشدك التعليمي الذكي، كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن:
- شرح المفاهيم البرمجية والدروس
- المساعدة في تنظيم خطتك الدراسية
- التدرب على أسئلة الاختبارات
- نصائح لتطوير مهاراتك التقنية"""
}

def generate_smart_reply(prompt: str, context: Optional[str] = None) -> tuple[str, list[str]]:
    lower_prompt = prompt.lower()
    
    if any(word in lower_prompt for word in ["بايثون", "python", "برمجة", "كود", "دالة", "function", "قائمة", "list"]):
        reply = (
            "🐍 **أساسيات ومفاهيم Python:**\n\n"
            + KNOWLEDGE_BASE["python"]
            + "\n\n💡 *نصيحة:* يمكنك الانتقال إلى دورة 'أساسيات البرمجة بلغة Python' في قسم دوراتك لحل التمارين العملية، أو زيارة بنك الأسئلة لاختبار معلوماتك!"
        )
        suggestions = ["كيف أعرّف دالة في Python؟", "ما الفرق بين List و Tuple؟", "انتقل لبنك الأسئلة"]
        return reply, suggestions
        
    elif any(word in lower_prompt for word in ["تصميم", "ux", "ui", "واجهات", "تجربة", "figma"]):
        reply = (
            "🎨 **عالم تصميم تجربة وواجهة المستخدم (UX/UI):**\n\n"
            + KNOWLEDGE_BASE["ux"]
            + "\n\n💡 *نصيحة:* ابدأ دائماً برسم المخططات الهيكلية (Wireframes) بالقلم والورقة قبل الانتقال إلى برامج التصميم مثل Figma."
        )
        suggestions = ["ما هي مبادئ التصميم الأساسية؟", "كيف أبدأ بحث المستخدم؟", "عرض دورة UX/UI"]
        return reply, suggestions

    elif any(word in lower_prompt for word in ["بيانات", "تحليل", "data", "sql", "excel"]):
        reply = (
            "📊 **تحليل البيانات والذكاء الاصطناعي:**\n\n"
            + KNOWLEDGE_BASE["data"]
            + "\n\n💡 *نصيحة:* التركيز على فهم لغة SQL يمنحك أفضلية قوية جداً في التعامل مع قواعد البيانات الضخمة."
        )
        suggestions = ["ما أهمية SQL في تحليل البيانات؟", "ما الفرق بين BI والـ Data Science؟"]
        return reply, suggestions

    elif any(word in lower_prompt for word in ["اختبار", "اسئلة", "أسئلة", "بنك", "quiz"]):
        reply = (
            "❓ **بنك الأسئلة والاختبارات التفاعلية:**\n\n"
            "تتيح لك منصة الواحة التعليمية خوض اختبارات تجريبية مؤقتة لقياس مستواك في مختلف المسارات:\n"
            "1. اختبارات في لغة Python.\n"
            "2. اختبارات في تصميم UX/UI.\n"
            "3. اختبارات في تحليل البيانات.\n\n"
            "يمكنك النقر على 'بنك الأسئلة' في القائمة الجانبية لبدء اختبار فوري وتلقي النتيجة والتقييم مباشرة!"
        )
        suggestions = ["ابدأ اختبار Python تجريبي", "كيف أحسن درجاتي؟", "خطتي لهذا الأسبوع"]
        return reply, suggestions

    elif any(word in lower_prompt for word in ["خطة", "تنظيم", "جدول", "مذاكرة", "وقت"]):
        reply = (
            "📅 **نصائح لتنظيم جدولك التعليمي في الواحة:**\n\n"
            "1. حدد ٤٥ دقيقة يومياً كجلسة تركيز واحدة دون مشتتات.\n"
            "2. راجع وسمّع المفاهيم بعد كل درس فيديو عبر مذكرات الـ PDF المرفقة.\n"
            "3. حل التمارين في بنك الأسئلة لتثبيت المعلومات فوراً.\n"
            "4. تابع ودون مهامك الأسبوعية في تبويب 'المهام' بالمنصة."
        )
        suggestions = ["كيف أتعامل مع التسويف؟", "عرض قائمة مهامي", "دوراتي الحالية"]
        return reply, suggestions

    elif any(word in lower_prompt for word in ["مرحبا", "سلام", "أهلا", "اهلا", "hello", "hi"]):
        return KNOWLEDGE_BASE["general"], ["اشرح لي أساسيات Python", "ما الفرق بين UX و UI؟", "ساعدني في تنظيم خطتي", "كيف أستخدم بنك الأسئلة؟"]

    else:
        reply = (
            f"سؤال ممتاز بخصوص: '{prompt}'.\n\n"
            "بصفتي مرشدك الذكي في منصة الواحة التعليمية، أوصيك بالاطلاع على المحتوى المتاح في دوراتك المسجلة، "
            "أو كتابة استفسارك بمزيد من التفصيل وسأقوم بتبسيط المفهوم لك فوراً مع تقديم أمثلة تطبيقية!"
        )
        suggestions = ["اشرح لي أساسيات البرمجة", "استكشف الدورات المتاحة", "اختبر معلوماتك الآن"]
        return reply, suggestions

@router.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="الرسالة لا يمكن أن تكون فارغة")

    reply, suggestions = generate_smart_reply(req.message, req.course_context)
    return ChatResponse(reply=reply, suggestions=suggestions)
