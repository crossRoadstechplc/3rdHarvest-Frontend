# 3rd Harvest Backend API Reference

Base URL (dev): `http://localhost:3040`

All responses follow:
- Success: `{ ok: true, ... }`
- Failure: `{ ok: false, error: "..." }`

Auth headers:
- Site token: `Authorization: Bearer <site_jwt>`
- Admin token: `Authorization: Bearer <admin_jwt>`

---

## 1) Authentication

### 1.1 Request OTP
- Method: `POST`
- Path: `/api/auth/request-code`
- Body:
```json
{
  "email": "user@example.com"
}
```
- Success:
```json
{ "ok": true }
```
- Error examples:
```json
{ "ok": false, "error": "Invalid email" }
```

### 1.2 Verify OTP
- Method: `POST`
- Path: `/api/auth/verify-code`
- Body:
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```
- Success:
```json
{
  "ok": true,
  "token": "<site_jwt>",
  "expiresAt": 1730000000000
}
```
- Error examples:
```json
{ "ok": false, "error": "No OTP requested" }
{ "ok": false, "error": "OTP expired" }
{ "ok": false, "error": "Invalid code" }
```

### 1.3 Current User
- Method: `GET`
- Path: `/api/auth/me`
- Headers: site token
- Success:
```json
{
  "ok": true,
  "email": "user@example.com",
  "exp": 1730000000
}
```
- Unauthorized:
```json
{ "ok": false }
```

### 1.4 Verified Emails (compatibility endpoint, admin only)
- Method: `GET`
- Path: `/api/auth/verified-emails`
- Headers: admin token
- Success:
```json
{
  "ok": true,
  "emails": ["a@example.com", "b@example.com"]
}
```

---

## 2) Admin Auth

### 2.1 Admin Login
- Method: `POST`
- Path: `/api/admin/login`
- Body:
```json
{
  "password": "<ADMIN_PASSWORD>"
}
```
- Success:
```json
{
  "ok": true,
  "token": "<admin_jwt>",
  "expiresAt": 1730000000000
}
```
- Invalid credentials:
```json
{ "ok": false, "error": "Invalid credentials" }
```

---

## 3) Leads (Admin)

### 3.1 Detailed leads
- Method: `GET`
- Path: `/api/admin/leads`
- Headers: admin token
- Success:
```json
{
  "ok": true,
  "leads": [
    {
      "id": 1,
      "email": "a@example.com",
      "first_verified_at": "2026-03-09T00:00:00.000Z",
      "last_verified_at": "2026-03-09T01:00:00.000Z",
      "verify_count": 2
    }
  ]
}
```

### 3.2 Lead emails only (export-friendly)
- Method: `GET`
- Path: `/api/admin/leads/emails`
- Headers: admin token
- Success:
```json
{
  "ok": true,
  "emails": ["a@example.com", "b@example.com"]
}
```

---

## 4) Newsletter

### 4.1 Subscribe (public)
- Method: `POST`
- Path: `/api/newsletter/subscribe`
- Body:
```json
{
  "email": "person@example.com",
  "source": "homepage-newsletter"
}
```
- Success:
```json
{ "ok": true }
```
- Behavior:
- Stores/updates subscription record.
- Sends a newsletter subscription email to the same address.
- Email includes one-click unsubscribe link:
`GET /api/newsletter/unsubscribe?token=<signed_token>`

### 4.2 Unsubscribe (public)
- Method: `POST`
- Path: `/api/newsletter/unsubscribe`
- Body:
```json
{
  "email": "person@example.com"
}
```
- Success:
```json
{ "ok": true }
```

### 4.3 One-click unsubscribe from email link (public)
- Method: `GET`
- Path: `/api/newsletter/unsubscribe`
- Query:
`token=<signed_jwt_token_from_email>`
- Success:
```json
{ "ok": true }
```
- Invalid token:
```json
{ "ok": false, "error": "Invalid unsubscribe token" }
```
- No matching subscription:
```json
{ "ok": false, "error": "Subscription not found" }
```

### 4.4 Newsletter subscriptions (admin)
- Method: `GET`
- Path: `/api/admin/newsletter-subscriptions`
- Headers: admin token
- Success:
```json
{
  "ok": true,
  "subscriptions": [
    {
      "id": 1,
      "email": "person@example.com",
      "status": "subscribed",
      "source": "homepage-newsletter",
      "subscribed_at": "2026-03-09 10:12:00",
      "unsubscribed_at": null
    }
  ]
}
```

### 4.5 Newsletter subscribed emails only (export-friendly)
- Method: `GET`
- Path: `/api/admin/newsletter-subscriptions/emails`
- Headers: admin token
- Success:
```json
{
  "ok": true,
  "emails": ["person@example.com", "another@example.com"]
}
```

---

## 5) Categories

### Admin routes
- `GET /api/admin/categories`
- `POST /api/admin/categories`
- `PUT /api/admin/categories/:id`
- `DELETE /api/admin/categories/:id`

Create/Update body:
```json
{
  "name": "Insights",
  "slug": "insights",
  "description": "Publications and updates"
}
```

### Public route
- `GET /api/categories`

Public/Admin list response:
```json
{
  "ok": true,
  "categories": [
    {
      "id": 1,
      "name": "Insights",
      "slug": "insights",
      "description": "Publications and updates",
      "created_at": "2026-03-09 10:00:00"
    }
  ]
}
```

---

## 6) Tags

### Admin routes
- `GET /api/admin/tags`
- `POST /api/admin/tags`
- `PUT /api/admin/tags/:id`
- `DELETE /api/admin/tags/:id`

Create/Update body:
```json
{
  "name": "Field Report",
  "slug": "field-report"
}
```

### Public route
- `GET /api/tags`

Response:
```json
{
  "ok": true,
  "tags": [
    {
      "id": 1,
      "name": "Field Report",
      "slug": "field-report",
      "created_at": "2026-03-09 10:00:00"
    }
  ]
}
```

---

## 7) Authors

### Admin routes
- `GET /api/admin/authors`
- `POST /api/admin/authors`
- `PUT /api/admin/authors/:id`
- `DELETE /api/admin/authors/:id`

Create/Update body:
```json
{
  "name": "Jane Doe",
  "slug": "jane-doe",
  "bio": "Writer",
  "title": "Editor",
  "avatar_url": "https://example.com/avatar.jpg",
  "email": "jane@example.com",
  "linkedin_url": "https://linkedin.com/in/janedoe",
  "is_active": true
}
```

### Public route
- `GET /api/authors`
- Returns active authors only

---

## 8) Posts

### 8.1 Admin routes
- `GET /api/admin/posts`
- `GET /api/admin/posts/:id`
- `POST /api/admin/posts`
- `PUT /api/admin/posts/:id`
- `DELETE /api/admin/posts/:id`

Admin list query params:
- `status` (`draft|published|archived|scheduled`)
- `content_type` (`insight|publication|update`)
- `category_id`
- `author_id`
- `search`
- `page`
- `limit`

Create/Update body:
```json
{
  "title": "Coffee Systems Update",
  "slug": "coffee-systems-update",
  "content_type": "update",
  "excerpt": "Short summary",
  "content_blocks_json": [
    {
      "id": "b1",
      "type": "heading",
      "order": 1,
      "data": { "text": "Title", "level": 2 }
    },
    {
      "id": "b2",
      "type": "paragraph",
      "order": 2,
      "data": { "html": "<p>Body HTML</p>" }
    }
  ],
  "document_url": "https://example.com/report.pdf",
  "external_url": "https://example.com/reference",
  "featured_image_url": "https://example.com/image.jpg",
  "featured_image_alt": "Image alt",
  "status": "published",
  "category_id": 1,
  "author_id": 1,
  "seo_title": "SEO Title",
  "seo_description": "SEO Description",
  "og_image_url": "https://example.com/og.jpg",
  "is_featured": true,
  "allow_comments": false,
  "published_at": null,
  "tag_ids": [1, 2]
}
```

Notes:
- Preferred flow: send `content_blocks_json`.
- Compatibility fallback: legacy `content_html` is still accepted.
- Backend generates and stores:
`content_blocks_json`, sanitized `content_html`, and `content_text`.
- If the post becomes `published`, subscribed newsletter users are emailed a post link.

Admin single response (`GET /api/admin/posts/:id`) includes:
- full post fields
- `content_blocks_json`, `content_html`, `content_text`, `content_type`, `document_url`, `external_url`
- `category`, `author`, `tags`

### 8.2 Public routes
- `GET /api/posts`
- `GET /api/posts/:slug`

Public list query params:
- `page`
- `limit`
- `content_type`
- `category` (slug)
- `tag` (slug)
- `search`
- `featured` (`true|false`)

Example:
- `/api/posts?content_type=update&tag=program-update&page=1&limit=10`

Public list item shape:
```json
{
  "id": 1,
  "title": "Coffee Systems Update",
  "slug": "coffee-systems-update",
  "content_type": "update",
  "excerpt": "Short summary",
  "document_url": "https://example.com/report.pdf",
  "external_url": "https://example.com/reference",
  "featured_image_url": "https://example.com/image.jpg",
  "featured_image_alt": "Image alt",
  "published_at": "2026-03-09T10:00:00.000Z",
  "seo_title": "SEO Title",
  "seo_description": "SEO Description",
  "is_featured": true,
  "category": { "id": 1, "name": "Insights", "slug": "insights" },
  "author": { "id": 1, "name": "Jane Doe", "slug": "jane-doe" },
  "tags": [
    { "id": 1, "name": "Field Report", "slug": "field-report" }
  ]
}
```

Public single shape (`GET /api/posts/:slug`) includes:
- all list fields plus:
- `content_blocks_json`
- `content_html`
- `content_text`
- `status`
- timestamps (`created_at`, `updated_at`)

---

## 9) Media Uploads

### 9.1 Upload image (admin)
- Method: `POST`
- Path: `/api/admin/uploads/image`
- Headers: admin token
- Content type: `multipart/form-data`
- Fields:
- `file` (required)
- `postId` (optional integer)
- Allowed mime types:
- `image/jpeg`
- `image/png`
- `image/webp`
- Max size: `1 MB`

### 9.2 Upload video (admin)
- Method: `POST`
- Path: `/api/admin/uploads/video`
- Headers: admin token
- Content type: `multipart/form-data`
- Fields:
- `file` (required)
- `postId` (optional integer)
- Allowed mime types:
- `video/mp4`
- `video/webm`
- Max size: `3 MB`

Successful response shape:
```json
{
  "ok": true,
  "media": {
    "id": 1,
    "post_id": 12,
    "uuid": "uuid-value",
    "type": "image",
    "url": "/uploads/posts/12/uuid-value.jpg",
    "original_name": "cover.jpg",
    "size_bytes": 123456,
    "mime_type": "image/jpeg"
  }
}
```

Files are served from:
- `GET /uploads/*`

Storage behavior:
- with postId: `/uploads/posts/{postId}/...`
- without postId: `/uploads/posts/unassigned/...`

---

## 10) Common errors

- Validation input error: `400`
```json
{ "ok": false, "error": "Invalid input" }
```
- Unauthorized: `401`
```json
{ "ok": false, "error": "Unauthorized" }
```
- Not found: `404`
```json
{ "ok": false, "error": "Post not found" }
```
- Conflict (duplicates): `409`
```json
{ "ok": false, "error": "Post slug already exists" }
```
- Server error: `500`
```json
{ "ok": false, "error": "Internal server error" }
```
