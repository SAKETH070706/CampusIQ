def match_anchor(anchor_text, exam_type):

    anchor_text = anchor_text.lower()
    exam_type = exam_type.lower()

    return exam_type in anchor_text