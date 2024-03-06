//initialize jspsych & show data when done
const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: "实验完成进度条",
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
    }
}); 

let timeline = []; //empty timeline to which we will add later

//preload audio files
const preload_audio_array = ['audio/2.wav', 'audio/6.wav', 'audio/10.wav', 'audio/kaching.wav', 'audio/meiyou.wav', 'audio/suoyou.wav', 'audio/yixie.wav', 'audio/youxie.wav'];
const preload_image_array = ['image/0.jpg', 'image/1.jpg', 'image/2.jpg', 'image/3.jpg', 'image/4.jpg', 'image/5.jpg', 'image/6.jpg', 'image/7.jpg', 'image/8.jpg', 'image/9.jpg', 'image/10.jpg', 'image/11.jpg', 'image/12.jpg', 'image/13.jpg', 'image/keypress.jpg', 'image/mint_prep_page_english.jpg', 'image/mint_prep_page.jpg', 'image/mint_sprint.jpg', 'image/store_worker_1.jpg', 'image/store_worker_2.jpg', 'image/store_worker_fired.jpg', 'image/store_worker_gumball.jpg' ];
const preload_trial = {
    type: jsPsychPreload,
    audio: preload_audio_array,
    images: preload_image_array
};

timeline.unshift(preload_trial);

// show irb
const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p style="width: 1000px; margin-bottom: 250px">
    斯坦福大学语言学系邀请您参加一项研究。
    <BR><BR>您会完成一项跟语言有关的任务，例如读或听一些字、描述图片或场景、造句、或完成简单的语言游戏。
    <BR>本研究中没有已知的风险、成本或不适。
    <BR><BR>
    如果您同意参与这项研究，请继续。
    </p>
    <p style="width: 1000px; font-size: 9pt; position: relative; text-align: justify">
    如果您已读完此表格并决定参与此项目，请明白您的参与是自愿的，您有权随时撤回您的同意或停止参与，而不会受到惩罚或失去您原本可以享有的利益有权。 您有权拒绝回答任何问题。 您的个人隐私将在研究产生的所有已发布和书面数据中得到保护。
    <BR><BR>联系信息：问题、疑虑或投诉：如果您对本研究、其程序、风险和益处有任何问题、疑虑或投诉，请致电 (650) 723-4284 联系 Meghan Sumner 教授。如果您对这项研究的进行方式不满意，或者如果您对研究或您作为参与者的权利有任何疑虑、投诉或一般问题，请联系斯坦福机构审查委员会 (IRB) 发言与独立于研究团队的人联系 (650)-723-2480 或拨打免费电话 1-866-680-2906。 您也可以致函 Stanford IRB, Stanford University, Stanford, CA 94305-5401 或发送电子邮件至 irbnonmed@stanford.edu。
    </p>`,
    choices: ['继续'],
    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
// push to the timeline
timeline.push(irb);

//audio+microphone requirement
const audio_microphone_requirement = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>这个实验将会播放音频。<BR><BR><strong><p2>您必须年满十八周岁才能参与此项实验，并且您需要会说中文、英文两种语言。</p2></strong> <br><br>请您在安静的地方用电脑完成这个实验，并确保您把<strong><p2>电脑音量调整至合适的程度</p2></strong>。 <br><br>请按空格键继续。</p>",
    choices: [" "]
};
timeline.push(audio_microphone_requirement);

//instructions
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "在接下来的实验中，你将听到一些句子。你的任务是根据你是否同意这些句子来回答“是”或“否”。这个实验应该需要大约20分钟的时间。<br><br>当你准备好开始时，请按下空格键。",
    choices: [" "]
};
timeline.push(instructions);

//display cover story
const cover_story = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 
            "<h3><strong><big><p2>Context</p2></big></strong></h3> <br> <img src='image/0.jpg'; alt='gumball_machine'; align='right'; style='height:200px'> <p2 align='left'><big> You are at a candy store and are testing a row of gumball machines. These are special gumball machines that say how many gumballs you got. However, this report is sometimes faulty. </big></p2> <br><br> <img src='image/store_worker_1.jpg' alt='store_worker_sitting' align='left' style='height:200px'> <br><br> <p2 align='right'> <big> The store worker tells you that his boss has threatened to fire him if the gumball machines are left empty, and he really needs this job. He cannot see the machines from the register, but he can normally tell how full they are by the machines' statements.</big> </p2> <br><br><br> <img src='image/store_worker_2.jpg' alt='store_worker_standing' align='center' style='height:200px'> <p2 align='left'> <big> He asks you to tell him if the statement is right or wrong, so that he will know if a machine is empty and needs to be refilled. </big> </p2> <br><br>", 
    choices: [" "],
    prompt: "<h3>Press SPACE to continue <h3>"
};
timeline.push(cover_story);

//keyboard instruction
const response_keys = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
    '<p><font size="5"> Place your right index finger on the <strong>J</strong> key and left index finger on the <strong>F</strong> key. <br><br><img src="image/keypress.jpg"alt="keyboard" align="center" style="height:400px"> <br><br> If you agree with the statement, press <strong>F</strong>; if you disagree with the statement, press <strong>J</strong>. <br>Use your thumb to press <strong>SPACE</strong> and do not move your index fingers. <br> <strong><p2>Please remember, you have four seconds to inform the worker after you hear the statement. </p2></strong> <br><br></p></font> ', 
    choices: [" "],
    prompt: "<h3>Press SPACE to continue<h3>"
};
timeline.push(response_keys);

//tutorials
const tutorial_1 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/kaching.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/0.jpg'; style='height:400px'>`
        },
        {   type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/all.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/13.jpg'; style='height:400px'>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: ['f'],
            stimulus: `<img src='image/13.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<br><h3>Press the <strong>"YES"(F)</strong> key to alert the worker that you agree with the statement.<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2> You let the store worker know that you agree with the statement. He therefore knows that the machine is empty and that he needs to refill the machine. </p2></big></h3><img src='image/store_worker_gumball.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<h3>Press SPACE to continue to next demo <h3>`
        }
    ]
};
timeline.push(tutorial_1);

