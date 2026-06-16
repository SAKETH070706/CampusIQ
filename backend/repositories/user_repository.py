import database.mongo as mongo


def find_user_by_roll_no(roll_no: str):

    return mongo.db.users.find_one({
        "roll_no": roll_no
    })


def create_user(user_data: dict):

    mongo.db.users.insert_one(user_data)