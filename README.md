# 🌴 الواحة التعليمية — Oasis LMS

<div align="center">

![Oasis LMS Banner](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)

**منصة تعليمية عربية ذكية متكاملة تعتمد على أحدث تقنيات الويب والذكاء الاصطناعي مع دعم كامل للاتجاه من اليمين لليسار (RTL) والوضع الليلي والنهاري (Dark/Light Mode).**

[عرض التوثيق الشامل](docs/walkthrough.md) • [خطة العمل](docs/implementation_plan.md) • [قائمة المهام](docs/task.md)

</div>

---

## 🌟 الميزات الرئيسية (Key Features)

### 1. 🎓 لوحات تحكم ثلاثية قائمة على الأدوار (Role-Based Dashboards)
- **لوحة تحكم الطالب (Student Dashboard):** تتبع الساعات التعليمية، حلقة التقدم الدائرية التفاعلية، خطة الأسبوع، المواعيد النهائية، والوصول الفوري للدروس.
- **لوحة تحكم المعلم (Teacher Dashboard):** إنشاء وإدارة الدورات، رفع الفيديوهات والمذكرات، متابعة تقدم الطلاب بدقة، وتقييم الواجبات.
- **لوحة تحكم المدير (Admin Dashboard):** مركز عمليات موحد لإدارة المستخدمين، ترقية وتعديل الصلاحيات، اعتماد دورات المعلمين، وإحصائيات استقرار النظام.

### 2. ❓ بنك الأسئلة والاختبارات التفاعلية (Question Bank & Quizzes)
- نظام أسئلة متعددة الأنماط (اختيار من متعدد MCQ، صح/خطأ، أسئلة قصيرة).
- خوض اختبارات تجريبية بمؤقت زمني تنازلي وتصحيح فوري ذكي.
- شاشة مراجعة تفصيلية للإجابات توضح الإجابات الصحيحة والخاطئة مع نسب الإنجاز.

### 3. 🎬 مشغل وسائط تفاعلي وقارئ PDF مدمج
- **مشغل الفيديو:** إمكانية تسريع/إبطاء العرض، التراجع 10 ثوانٍ، وحفظ تقدم الطالب التلقائي عند إكمال 90% من الدرس.
- **قارئ الـ PDF:** استعراض المذكرات والمراجع داخل المتصفح مباشرة مع ميزات التكبير والتحميل المباشر.

### 4. 🌙 تصميم عربي أصيل مع الوضع الليلي (Dark / Light Mode)
- دعم كامل لخط **Tajawal** العربي من Google Fonts.
- تبديل سريع وسلس بين الوضعين الليلي والنهاري وحفظ تفضيل المستخدم في المتصفح.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| الطبقة | التقنية | الوظيفة |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14 (App Router) + React 18 | واجهة المستخدم، العرض من جانب الخادم (SSR) والعميل |
| **Styling** | Tailwind CSS v4 + next-themes | التصميم والتجاوب ودعم الألوان والوضع الليلي |
| **Backend** | Python + FastAPI | بناء الـ APIs، المصادقة، والتحقق عبر نماذج Pydantic |
| **Database & Auth** | Supabase (PostgreSQL) | المصادقة الآمنة، سياسات الأمان (RLS)، وتخزين الملفات |
| **Icons & UI** | Lucide React + Recharts + Framer Motion | الأيقونات، الرسوم البيانية، والتحريكات السلسة |

---

## 📂 هيكلية المشروع (Project Architecture)

```
al-waha-edu/
├── backend/                      # خادم FastAPI (Python)
│   ├── main.py                   # نقطة الدخول الرئيسية
│   ├── config.py                 # إعدادات المتغيرات البيئية
│   ├── database.py               # عميل Supabase
│   ├── middleware/               # التحقق من صلاحيات JWT
│   ├── models/                   # نماذج Pydantic للتحقق
│   ├── routers/                  # 9 موجهات API (دورات، طلاب، اختبارات، الخ)
│   └── utils/                    # دوال الأرقام والتواريخ العربية
│
├── frontend/                     # واجهة Next.js (TypeScript)
│   ├── app/
│   │   ├── auth/                 # تسجيل الدخول وإنشاء الحساب
│   │   ├── dashboard/            # واجهات الطالب ومسارات الدورات
│   │   ├── teacher/              # واجهات المعلم والمحتوى
│   │   └── admin/                # واجهات الإدارة والإحصائيات
│   ├── components/               # مكونات الواجهة القابلة لإعادة الاستخدام
│   │   ├── course/               # بطاقات وقوائم الدورات
│   │   ├── layout/               # الشريط الجانبي والرأس ومبدل الثيم
│   │   ├── media/                # مشغل الفيديو وقارئ الـ PDF
│   │   ├── questions/            # مشغل الاختبارات ونتائج التقييم
│   │   └── stats/                # بطاقات الإحصائيات الدائرية والشبكية
│   └── lib/                      # عملاء API والبيانات التجريبية
│
├── database/                     # قواعد البيانات
│   ├── schema.sql                # مخطط الجداول الـ 13 وسياسات RLS
│   └── seed.sql                  # بيانات تجريبية باللغة العربية
│
└── docs/                         # التوثيق والخطط
    ├── implementation_plan.md
    ├── task.md
    └── walkthrough.md
```

---

## 🚀 التشغيل والتثبيت (Getting Started)

### 1. المتطلبات المسبقة (Prerequisites)
* **Node.js**: الإصدار 18.18+ أو أحدث
* **Python**: الإصدار 3.10+ أو أحدث

---

### 2. تشغيل الواجهة الأمامية (Frontend)

```bash
# الانتقال لمجلد الواجهة
cd frontend

# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev
```

افتح المتصفح وتوجه إلى: **`http://localhost:3000`**

---

### 3. تشغيل الخادم الخلفي (Backend)

```bash
# الانتقال لمجلد الخادم
cd backend

# إنشاء البيئة الافتراضية وتفعيلها
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux / Mac:
source venv/bin/activate

# تثبيت المتطلبات
pip install -r requirements.txt

# تشغيل الخادم
uvicorn main:app --reload --port 8000
```

استعرض وثائق الـ API التفاعلية عبر Swagger على: **`http://localhost:8000/docs`**

---

### 4. إعداد قاعدة البيانات (Supabase)

1. أنشئ مشروعاً جديداً في [Supabase](https://supabase.com).
2. افتح **SQL Editor** في Supabase وقم بتشغيل ملف [`database/schema.sql`](database/schema.sql).
3. شغّل ملف [`database/seed.sql`](database/seed.sql) لإضافة بيانات الدورات والأسئلة التجريبية.
4. انسخ مفاتيح الـ API في ملف `.env.local` داخل مجلد `frontend` وملف `.env` داخل مجلد `backend`.

---

## 🔒 الأمان وسياسات الحماية (Security & RLS)

- **Row Level Security (RLS):** كل جدول في Supabase محمي بسياسات تمنع وصول أي مستخدم لبيانات غير مصرح له بها.
- **Role-Based Access Control (RBAC):** التحقق من دور المستخدم (`student`, `teacher`, `admin`) على مستوى خادم FastAPI وNext.js Middleware.
- **حماية الـ XSS و SQL Injection:** معالجة تلقائية لكافة المدخلات عبر React وPydantic وSupabase Prepared Statements.

---

## 📄 الترخيص (License)

هذا المشروع متاح ومطور لصالح **منصة الواحة التعليمية (Oasis LMS)**.
جميع الحقوق محفوظة © 2026.