const tutorial_2 = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/kaching.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/0.jpg'; style='height:400px'>`
        },
        {   type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/none.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/10.jpg'; style='height:400px'>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: ['j'],
            stimulus: `<img src='image/10.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<br><h3>Press the <strong> "NO"（J）</strong> to alert the worker that you disagree with the statement.<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2> You let the store worker know that you disagreed with the statement. He therefore knows that the machine is not empty and that he does not need to refill the machine. </p2></big></h3><img src='image/store_worker_gumball.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<h3>Press SPACE to continue<h3>`
        }
    ]
};
timeline.push(tutorial_2);

const warning_quiz = {
    timeline: [
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2>Be Careful!</h3></big> <img src='image/13.jpg'; align='left'; style='height:200px'><h3><p2>One time, someone got this many gumballs and was told "You got all of the gumballs." <br>They pressed "NO" (J) telling the store worker that they disagreed with the statement. He thought the machine was not empty and that he did not need to refill it. He was fired.</br></p2></h3> <img src='image/store_worker_fired.jpg'; align='right'; style='height:200px'><br><br><br><br><br><br><br>`,
            response_ends_trial: true,
            prompt: `<h3>Press SPACE to continue to quiz<h3>`
        },
        {   type: jsPsychCategorizeHtml,
            choices: ['a', 'b', 'c', 'd'],
            stimulus: `<h3><big>Quiz</big></h3><br>When will the store worker be fired? <br> Please press the corresponding button on the keyboard.（For instance, if you choose a, then press "a" on your keyboard）<br><br>a. When the machines are empty.<br> b. When the machines jam.<br> c. When the machines explode.<br> d. When the machines don't make a sound.`,
            key_answer: 'a',
            force_correct_button_press: true,
            correct_text: '<p2><br><br>Correct! </p2>',
            incorrect_text: '<p2><br><br>False. Please choose again. </p2> ',
            text_answer: 'When the machines are empty.',
            feedback_duration: 1000
        }
        ]
    };

timeline.push(warning_quiz);

