-- Seed data for local testing
-- First create auth users in Supabase Dashboard > Authentication, then run this

insert into public.users (id, role, first_name, last_name)
values
  ('00000000-0000-0000-0000-000000000001', 'therapist', 'Sarah', 'M.'),
  ('00000000-0000-0000-0000-000000000002', 'therapist', 'Michael', 'J.'),
  ('00000000-0000-0000-0000-000000000003', 'therapist', 'Ksenia', 'V.')
on conflict do nothing;

insert into public.therapist_profiles
  (user_id, license_number, crpo_status, photo_url, bio, years_experience,
   session_type, city, fees_per_session, sliding_scale, gender,
   specialties, client_focus_text, therapy_approaches, is_active, contact_email)
values
  ('00000000-0000-0000-0000-000000000001', 'RP001234', 'verified',
   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
   'I help adults navigate trauma, anxiety, and relationship patterns.',
   9, 'both', 'Toronto', 120, true, 'female',
   ARRAY['Anxiety','Relationships','Trauma & PTSD'],
   'Adults navigating trauma, relationship issues, and life transitions.',
   ARRAY['EMDR','Attachment-Based','CBT'], true, 'sarah@example.com'),

  ('00000000-0000-0000-0000-000000000002', 'RP002345', 'verified',
   'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
   'I work with people who feel stuck and want to create meaningful change.',
   6, 'both', 'Mississauga', 155, false, 'male',
   ARRAY['ADHD','Relationships','Self Esteem'],
   'Teens and adults who feel stuck, distracted, or disconnected.',
   ARRAY['CBT','Person-Centered','IFS'], true, 'michael@example.com'),

  ('00000000-0000-0000-0000-000000000003', 'RP003456', 'verified',
   'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80',
   'My work is rooted in Buddhist philosophy and depth psychology.',
   7, 'both', 'Mississauga', 120, true, 'female',
   ARRAY['Borderline Personality (BPD)','Trauma & PTSD','ADHD'],
   'Teens and adults with BPD, PTSD, or ADHD.',
   ARRAY['DBT','Mindfulness-Based (MBCT)','Trauma-Focused'], true, 'ksenia@example.com')
on conflict do nothing;
