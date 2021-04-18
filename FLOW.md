### TODO
[x] Create a User
    - Has: username, email
[x] Create an Activity
    - Has: comment, kind
[ ] Create Labels
    - Has: ?name, color    
[ ] Create Board
    - Has: name
    A board should be created with predifiend labels
    - Add activity
[ ] List Boadrs
[ ] Update Board
    - Change name
[ ] Create a List
    - Has: name, pos
    - Create a list under a board
    - Add activity
[ ] Arrange List in board
    - Should be done using pos

[ ] Update Label
    - Change name
[ ] Create a Card
    - Has: title, ?description, ?dueDate, ?checkList, ?labels, ?members
    - A card is created on a list
    - A card should be created with an Order
[ ] Comment on Card
    - using Activity
[ ] Add a due Date to a Card
    This will indicated that the card hase due Date
    This should create an activity entry
[ ] Associate a Card with a multiple Users
[ ] Move Card between Lists
    - Change list
    - This should also adds an activity entry
[ ] Create checklist on a Card

[ ] List Activity by(Card/Board)
[ ] List Comments(Activity) on Card with filter
[ ] Del Board/Card/List

***[ ] Add Custome filed to a card





### Schema
*Auth
    auth
    userId
User
    name
    email
    $activity
    $cards
Board
    name
    $cards(hasManyCards)
    $activity
    $list
    $labels
Label
    id
    name
    color
List
    id string
    name string
    pos integer
    $board
Card
    id
    boardId
    title
    dueDate
    description
    listId
    pos
    $ownre()
    $members(members(userId, cardId))
    $labels

Checklist
    id
    cardId
    title
    isDone

CardLabels
    cardId
    boardId
    labelId

Labels
    id
    boardId
    name
    color

Activity
    boardId
    listId
    cardId
    message
    kind(Enum)

Members
    userId
    cardId

### API
Create User -> 

Create Board -> We will assume the api is single user
wrape it later in Auth.

Create List -> would be on the board resource
POST /board/{boardId}/list

Create Card -> 
POST /list/{listId}/card

Update Card
PATCH /card/{cardId}
    if dueDate or Member item -> Create an Activity