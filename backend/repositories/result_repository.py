import database.mongo as mongo


def insert_semester_result(result_data: dict):

    mongo.db.results.update_one(
        {
            "roll_no": result_data["roll_no"],
            "semester": result_data["semester"]
        },

        {
            "$set": result_data
        },

        upsert=True
    )


def find_results_by_roll_no(roll_no: str):

    return list(
        mongo.db.results.find(
            {"roll_no": roll_no},
            {"_id": 0}
        )
    )


def get_semester_results(semester: str):

    return list(
        mongo.db.results.find(
            {"semester": semester},
            {"_id": 0}
        )
    )