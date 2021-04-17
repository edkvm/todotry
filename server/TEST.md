## Test board
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"New Board"}' \
  http://localhost:8000/api/boards

## Test List
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"Backlog"}' \
  http://localhost:8000/api/boards/1/lists

## Test Card
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"First Task", "description":"Description First Task"}' \
  http://localhost:8000/api/lists/1/cards