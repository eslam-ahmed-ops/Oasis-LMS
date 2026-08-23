-- ============================================
-- الواحة التعليمية - Seed Data (Mock)
-- Run AFTER schema.sql
-- ============================================

-- NOTE: In production, users are created via Supabase Auth.
-- These are mock profiles for development/testing.
-- You'll need to create auth users first, then use their UUIDs here.

-- Example seed (replace UUIDs with actual auth user IDs):

-- Mock teacher profile
-- INSERT INTO profiles (id, full_name, email, role) VALUES
--   ('teacher-uuid-here', 'م. سارة أحمد', 'sara@example.com', 'teacher');

-- Mock student profile
-- INSERT INTO profiles (id, full_name, email, role) VALUES
--   ('student-uuid-here', 'أحمد محمد', 'ahmed@example.com', 'student');

-- Mock admin profile
-- INSERT INTO profiles (id, full_name, email, role) VALUES
--   ('admin-uuid-here', 'المدير العام', 'admin@example.com', 'admin');

-- Sample courses
INSERT INTO courses (title, description, category_id, instructor_name, duration_hours, total_lessons, cover_gradient, is_approved, is_published) VALUES
  ('أساسيات البرمجة بلغة Python', 'تعلم أساسيات لغة Python من الصفر حتى الاحتراف', 1, 'م. سارة أحمد', 24, 24, 'purple', true, true),
  ('تصميم تجربة المستخدم UX/UI', 'تعلم أسس تصميم واجهات المستخدم وتجربة الاستخدام', 2, 'م. نور حسان', 18, 18, 'lavender', true, true),
  ('تحليل البيانات واتخاذ القرار', 'مقدمة في تحليل البيانات وأدوات اتخاذ القرار', 4, 'د. خالد منصور', 30, 20, 'gold', true, true),
  ('تطوير تطبيقات الويب', 'بناء تطبيقات ويب متكاملة باستخدام أحدث التقنيات', 1, 'م. أحمد علي', 36, 30, 'blue', true, true),
  ('إدارة المشاريع الرقمية', 'تعلم أساليب إدارة المشاريع في العصر الرقمي', 3, 'د. فاطمة الزهراء', 12, 15, 'purple', true, true);

-- Sample lessons for Python course (course_id = 1)
INSERT INTO lessons (course_id, title, description, lesson_order, duration_minutes) VALUES
  (1, 'مقدمة في البرمجة', 'ما هي البرمجة ولماذا نتعلمها', 1, 30),
  (1, 'تثبيت Python وإعداد البيئة', 'تحميل وتثبيت Python على جهازك', 2, 25),
  (1, 'المتغيرات وأنواع البيانات', 'التعرف على المتغيرات والأنواع الأساسية', 3, 45),
  (1, 'العمليات الحسابية والمنطقية', 'الجمع والطرح والمقارنات', 4, 35),
  (1, 'الجمل الشرطية if/else', 'اتخاذ القرارات في البرنامج', 5, 40),
  (1, 'الحلقات التكرارية', 'for و while loops', 6, 50),
  (1, 'الدوال Functions', 'إنشاء واستخدام الدوال', 7, 45),
  (1, 'القوائم Lists', 'التعامل مع القوائم وعملياتها', 8, 40),
  (1, 'القواميس Dictionaries', 'تخزين البيانات بشكل منظم', 9, 35),
  (1, 'التعامل مع الملفات', 'قراءة وكتابة الملفات', 10, 40);

-- Sample lessons for UX/UI course (course_id = 2)
INSERT INTO lessons (course_id, title, description, lesson_order, duration_minutes) VALUES
  (2, 'مقدمة في UX/UI', 'الفرق بين تجربة المستخدم وواجهة المستخدم', 1, 30),
  (2, 'مبادئ التصميم الأساسية', 'التوازن والتباين والتقارب', 2, 40),
  (2, 'بحث المستخدم', 'كيف تفهم احتياجات المستخدمين', 3, 45),
  (2, 'الإطارات السلكية Wireframes', 'رسم التصاميم الأولية', 4, 50),
  (2, 'النماذج التفاعلية Prototyping', 'بناء نماذج تفاعلية', 5, 55);

-- Sample questions for Python course
INSERT INTO questions (course_id, question_text, question_type, difficulty, points) VALUES
  (1, 'ما هو نوع البيانات المستخدم لتخزين النصوص في Python؟', 'mcq', 'easy', 1),
  (1, 'Python لغة برمجة مفسرة وليست مترجمة', 'true_false', 'easy', 1),
  (1, 'ما الفرق بين القائمة (List) والمجموعة (Set) في Python؟', 'short_answer', 'medium', 2),
  (1, 'أي من التالي يستخدم لتعريف دالة في Python؟', 'mcq', 'easy', 1),
  (1, 'ما هو الناتج من: print(type(3.14))؟', 'mcq', 'medium', 2);

-- Options for question 1
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
  (1, 'int', false, 1),
  (1, 'str', true, 2),
  (1, 'float', false, 3),
  (1, 'bool', false, 4);

-- Options for question 4
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
  (4, 'function', false, 1),
  (4, 'def', true, 2),
  (4, 'func', false, 3),
  (4, 'define', false, 4);

-- Options for question 5
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
  (5, '<class ''int''>', false, 1),
  (5, '<class ''float''>', true, 2),
  (5, '<class ''str''>', false, 3),
  (5, '<class ''double''>', false, 4);
