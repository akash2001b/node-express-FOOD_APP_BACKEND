

# node-express-FOOD_APP_BACKEND
# FOOD_API

## Documentation
Detailed documentation with examples available at : https://documenter.getpostman.com/view/15568746/TzY7fEGG


## Indices

* [Dishes](#dishes)

  * [Create a dish (authenticated User)](#1-create-a-dish-(authenticated-user))
  * [Delete dish (authenticated User)](#2-delete-dish-(authenticated-user))
  * [Get ALL dishes](#3-get-all-dishes)
  * [Get dish by ID](#4-get-dish-by-id)
  * [Update dish (authenticated User)](#5-update-dish-(authenticated-user))

* [Dishes comments](#dishes-comments)

  * [Delete comments for a Dish(posted by the same user)](#1-delete-comments-for-a-dish(posted-by-the-same-user))
  * [Get comments for a Dish](#2-get-comments-for-a-dish)
  * [Post comments for a Dish(authenticated user)](#3-post-comments-for-a-dish(authenticated-user))
  * [update comments for a Dish(authenticated user)](#4-update-comments-for-a-dish(authenticated-user))

* [Favourite dishes](#favourite-dishes)

  * [ADD favourite dishes of a logged in User](#1-add-favourite-dishes-of-a-logged-in-user)
  * [Delete favourite dishes of a logged in User](#2-delete-favourite-dishes-of-a-logged-in-user)
  * [GET favourite dishes of a logged in User](#3-get-favourite-dishes-of-a-logged-in-user)
  * [Post single favourite dishes of a logged in User](#4-post-single-favourite-dishes-of-a-logged-in-user)

* [Image Upload](#image-upload)

  * [Upload image for a user](#1-upload-image-for-a-user)

* [User Authentication](#user-authentication)

  * [User Signup](#1-user-signup)
  * [User login](#2-user-login)


--------


## Dishes



### 1. Create a dish (authenticated User)


Add dish to database(authenticated user)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3000/dishes
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
{
    "name": "KFC chicken",
    "image": "images/kfc.png",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "featured": "true",
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    "comments": []
}
```



### 2. Delete dish (authenticated User)


Delete a dish from database(authenticated user)


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: localhost:3000/dishes/60c0b89f0f16cd0dce3f0a69
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
{
    "category": "staters",
    "label": "Spicy"
    
}
```



### 3. Get ALL dishes


Fetch all dishes from database


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://localhost:3443/dishes
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk3ZmFmYzdkYzg0ZTIzMTU4ZjljZmUiLCJpYXQiOjE2MjA2NTQwMTgsImV4cCI6MTYyMDc0MDQxOH0.reKmb2wBXJeO0UzqTQDlp14RjxolP_0Y7uW_BJwCVj8 |  |



***Body:***

```js        
{
    "name": "Uthappizza",
    "image": "images/uthappizza.png",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "featured": "true",
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    "comments": [
        {
            "rating": 5,
            "comment": "Imagine all the eatables, living in conFusion!",
            "author": "John Lemon",
            "date": "2012-10-16T17:57:28.556094Z"
        },
        {
            "rating": 4,
            "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
            "author": "Paul McVites",
            "date": "2014-09-05T17:57:28.556094Z"
        },
        {
            "rating": 3,
            "comment": "Eat it, just eat it!",
            "author": "Michael Jaikishan",
            "date": "2015-02-13T17:57:28.556094Z"
        },
        {
            "rating": 4,
            "comment": "Ultimate, Reaching for the stars!",
            "author": "Ringo Starry",
            "date": "2013-12-02T17:57:28.556094Z"
        },
        {
            "rating": 2,
            "comment": "It's your birthday, we're gonna party!",
            "author": "25 Cent",
            "date": "2011-12-02T17:57:28.556094Z"
        }
    ]
}
```



### 4. Get dish by ID


Fetch a dish from database by id


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: https://localhost:3443/dishes/609f58d4a29da51fe90afb8c
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk3ZmFmYzdkYzg0ZTIzMTU4ZjljZmUiLCJpYXQiOjE2MjA2NTQwMTgsImV4cCI6MTYyMDc0MDQxOH0.reKmb2wBXJeO0UzqTQDlp14RjxolP_0Y7uW_BJwCVj8 |  |



***Body:***

```js        
{
    "name": "Uthappizza",
    "image": "images/uthappizza.png",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "featured": "true",
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    "comments": [
        {
            "rating": 5,
            "comment": "Imagine all the eatables, living in conFusion!",
            "author": "John Lemon",
            "date": "2012-10-16T17:57:28.556094Z"
        },
        {
            "rating": 4,
            "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
            "author": "Paul McVites",
            "date": "2014-09-05T17:57:28.556094Z"
        },
        {
            "rating": 3,
            "comment": "Eat it, just eat it!",
            "author": "Michael Jaikishan",
            "date": "2015-02-13T17:57:28.556094Z"
        },
        {
            "rating": 4,
            "comment": "Ultimate, Reaching for the stars!",
            "author": "Ringo Starry",
            "date": "2013-12-02T17:57:28.556094Z"
        },
        {
            "rating": 2,
            "comment": "It's your birthday, we're gonna party!",
            "author": "25 Cent",
            "date": "2011-12-02T17:57:28.556094Z"
        }
    ]
}
```



### 5. Update dish (authenticated User)


Update a particular dish in database(authenticated user)


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:3000/dishes/60c0b89f0f16cd0dce3f0a69
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
{
    "category": "staters",
    "label": "Spicy"
    
}
```



## Dishes comments



### 1. Delete comments for a Dish(posted by the same user)


delete comments from database for the dish 


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: localhost:3000/dishes/609f58d4a29da51fe90afb8c/comments/60c0bb6e0f16cd0dce3f0a6a
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
{
    "rating": 2
}
```



### 2. Get comments for a Dish



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:3000/dishes/609f58d4a29da51fe90afb8c/comments
```



### 3. Post comments for a Dish(authenticated user)


Add comments to a particular dish (authenticate user)


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3000/dishes/609f58d4a29da51fe90afb8c/comments
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
{
    "rating": 5,
    "comment": "Imagine all the eatables, living in conFusion!",
    "author": "John Lemon",
    "date": "2012-10-16T17:57:28.556094Z"
}
```



### 4. update comments for a Dish(authenticated user)


update comments on a dish posted by the same user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:3000/dishes/609f58d4a29da51fe90afb8c/comments/60c0bb6e0f16cd0dce3f0a6a
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
{
    "rating": 2
}
```



## Favourite dishes



### 1. ADD favourite dishes of a logged in User


ADD favourite dishes for a logged in user to database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3000/favorites
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
[
    {"_id": "609f58aca29da51fe90afb8a"},
    {"_id":"609f58d4a29da51fe90afb8c"}
]
```



### 2. Delete favourite dishes of a logged in User


Delete favourite dish of a logged in User from database


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: localhost:3000/favorites/609f58aca29da51fe90afb8a
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
[
    {"_id": "609f58aca29da51fe90afb8a"},
    {"_id":"609f58d4a29da51fe90afb8c"}
]
```



### 3. GET favourite dishes of a logged in User


Fetch all favourite dishes of the logged in user from database


***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:3000/favorites
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



### 4. Post single favourite dishes of a logged in User


post a single favourite dish of a logged in user via url


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3000/favorites/609f58aca29da51fe90afb8a
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

```js        
[
    {"_id": "609f58aca29da51fe90afb8a"},
    {"_id":"609f58d4a29da51fe90afb8c"}
]
```



## Image Upload



### 1. Upload image for a user



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: https://localhost:3443/imageUpload
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlhNTY1NDk2OTU3OTFmODRhN2Y1NWQiLCJpYXQiOjE2MjMyNDI1NDksImV4cCI6MTY1NDc3ODU0OX0.UhlT_apRMs7iCKYZK1m0zszLUIT-NQ6RF3_gUOJgOO4 |  |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| imageFile |  |  |



## User Authentication



### 1. User Signup


Register user on database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3000/users/signup
```



***Body:***

```js        
{
    "username":"sam",
    "password": "password",
    "firstname":"Sam",
    "lastname": "Frank"
}
```



### 2. User login


Authenticate User


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:3000/users/login
```



***Body:***

```js        
{
    "username":"admin",
    "password": "password"
}
```

