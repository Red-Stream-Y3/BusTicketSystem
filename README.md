# BusTicketSystem
A bus ticketing system developed for SLIIT Y3S2 CSSE module

## scanner - mobile - driver
- register account ✅
- login ✅
- before departing
    - create bus journey
        - select route
        - select bus
        - auto set driver as current user
        - set departure time
        - set state to scheduled
- on departure
    - set departure time
    - set bus journey state to departed
- during journey
    - scan user QR when passenger boards
        - check user trip info(auto) 
        - check user payment info(auto)
        - play confirm or decline sound
        - add user to bus journey
        - update user trip state to boarded
        - add bus and driver to user trip
        - update user departure time
    - scan user QR when passenger leaves
        - check user trip info(auto)
        - check user payment info(auto)
        - play confirm or decline sound
        - update user trip state to completed
        - update user arrival time
- on arrival
    - set arrival time
    - set bus journey state to arrived

*notes 
- show stats of current bus journey on screen
eg: total passengers, number of boarded, number of completed, number of declined
- show a list of bus stops on screen according to destinations selected by users.


## customer app - mobile - passenger
- register account ✅
- login ✅
- before departing
    - create user trip
        - select route
        - select origin
        - select destination
        - set state to scheduled
        - make payment ✅
- on departure
    - show QR code to driver
        - generate QR for user trip
- on arrival
    - show QR code to driver
- recharge credit ✅
- view balance ✅
- view history ✅

admin app - web - manager
- add bus
- add route
- add bus stops to route
- add fare calculation method
- add busses to route
- statistics (if possible)