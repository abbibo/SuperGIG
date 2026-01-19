# Sentinel's Journal

## 2025-01-19 - Insecure Storage Rules
**Vulnerability:** The `storage.rules` file contained a catch-all rule `allow read, write: if request.auth != null;`. This permitted any authenticated user to overwrite any file in the storage bucket, including other users' data or potentially system files if they exist.
**Learning:** Default rules or copy-pasted rules often default to "authenticated users can do anything", which is dangerous for multi-tenant apps.
**Prevention:** Always scope storage rules to `userId` paths or specific collections, following the principle of least privilege.
