
 ### Project Description
 The project involves developing a URL shortening service with specific functionalities and access control based on user tiers:

1. **URL Shortening:**
   - **Endpoint for Shortening:** Create an endpoint that accepts a long URL and generates a shortened URL. This endpoint should return a randomly generated short URL.
   - **User-Preferred URL:** Optionally, allow users to specify their preferred shortened URL.

2. **URL Redirection:**
   - The shortened URLs generated should redirect to their respective original long URLs.

3. **User-Specific History:**
   - Create an endpoint to retrieve the history of all URLs shortened by a specific user. This functionality will enable users to view their past shortened URLs.

4. **Tier-Based Access:**
   - Implement tier-based access control where different tiers have varying limits on the number of requests they can make. For instance, Tier 1 users might be allowed 1000 requests, while Tier 2 users might have a limit of 100 requests.
   - Define multiple tiers with different limitations based on the user's access level.

### Packages required to run:
- Express
- Pg
- Sequelize
- Chai
- Mocha
- Spec
- Jest
- Supertest
- Bcrypt

### Prerequisites
- Setup the ENV varibles present in the service.js and install these
```
npm i express pg sequelize chai mocha spec jest supertest bcrypt
```
### Application workflow
Tests:
```
npm test
// runs the /healthz endpoint to check the database status
```
Endpoints:
```javascript
// 1.check db status
GET /healthz

// 2.Bring All Urls Irrespective of user
GET /getAll

// 3. Creating a new User and Quota
POST /addUser

//4. Creating a new Short Url
POST /addUrl

//5.Bring Urls based on User
GET /getUrls

//6.Get User Data and Fetch User Quota
GET /getMyDetails
```
#### Sample JSON Response of addUser endpoint:
```JSON
{
    "id": 1,
    "first_name": "ruthvik",
    "last_name": "garlapati",
    "username": "ruthvik2@gmail.com",
    "max_urls": 100,
    "curr_urls": 0,
    "account_created": "2023-11-04T15:55:38.061Z",
    "account_updated": "2023-11-04T15:55:38.142Z"
}
```
#### Sample JSON Reponse of addUrl endpoint:
```JSON
{
    "id": 1,
    "user_id": 1,
    "longUrl": "http://ruthivk.com/fgrgdfgdfgsdfghsonhadslkcmjgnjdnfjnckdjsh;iusahd'lsadfhkscnhfmlksvmlkxsdijmbkncmoudfmhvoi",
    "shortUrl": "http://shorturl.ly/ef847f96",
    "url_created": "2023-11-04T15:56:27.531Z",
    "updatedAt": "2023-11-04T15:56:27.531Z"
}
```
#### Sample JSON Response of getAll endpoint:
```JSON
[
    {
        "id": 1,
        "user_id": 1,
        "longUrl": "http://ruthivk.com/fgrgdfgdfgsdfghsonhadslkcmjgnjdnfjnckdjsh;iusahd'lsadfhkscnhfmlksvmlkxsdijmbkncmoudfmhvoi",
        "shortUrl": "http://shorturl.ly/ef847f96",
        "url_created": "2023-11-04T15:56:27.531Z",
        "updatedAt": "2023-11-04T15:56:27.531Z"
    },
    {
        "id": 2,
        "user_id": 1,
        "longUrl": "http://ruthivk.com/fgrgdfgdfgsdjgnjdnfjnckdjsh;iusahd'lsadfhkscnhfmlksvmlkxsdijmbkncmoudfmhvoi",
        "shortUrl": "http://shorturl.ly/db52cab0",
        "url_created": "2023-11-04T15:57:34.157Z",
        "updatedAt": "2023-11-04T15:57:34.157Z"
    },
    {
        "id": 3,
        "user_id": 1,
        "longUrl": "http://ruthivk.com/;iusahd'lsadfhkscnhfmlksvmlkxsdijmbkncmoudfmhvoi",
        "shortUrl": "http://shorturl.ly/3f1ca23d",
        "url_created": "2023-11-04T15:57:40.000Z",
        "updatedAt": "2023-11-04T15:57:40.000Z"
    },
    {
        "id": 4,
        "user_id": 2,
        "longUrl": "http://ruthivk.com/;iusahd'dskjnfskdjfbkjsdfljsbf lkjs chfksjnkjsdbvkjxmnjdbnvkjdvkcjs hfksdhflknsd hfkjshflkjsdfhkjsdfbkbhsdfjkhsbdfkjh",
        "shortUrl": "http://shorturl.ly/9d9c4476",
        "url_created": "2023-11-04T15:58:18.155Z",
        "updatedAt": "2023-11-04T15:58:18.155Z"
    },
    {
        "id": 5,
        "user_id": 2,
        "longUrl": "http://ruthivk.com/sdfdsfsdcfxsaffjhglskjLBKJNxdhkj/;iusahd'dskjnfskdjfbkjsdfljsbf lkjs chfksjnkjsdbvkjxmnjdbnvkjdvkcjs hfsdffsdfdsfsksdhflknsd hfkjshflkjsdfhkjsdfbkbhsdfjkhsbdfkjh",
        "shortUrl": "http://shorturl.ly/337b5e8b",
        "url_created": "2023-11-04T15:58:36.188Z",
        "updatedAt": "2023-11-04T15:58:36.188Z"
    }
]
```
#### Sample Response of /getMyDetails endpoint:
```JSON
{
    "id": 2,
    "first_name": "ruthvik",
    "last_name": "garlapati",
    "username": "ruthvik@gmail.com",
    "max_urls": 98,
    "curr_urls": 2,
    "account_created": "2023-11-04T15:57:59.469Z",
    "account_updated": "2023-11-04T15:58:36.194Z"
}
```
#### Sample JSON Response for /getUrls endpoint:
```JSON
[
    {
        "id": 4,
        "user_id": 2,
        "longUrl": "https://ruthivk.com/;iusahd'dskjnfskdjfbkjsdfljsbf lkjs chfksjnkjsdbvkjxmnjdbnvkjdvkcjs hfksdhflknsd hfkjshflkjsdfhkjsdfbkbhsdfjkhsbdfkjh",
        "shortUrl": "http://shorturl.ly/9d9c4476",
        "url_created": "2023-11-04T15:58:18.155Z",
        "updatedAt": "2023-11-04T15:58:18.155Z"
    },
    {
        "id": 5,
        "user_id": 2,
        "longUrl": "https://ruthivk.com/sdfdsfsdcfxsaffjhglskjLBKJNxdhkj/;iusahd'dskjnfskdjfbkjsdfljsbf lkjs chfksjnkjsdbvkjxmnjdbnvkjdvkcjs hfsdffsdfdsfsksdhflknsd hfkjshflkjsdfhkjsdfbkbhsdfjkhsbdfkjh",
        "shortUrl": "http://shorturl.ly/337b5e8b",
        "url_created": "2023-11-04T15:58:36.188Z",
        "updatedAt": "2023-11-04T15:58:36.188Z"
    }
]
```























