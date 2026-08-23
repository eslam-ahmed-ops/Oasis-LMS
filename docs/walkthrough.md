# Walkthrough — الواحة التعليمية (All Phases Complete)

تم بناء وتشغيل منصة **الواحة التعليمية** المتكاملة بنجاح باللغة العربية (RTL) مع دعم كامل للوضع الليلي والنهاري (Dark/Light Mode) و٣ لوحات تحكم مستقلة قائمة على الأدوار: **الطالب**، **المعلم**، و**المدير**.

---

## 🌐 روابط المعاينة اللحظية (Live Server)

المنصة تعمل الآن على: **`http://localhost:3000`**

| الواجهة | الرابط المباشر | الوصف |
|---------|----------------|-------|
| 🎓 **لوحة تحكم الطالب** | [`/dashboard`](http://localhost:3000/dashboard) | الصفحة الرئيسية المتطابقة مع التصميم |
| 📚 **دوراتي** | [`/dashboard/courses`](http://localhost:3000/dashboard/courses) | تصفح ومتابعة تقدم الدورات المسجل بها |
| 🔍 **استكشف الدورات** | [`/dashboard/explore`](http://localhost:3000/dashboard/explore) | مكتبة الدورات والتصنيفات |
| ❓ **بنك الأسئلة والاختبارات** | [`/dashboard/question-bank`](http://localhost:3000/dashboard/question-bank) | تدريب واختبارات تفاعلية مؤقتة |
| 📝 **تفاصيل الدورة والمشغل** | [`/dashboard/course/1`](http://localhost:3000/dashboard/course/1) | مشغل الفيديو المدمج وقارئ الـ PDF |
| ✅ **المهام والتكليفات** | [`/dashboard/tasks`](http://localhost:3000/dashboard/tasks) | خطة الأسبوع والمواعيد النهائية |
| 👨‍🏫 **لوحة تحكم المعلم** | [`/teacher`](http://localhost:3000/teacher) | إدارة الدورات ومتابعة الطلاب |
| ➕ **إنشاء دورة جديدة** | [`/teacher/courses/new`](http://localhost:3000/teacher/courses/new) | نموذج إضافة الدورات والمحتوى |
| 👥 **متابعة أداء الطلاب** | [`/teacher/students`](http://localhost:3000/teacher/students) | جداول تقدم الطلاب ونسب الإنجاز |
| ☁️ **رفع الفيديوهات والمذكرات** | [`/teacher/content`](http://localhost:3000/teacher/content) | واجهة تخزين الملفات |
| 📊 **تقييم الواجبات** | [`/teacher/grades`](http://localhost:3000/teacher/grades) | مراجعة وتسجيل درجات الطلاب |
| ❓ **إدارة بنك الأسئلة (للمعلم)** | [`/teacher/question-bank`](http://localhost:3000/teacher/question-bank) | إنشاء أسئلة MCQ وصح/خطأ |
| 🛡️ **لوحة تحكم المدير العام** | [`/admin`](http://localhost:3000/admin) | تحليلات النظام واستقرار الخوادم |
| 👤 **إدارة المستخدمين** | [`/admin/users`](http://localhost:3000/admin/users) | تعديل الأدوار وتفعيل/إيقاف الحسابات |
| 📑 **اعتماد الدورات** | [`/admin/courses`](http://localhost:3000/admin/courses) | مراجعة ونشر دورات المعلمين |
| 🗂️ **التصنيفات الدراسية** | [`/admin/categories`](http://localhost:3000/admin/categories) | إضافة وحذف الأقسام والتصنيفات |
| 📈 **التقارير والإحصائيات** | [`/admin/reports`](http://localhost:3000/admin/reports) | تحليلات ساعات المشاهدة والنمو |
| ⚙️ **إعدادات المنصة** | [`/admin/settings`](http://localhost:3000/admin/settings) | ضبط الهوية ووضع الصيانة |
| 🔐 **تسجيل الدخول** | [`/auth/login`](http://localhost:3000/auth/login) | مصادقة البريد وGoogle OAuth |
| ✍️ **إنشاء حساب** | [`/auth/signup`](http://localhost:3000/auth/signup) | تسجيل طالب أو معلم مع التحقق |

---

## 🛠️ تفاصيل الهيكل والمكونات

### 1. تشغيل الفيديو ومذكرات الـ PDF
- [VideoPlayer.tsx](file:///c:/Users/eslam/Eslam/Reno/al-waha-edu/frontend/components/media/VideoPlayer.tsx): مشغل وسائط تفاعلي باللغة العربية، التحكم بالسرعة، تخطي 10 ثواني، وحفظ تقدم الطالب عند مشاهدة 90%.
- [PdfViewer.tsx](file:///c:/Users/eslam/Eslam/Reno/al-waha-edu/frontend/components/media/PdfViewer.tsx): قارئ PDF داخل المتصفح مع ميزات التكبير/التصغير (Zoom)، التنقل بين الصفحات، وزر التحميل المباشر.

### 2. بنك الأسئلة التفاعلي (Question Bank)
- [QuizPlayer.tsx](file:///c:/Users/eslam/Eslam/Reno/al-waha-edu/frontend/components/questions/QuizPlayer.tsx): اختبار ذكي مع عداد زمني تنازلي، حفظ الإجابات، والتسليم التلقائي.
- [QuizResults.tsx](file:///c:/Users/eslam/Eslam/Reno/al-waha-edu/frontend/components/questions/QuizResults.tsx): تقرير تفصيلي بالدرجات مع مراجعة الإجابات الصحيحة والخاطئة والوقت المستغرق.

### 3. قاعدة البيانات والحماية (FastAPI + Supabase)
- [schema.sql](file:///c:/Users/eslam/Eslam/Reno/al-waha-edu/database/schema.sql): 13 جدولاً مع تفعيل كامل لسياسات الأمان على مستوى الصف (RLS Policies).
- [main.py](file:///c:/Users/eslam/Eslam/Reno/al-waha-edu/backend/main.py): خادم FastAPI مع 9 موجهات API محمية بنظام JWT.