//practice trials
const practice_trials = {
    timeline: [
            {type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3>Let's start with four practice trials.</h3> Please make sure that your index fingers are on the J and F keys. <br><p2>Please remember, you have four seconds to inform the worker after you hear the statement.</p2></br></h3> <br><br><br><br><br><br>`,
            response_ends_trial: true,
            prompt: `<h3>Press SPACE to start the practice trials<h3>`},
            {
                type: jsPsychAudioKeyboardResponse,
                choices: [""],
                stimulus: 'audio/kaching.wav',
                response_ends_trial: false,
                trial_ends_after_audio: true,
                trial_duration: 2000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: ['f', 'j'],
                stimulus: 'audio/all.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/13.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 230)
                    evaluate_response(data);
                },
                data: jsPsych.timelineVariable('data')
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: ``,
                response_ends_trial: true,
                prompt: `<h3>Press SPACE to continue<h3>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: [""],
                stimulus: 'audio/kaching.wav',
                response_ends_trial: false,
                trial_ends_after_audio: true,
                trial_duration: 2000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: ['f', 'j'],
                stimulus: 'audio/none.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/13.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 200)
                    evaluate_response(data);
                },
                data: jsPsych.timelineVariable('data')
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: ``,
                response_ends_trial: true,
                prompt: `<h3>Press SPACE to continue<h3>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: [""],
                stimulus: 'audio/kaching.wav',
                response_ends_trial: false,
                trial_ends_after_audio: true,
                trial_duration: 2000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: ['f', 'j'],
                stimulus: 'audio/all.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 230)
                    evaluate_response(data);
                },
                data: jsPsych.timelineVariable('data')
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: ``,
                response_ends_trial: true,
                prompt: `<h3>Press SPACE to continue<h3>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: [""],
                stimulus: 'audio/kaching.wav',
                response_ends_trial: false,
                trial_ends_after_audio: true,
                trial_duration: 2000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`
            },
            {
                type: jsPsychAudioKeyboardResponse,
                choices: ['f', 'j'],
                stimulus: 'audio/none.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 230)
                    evaluate_response(data);
                },
                data: jsPsych.timelineVariable('data')
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: ``,
                response_ends_trial: true,
                prompt: `<h3>Press SPACE to continue<h3>`
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: `<h3>Great! Now we can start the real experiment.</h3> Please make sure that your index fingers are on the J and F keys. <br><p2>Remember: J means "agree" and F means "disagree"!</p2></br></h3> <br><br><br><br><br><br>`,
                response_ends_trial: true,
                prompt: `<h3>Press SPACE to start the experiment<h3>`}
    ]
};
timeline.push(practice_trials);

let English_array = create_tv_array(English_trial_objects);

let English_shuffled = shuffle_array(English_array);

let English_tv_array=set_trial_order(English_shuffled);

const English_trials = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/kaching.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/0.jpg'; style='height:400px'>`
        },
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['f', 'j'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 4000,
            prompt: jsPsych.timelineVariable('prompt'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index) / 230)
                evaluate_response(data);
            },
            data: jsPsych.timelineVariable('data')
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: ``,
            response_ends_trial: true,
            prompt: `<h3>Press SPACE to continue。<h3>`
        }
    ],
    timeline_variables: English_tv_array,
    randomize_order: true
};

timeline.push(English_trials);

const warning_quiz_switch = {
    timeline: [
        {   type: jsPsychCategorizeHtml,
            choices: ['a', 'b', 'c', 'd'],
            stimulus: `接下来你将会用中文来完成剩下的试验。 <br><br><h3><big>测验</big></h3><br>店员何时会被解雇? <br>请按下选项相应的字母键（如选择a, 则按a键）<br><br>a. 当机器爆炸时。 <br> b. 当机器空了的时候。 <br> c. 当机器没有声音时。 <br> d. 当机器卡住时。`,
            key_answer: 'b',
            force_correct_button_press: true,
            correct_text: '<p2><br><br>正确! </p2>',
            incorrect_text: '<p2><br><br>错误。请重新选择。</p2> ',
            text_answer: '当机器空了的时候。',
            feedback_duration: 1000
        }
    ]
};

timeline.push(warning_quiz_switch);


let Mandarin_array = create_tv_array(Mandarin_trial_objects);

let Mandarin_shuffled = shuffle_array(Mandarin_array);

let Mandarin_tv_array=set_trial_order(Mandarin_shuffled);

const Mandarin_trials = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/kaching.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/0.jpg'; style='height:400px'>`
        },
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['f', 'j'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            trial_duration: 4000,
            prompt: jsPsych.timelineVariable('prompt'),
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index) / 230)
                evaluate_response(data);
            },
            data: jsPsych.timelineVariable('data')
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: ``,
            response_ends_trial: true,
            prompt: `<h3>请按下空格键以继续。<h3>`
        }
    ],
    timeline_variables: Mandarin_tv_array,
    randomize_order: true
};

timeline.push(Mandarin_trials);

