# Strapi API Routes Reference

## Base URL
- Default: `http://localhost:1337`
- Production: Set via `PRIVATE_STRAPI_URL` environment variable

## Authentication
All API requests require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_API_TOKEN
```

---

## Content Types

### 1. Playlists (`/api/playlists`)

#### GET Routes
- **Get All Playlists**
  - `GET /api/playlists`
  - Query params: `populate`, `pagination[page]`, `pagination[pageSize]`, `sort`, `filters`
  
- **Get Playlist by Document ID**
  - `GET /api/playlists/:id`
  - Query params: `populate`
  
- **Get Playlist by playlistId (UID)**
  - `GET /api/playlists?filters[playlistId][$eq]=:playlistId`
  - Query params: `populate`

#### POST Routes
- **Create Playlist**
  - `POST /api/playlists`
  - Body: `{ "data": { ... } }`

#### PUT Routes
- **Update Playlist**
  - `PUT /api/playlists/:id`
  - Body: `{ "data": { ... } }`

#### DELETE Routes
- **Delete Playlist**
  - `DELETE /api/playlists/:id`

#### Filter Examples
- Recently Updated: `?sort=lastUploadedAt:desc&filters[lastUploadedAt][$notNull]=true`
- By Channel: `?filters[channel][id][$eq]=:channelId`
- By Category: `?filters[categories][id][$eq]=:categoryId`
- Completed: `?filters[isCompleted][$eq]=true`

---

### 2. Channels (`/api/channels`)

#### GET Routes
- **Get All Channels**
  - `GET /api/channels`
  - Query params: `populate`, `pagination[page]`, `pagination[pageSize]`, `sort`, `filters`
  
- **Get Channel by Document ID**
  - `GET /api/channels/:id`
  - Query params: `populate`
  
- **Get Channel by channelId (UID)**
  - `GET /api/channels?filters[channelId][$eq]=:channelId`
  - Query params: `populate`
  
- **Get Channel with Playlists**
  - `GET /api/channels/:id?populate[playlists][populate]=*`

#### POST Routes
- **Create Channel**
  - `POST /api/channels`
  - Body: `{ "data": { ... } }`

#### PUT Routes
- **Update Channel**
  - `PUT /api/channels/:id`
  - Body: `{ "data": { ... } }`

#### DELETE Routes
- **Delete Channel**
  - `DELETE /api/channels/:id`

---

### 3. Categories (`/api/categories`)

#### GET Routes
- **Get All Categories**
  - `GET /api/categories`
  - Query params: `populate`, `pagination[page]`, `pagination[pageSize]`, `sort`, `filters`
  
- **Get Category by Document ID**
  - `GET /api/categories/:id`
  - Query params: `populate`
  
- **Get Category with Playlists**
  - `GET /api/categories/:id?populate[playlists][populate]=*`

#### POST Routes
- **Create Category**
  - `POST /api/categories`
  - Body: `{ "data": { ... } }`

#### PUT Routes
- **Update Category**
  - `PUT /api/categories/:id`
  - Body: `{ "data": { ... } }`

#### DELETE Routes
- **Delete Category**
  - `DELETE /api/categories/:id`

---

## Media/Upload Routes (`/api/upload`)

#### POST Routes
- **Upload Single File**
  - `POST /api/upload`
  - Content-Type: `multipart/form-data`
  - Body: Form data with `files` field
  
- **Upload Multiple Files**
  - `POST /api/upload`
  - Content-Type: `multipart/form-data`
  - Body: Form data with multiple `files` fields

#### GET Routes
- **Get All Media Files**
  - `GET /api/upload/files`
  - Query params: `pagination[page]`, `pagination[pageSize]`
  
- **Get Media File by ID**
  - `GET /api/upload/files/:id`

#### DELETE Routes
- **Delete Media File**
  - `DELETE /api/upload/files/:id`

---

## Query Parameters

### Pagination
- `pagination[page]` - Page number (starts at 1)
- `pagination[pageSize]` - Items per page (max 100, default 25)

### Sorting
- `sort=field:asc` - Sort ascending
- `sort=field:desc` - Sort descending
- Multiple sorts: `sort=id:desc&sort=Title:asc`

### Population (Relations)
- `populate=*` - Populate all relations
- `populate[relationName]` - Populate specific relation
- `populate[relationName][populate]=*` - Nested population
- `populate[relationName][fields][0]=field1` - Select specific fields

### Filtering
- `filters[field][$eq]=value` - Equal to
- `filters[field][$ne]=value` - Not equal to
- `filters[field][$gt]=value` - Greater than
- `filters[field][$gte]=value` - Greater than or equal
- `filters[field][$lt]=value` - Less than
- `filters[field][$lte]=value` - Less than or equal
- `filters[field][$contains]=value` - Contains (string)
- `filters[field][$notNull]=true` - Field is not null
- `filters[field][$null]=true` - Field is null
- `filters[field][$in][0]=value1&filters[field][$in][1]=value2` - In array
- `filters[field][$notIn][0]=value1` - Not in array
- `filters[relation][id][$eq]=value` - Filter by relation ID

### Field Selection
- `fields[0]=field1&fields[1]=field2` - Select specific fields

---

## Example Requests

### Get all playlists with pagination
```
GET /api/playlists?populate=*&pagination[page]=1&pagination[pageSize]=25&sort=id:desc
```

### Get recently updated playlists
```
GET /api/playlists?populate=*&sort=lastUploadedAt:desc&filters[lastUploadedAt][$notNull]=true&pagination[pageSize]=10
```

### Create a playlist
```
POST /api/playlists
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "data": {
    "playlistId": "PLrAXtmRdnEQy6nuLMH7xY4QjO7n8_QgxX",
    "url": "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMH7xY4QjO7n8_QgxX",
    "Title": "Example Playlist",
    "Description": "Playlist description",
    "itemCount": 10,
    "isCompleted": false
  }
}
```

### Update a channel
```
PUT /api/channels/1
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "data": {
    "title": "Updated Channel Title",
    "subscriberCount": 2000
  }
}
```

### Filter channels by subscriber count
```
GET /api/channels?filters[subscriberCount][$gte]=1000&filters[subscriberCount][$lte]=10000
```

---

## Response Format

All responses follow Strapi's standard format:

### Collection Response
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "...",
      "createdAt": "...",
      "updatedAt": "...",
      "publishedAt": "...",
      // ... content type fields
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 4,
      "total": 100
    }
  }
}
```

### Single Item Response
```json
{
  "data": {
    "id": 1,
    "documentId": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "publishedAt": "...",
    // ... content type fields
  },
  "meta": {}
}
```

---

## Importing into Postman

1. Open Postman
2. Click "Import" button
3. Select the `Strapi_API_Routes.postman_collection.json` file
4. Set the collection variables:
   - `base_url`: Your Strapi base URL (default: `http://localhost:1337`)
   - `api_token`: Your Strapi API token

## Getting an API Token

1. Log into Strapi Admin Panel (`http://localhost:1337/admin`)
2. Go to Settings → API Tokens
3. Create a new API Token
4. Copy the token and use it in the `api_token` collection variable

