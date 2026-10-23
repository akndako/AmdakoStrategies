-- Allow PNG signature images in the agreements storage bucket
update storage.buckets
set allowed_mime_types = array['application/pdf', 'image/png']
where id = 'agreements';
