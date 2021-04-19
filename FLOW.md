### TODO
[x] Create a User
    - Has: username, email
[x] Create an Activity
    - Has: comment, kind
[x] Create Labels
    - Has: ?name, color
[x] Create Board
    - Has: name
    A board should be created with predifiend labels
    - Add activity
[x] Show Boadrs
[x] Update Board
    - Change name
[x] Create a List
    - Has: name, pos
    - Create a list under a board
    - Add activity
[x] Arrange List in board
    - Should be done using pos
[x] Show Labels on Board
[x] Update Label
    - Change name
[x] Create a Card
    - Has: title, ?description, ?dueDate
    - A card is created on a list
    - A card should be created with an Order
[x] View Card
[x] Add ?members to Card
[x] Add Labels to Card
[x] Comment on Card
    - using Activity
[x] Associate a Card with a multiple Users
[x] Move Card between Lists
    - Change list
    - This should also adds an activity entry
[ ] Add a due Date to a Card
    This will indicated that the card hase due Date
    This should create an activity entry
[ ] Create checklist on a Card

[ ] Show Activity by(Card/Board)
[ ] Show Comments(Activity) on Card with filter
[ ] Add CheckItems to Card
[ ] Del Board/Card/List

***[ ] Add Custome filed to a card


Order Cards or Lists:

[A|65500] [B|120000] [C|240000]
B-(B-A)/2 => C 

[A] [B] [C] [D] [E] 
minListId A maxListId D

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