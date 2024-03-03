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

//shuffling the input array
function shuffle_array(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//make sure critical trial does not follow "summa-f" trials
function set_trial_order(trial_array) {
    trial_array = shuffle_array(trial_array);
    if (trial_array[trial_array.length - 1].type === "critical") {
        // Swap the last trial with a non-critical trial in the shuffled array
        for (let i = trial_array.length - 2; i >= 0; i--) {
            if (trial_array[i].type !== "critical") {
                [trial_array[trial_array.length - 1], trial_array[i]] = [trial_array[i], trial_array[trial_array.length - 1]];
                break;
            }
        }
    }
    for (let i = 0; i < trial_array.length; i++) {
        if (trial_array[i].data.type === "some-f") {
            if (trial_array[i+1].data.type === "critical") {
                // find the first non-critical trial
                const firstNoncriticalIndex = trial_array.findIndex(item => item.type !== "critical");
                // Swap the current trial with a non-critical trial
                [trial_array[i+1], trial_array[firstNoncriticalIndex]] = [trial_array[firstNoncriticalIndex], firstNoncriticalIndex[i+1]];
            }
        } 
        }
    return trial_array;
}


