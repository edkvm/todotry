
## Test User
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"edkvm", "email":"edkvmn@gmail.com"}' \
  http://localhost:8000/api/users

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"hello", "email":"hello@gmail.com"}' \
  http://localhost:8000/api/users


curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:8000/api/users

## Test User email error
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"edkvm", "email":"edkvmngmail.com"}' \
  http://localhost:8000/api/users

## Test board
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"New Board"}' \
  http://localhost:8000/api/boards

### Show Boards
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:8000/api/boards

### Update Board name
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"name":"Updated Board"}' \
  http://localhost:8000/api/boards/22

### Show all Labels in Board
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:8000/api/boards/27/labels

### Update Label in Board
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"name":"MUST"}' \
  http://localhost:8000/api/boards/27/labels/10

## Test List
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"Backlog"}' \
  http://localhost:8000/api/boards/1/lists

### Change list position
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"pos": 120000}' \
  http://localhost:8000/api/boards/27/lists/2

## Card

### Test Create Card 
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"Sec Task", "description":"Description Sec Task"}' \
  http://localhost:8000/api/lists/2/cards

### Get Card
curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:8000/api/cards/2 

### Test Card Comment
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"message":"First Comment"}' \
  http://localhost:8000/api/cards/2/comments

### Test Card Add member 
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"labelId": 10}' \
  http://localhost:8000/api/cards/2/labels

### Test Move Card
curl --header "Content-Type: application/json" \
  --request PATCH \
  --data '{"pos": 120000}' \
  http://localhost:8000/api/cards/2/move