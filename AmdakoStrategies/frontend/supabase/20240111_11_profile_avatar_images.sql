-- Allow profile picture image types in the agreements storage bucket (avatars use user-id prefix paths)
update storage.buckets
set allowed_mime_types = array[
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif'
]
where id = 'agreements';
