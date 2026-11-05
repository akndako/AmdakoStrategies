-- ============================================================
-- Migration: 20240114_14_schedule_monthly_roi
-- Description: Runs process_monthly_roi() every day at 06:00 Lagos time
--   (05:00 UTC). The function only credits on the payout day (30th, or the
--   last day of February) and is a no-op on other days, so a daily run also
--   catches up if a payout day was missed.
--
-- Requires the pg_cron extension (Supabase: Database > Extensions > pg_cron).
-- Run after 20240113_13_investment_roi_processing.sql.
-- ============================================================

create extension if not exists pg_cron;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'process-monthly-roi') then
    perform cron.unschedule('process-monthly-roi');
  end if;
end $$;

select cron.schedule(
  'process-monthly-roi',
  '0 5 * * *',
  $$ select public.process_monthly_roi(); $$
);