//BLP questionnaire + demographic questions
const questionnaire = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'html',
                prompt: `<p style="color: #000000">We would like to ask you to help us by answering the following questions concerning your language history, use,
                attitudes, and proficiency. <p2>This is not a test, so there are no right or wrong answers and your compensation will not be affected.</p2> Please answer every question and give your
                answers sincerely. </p>`
            },
            {
                type: 'text',
                prompt: 'Age',
                name: 'age',
                textbox_columns: 10
            },
            {
                type: 'drop-down',
                prompt: 'Gender',
                name: 'gender',
                options: ['Female', 'Male', 'Other', 'Prefer not to answer']
            },
            {
                type: 'text',
                prompt: "Current place of residence:",
                name: 'place of residence',
                textbox_columns: 50
            },
            {
                type: 'multi-choice',
                prompt: "Highest level of formal education",
                name: 'education',
                options: ['Less than high school', 'High school', 'Some college', ' College (B.A., B.S.)', 'Some graduate school', 'Masters', 'PhD/MD/JD', 'Other', 'Prefer not to answer']
            },
            {
                type: 'multi-select',
                prompt: "Have you ever had any of the following? Check all applicable.",
                name: 'disability',
                options: ['vision problem', 'hearing impairment', 'language disability', 'learning disability']
            },
            {
                type: 'text',
                prompt: 'If yes, please explain (including any corrections)',
                name: 'disability explanation',
                textbox_columns: 50
            },
        ],
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 230)
    }
};

timeline.push(questionnaire);

const languagehistory = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
                type: 'html',
                prompt: 'In this section, we would like you to answer some factual questions about your language history by marking the appropriate option.',
            },
            {
                type: 'likert',
                prompt: "At what age did you start learning English?",
                name: 'eng start age',
                required: true,
                likert_scale_values: [
                  { value: 'since birth' },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 10 },
                  { value: 11 },
                  { value: 12 },
                  { value: 13 },
                  { value: 14 },
                  { value: 15 },
                  { value: 16 },
                  { value: 17 },
                  { value: 18 },
                  { value: 19 },
                  { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "At what age did you start learning Mandarin?",
                name: 'Mandarin start age',
                required: true,
                likert_scale_values: [
                  { value: 'since birth' },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 10 },
                  { value: 11 },
                  { value: 12 },
                  { value: 13 },
                  { value: 14 },
                  { value: 15 },
                  { value: 16 },
                  { value: 17 },
                  { value: 18 },
                  { value: 19 },
                  { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "At what age did you start to feel comfortable using English?",
                name: 'eng ok age',
                required: true,
                likert_scale_values: [
                  { value: 'As early as I can remember' },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 10 },
                  { value: 11 },
                  { value: 12 },
                  { value: 13 },
                  { value: 14 },
                  { value: 15 },
                  { value: 16 },
                  { value: 17 },
                  { value: 18 },
                  { value: 19 },
                  { value: '20+' },
                  { value: 'Not yet' }
                ]
            },
            {
                type: 'likert',
                prompt: "At what age did you start to feel comfortable using Mandarin?",
                name: 'Mandarin ok age',
                required: true,
                likert_scale_values: [
                  { value: 'As early as I can remember' },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 10 },
                  { value: 11 },
                  { value: 12 },
                  { value: 13 },
                  { value: 14 },
                  { value: 15 },
                  { value: 16 },
                  { value: 17 },
                  { value: 18 },
                  { value: 19 },
                  { value: '20+' },
                  { value: 'Not yet' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years of classes (grammar, history, math, etc.) have you had in English (primary school through university)?",
                name: 'eng edu year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years of classes (grammar, history, math, etc.) have you had in Mandarin (primary school through university)?",
                name: 'Mandarin edu year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years have you spent in a country/region where English is spoken?",
                name: 'eng country year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years have you spent in a country/region where Mandarin is spoken?",
                name: 'Mandarin country year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years have you spent in a family where English is spoken?",
                name: 'English family year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years have you spent in a family where Mandarin is spoken?",
                name: 'Mandarin family year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            
            {
                type: 'likert',
                prompt: "How many years have you spent in a work environment where English is spoken?",
                name: 'English work year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
            {
                type: 'likert',
                prompt: "How many years have you spent in a work environment where Mandarin is spoken?",
                name: 'Mandarin work year',
                required: true,
                likert_scale_values: [
                    { value: 0 },
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                    { value: 11 },
                    { value: 12 },
                    { value: 13 },
                    { value: 14 },
                    { value: 15 },
                    { value: 16 },
                    { value: 17 },
                    { value: 18 },
                    { value: 19 },
                    { value: '20+' }
                ]
            },
        ],
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 230)
    },
};

timeline.push(languagehistory);

