function evaluate_response(data) {
    if (data.response == 'f' & data.correct == 'f') {
        data.result = "hit"
    } else if (data.response == 'k' & data.correct == 'k') {
        data.result = "correct_rejection"
    } else if (data.response == 'f' & data.correct == 'k') {
        data.result = "miss"
    } else  {
        data.result = "false_alarm"
    }
}

function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.stimulus = json_object[i].stimulus;
        obj.data = {};
        obj.data.correct = json_object[i].correct;
        obj.prompt = {};
        obj.prompt = json_object[i].prompt;
        tv_array.push(obj)
    }
    return tv_array;
}