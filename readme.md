## Live Link: https://cow-hut.up.railway.app

## Application Routes:
## User
* api/v1/auth/signup (POST)
* api/v1/users/all-users (GET)
* api/v1/users/single-user/648dc93b4c40c06393e7436c (Single GET) 
* api/v1/users/update-user/648dc93b4c40c06393e7436c (PATCH)
* api/v1/users/delete-user/648dc93b4c40c06393e7436c (DELETE) 
## Cows
* api/v1/cows/create-cow (POST)
* api/v1/cows/all-cows (GET)
* api/v1/cows/single-cow/648dcb06030b385c5da12cd8 (Single GET)
* api/v1/cows/update-cow/648dcb06030b385c5da12cd8 (PATCH)
* api/v1/cows/delete-cow/648dcb06030b385c5da12cd8 (DELETE) 
## Pagination and Filtering routes of Cows
* api/v1/cows/all-cows?pag=1&limit=10
* api/v1/cows/all-cows?sortBy=price&sortOrder=asc
* api/v1/cows/all-cows?minPrice=20000&maxPrice=70000
* api/v1/cows/all-cows?location=Dhaka
* api/v1/cows/all-cows?searchTerm=Dha
## Orders
* api/v1/orders/create-order (POST)
* api/v1/orders/all-orders (GET)