const languageuse = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
                type: 'html',
                prompt: 'In this section, we would like you to answer some questions about your language use by marking the appropriate option. <p2> Total use for all languages in a given question should equal 100%.</p2>',
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use English with friends?",
                name: 'eng friend time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use Mandarin with friends?",
                name: 'Mandarin friend time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use other languages with friends?",
                name: 'other language friend time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use English with family?",
                name: 'eng family time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use Mandarin with family?",
                name: 'Mandarin family time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use other languages with family?",
                name: 'other langauge family time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use English at school/work?",
                name: 'English school time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use Mandarin at school/work?",
                name: 'Mandarin school time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "In an average week, what percentage of the time do you use other languages at school/work?",
                name: 'other languages school time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "When you talk to yourself, how often do you talk to yourself in English?",
                name: 'Eng self talk time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "When you talk to yourself, how often do you talk to yourself in Mandarin?",
                name: 'Mandarin self talk time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "When you talk to yourself, how often do you talk to yourself in other languages?",
                name: 'other language self talk time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "When you count, how often do you count in English",
                name: 'eng count time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "When you count, how often do you count in Mandarin",
                name: 'Mandarin count time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
            {
                type: 'likert',
                prompt: "When you count, how often do you count in other languages",
                name: 'other language count time',
                required: true,
                likert_scale_values: [
                  { value: '0%' },
                  { value: '10%' },
                  { value: '20%' },
                  { value: '30%' },
                  { value: '40%' },
                  { value: '50%' },
                  { value: '60%' },
                  { value: '70%' },
                  { value: '80%' },
                  { value: '90%' },
                  { value: '100%' },
                ]
            },
        ],
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 230)
    },
};

timeline.push(languageuse);

const languageproficiency = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
                type: 'html',
                prompt: 'In this section, we would like you to rate your language proficiency by giving marks from 0 to 6.',
            },
            {
                type: 'likert',
                prompt: "How well do you speak English?",
                name: 'eng prof speak',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you speak Mandarin?",
                name: 'Mandarin prof speak',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you understand English?",
                name: 'eng prof understand',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you understand Mandarin?",
                name: 'Mandarin prof understand',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you read English?",
                name: 'eng prof read',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you read Mandarin?",
                name: 'Mandarin prof read',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you write English?",
                name: 'eng prof write',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "How well do you write Mandarin?",
                name: 'Mandarin prof write',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            
        ],
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 230)
    },
};

timeline.push(languageproficiency)

const languageattitudes = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
                type: 'html',
                prompt: 'In this section, we would like you to respond to statements about language attitudes by giving marks from 0-6. ',
            },
            {
                type: 'likert',
                prompt: "I feel like myself when I speak English.",
                name: 'eng attitude speak',
                required: true,
                likert_scale_min_label: 'disagree',
                likert_scale_max_label: 'agree',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "I feel like myself when I speak Mandarin.",
                name: 'Mandarin attitude speak',
                required: true,
                likert_scale_min_label: 'disagree',
                likert_scale_max_label: 'agree',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "I identify with an English-speakin culture.",
                name: 'eng cultural id',
                required: true,
                likert_scale_min_label: 'disagree',
                likert_scale_max_label: 'agree',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "I identify with an Mandarin-speaking culture.",
                name: 'Mandarin cultural id',
                required: true,
                likert_scale_min_label: 'disagree',
                likert_scale_max_label: 'agree',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "It is important to me to use (or eventually use) English like a native speaker. ",
                name: 'eng native',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "It is important to me to use (or eventually use) Mandarin like a native speaker. ",
                name: 'Mandarin native',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
            {
                type: 'likert',
                prompt: "I want others to think I am a native speaker of English.",
                name: 'Eng other eval',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },  
            {
                type: 'likert',
                prompt: "I want others to think I am a native speaker of Mandarin.",
                name: 'Mandarin other eval',
                required: true,
                likert_scale_min_label: 'not well at all',
                likert_scale_max_label: 'very well',
                likert_scale_values: [
                  { value: 0 },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                ]
            },
        ],
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 230)
    },
};

timeline.push(languageattitudes)

const feedback_thankyou = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
                type: 'text',
                prompt: '如果您有任何问题或是和我们分享的信息，请您在此处填写：',
                name: 'comments',
                textbox_columns: 150
            },
            {
                type: 'html',
                prompt: '<br><br><p>感谢您完成实验！</p> <p>请点击“完成”按钮提交您的回答并完成研究。</p>',
                },
        ]
    ],
    button_label_finish: '完成',
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 230)
    },
};

timeline.push(feedback_thankyou);

jsPsych.run(timeline);
