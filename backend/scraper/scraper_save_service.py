from repositories import student_repository

def save_scraped_data(scraped_data: dict):
    existing_student = student_repository.find_by_roll_no(scraped_data["roll_no"])
    
    student_document = {
        "roll_no": scraped_data["roll_no"],
        "data_source": scraped_data["data_source"],
        "student_info": scraped_data["student_info"],  
        "semesters": scraped_data["semesters"]
    }

    

    if existing_student:
        student_repository.update_student(scraped_data["roll_no"], student_document)
        print(f"✅ Updated student {scraped_data['roll_no']}")
    else:
        
        for sem in student_document["semesters"]:
            sem["sgpa"] = float(sem["sgpa"])
            sem["cgpa"] = float(sem["cgpa"])
            sem["total_credits"] = float(sem["total_credits"])
            sem["credits_secured"] = float(sem["credits_secured"])
            for subj in sem["subjects"]:
                subj["credits"] = float(subj["credits"])

        student_repository.insert(student_document)
        print(f"✅ Inserted student {scraped_data['roll_no']}")
