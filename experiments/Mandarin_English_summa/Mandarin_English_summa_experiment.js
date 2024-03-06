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
const preload_image_array = ['image/0.jpg', 'image/1.jpg', 'image/2.jpg', 'image/3.jpg', 'image/4.jpg', 'image/5.jpg', 'image/6.jpg', 'image/7.jpg', 'image/8.jpg', 'image/9.jpg', 'image/10.jpg', 'image/11.jpg', 'image/12.jpg', 'image/13.jpg'];
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
    stimulus: "<p>这个实验将会播放音频并录制实验者的一些语音回答。<BR><BR><strong><p2>您必须年满十八周岁才能参与此项实验，并且您需要会说中文、英文两种语言。</p2></strong> <br><br>请您在安静的地方用电脑完成这个实验，并确保您把<strong><p2>电脑音量调整至合适的程度</p2></strong>并且您<strong><p2>可以使用电脑麦克风</p2></strong>。</p> <br><br>请按空格键继续。",
    choices: [" "]
};
timeline.push(audio_microphone_requirement);

//instructions
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<p>这个实验将会播放音频。<BR><BR><strong><p2>您必须年满十八周岁才能参与此项实验，并且您需要会说中文、英文两种语言。</p2></strong> <br><br>请您在安静的地方用电脑完成这个实验，并确保您把<strong><p2>电脑音量调整至合适的程度</p2></strong>。 <br><br>请按空格键继续。</p>",
    choices: [" "]
};
timeline.push(instructions);

//display cover story
const cover_story = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 
            "<h3><strong><big><p2>背景故事</p2></big></strong></h3> <br> <img src='image/0.jpg'; alt='gumball_machine'; align='right'; style='height:200px'> <p2 align='left'><big> 你正在一家糖果店里测试一排口香糖机。这些是特殊的口香糖机，它们会语音播报你得到了多少颗口香糖。然而，这个报告有时会出错。</big></p2> <br><br> <img src='image/store_worker_1.jpg' alt='store_worker_sitting' align='left' style='height:200px'> <br><br> <p2 align='right'> <big> 店员告诉你，他的老板曾经威胁他，如果口香糖机空了，就解雇他，但他真的需要这份工作。他不能从收银台看到这些机器，但通常可以通过机器的播报来判断它们的装满程度。</big> </p2> <br><br><br> <img src='image/store_worker_2.jpg' alt='store_worker_standing' align='center' style='height:200px'> <p2 align='left'> <big> 他请你告诉他声明是正确还是错误，这样他就会知道机器是否为空，是否需要补充口香糖。</big> </p2> <br><br>", 
    choices: [" "],
    prompt: "<h3>请按下空格键以继续实验。<h3>"
};
timeline.push(cover_story);

//keyboard instruction
const response_keys = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
    '<p><font size="5"> 请将你的右手食指放在 <strong>J</strong> 键上，左手食指放在 <strong>F</strong> 键上。<br><br><img src="image/keypress.jpg"alt="keyboard" align="center" style="height:400px"> <br><br> 如果你同意口香糖机的播报，请按 <strong>F</strong> 键；如果你不同意，请按 <strong>J</strong> 键。<br>使用你的大拇指按下 <strong>空格键</strong> ，不要移动你的食指。<br> <strong><p2>请记住，听到播报后，你有4秒钟通知店员。</p2></strong> <br><br></p></font> ', 
    choices: [" "],
    prompt: "<h3>请按下空格键以继续实验。<h3>"
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
            stimulus: 'audio/suoyou.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/13.jpg'; style='height:400px'>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: ['f'],
            stimulus: `<img src='image/13.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<br><h3>按下 <strong> "是"（F）</strong> 键以通知店员您同意该播报。<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2> 你告诉店员你同意这个播报。因此，他知道口香糖机是空的，他需要重新装满机器。 </p2></big></h3><img src='image/store_worker_gumball.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<h3>请按下空格键以观看下一个教程。<h3>`
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
            stimulus: 'audio/meiyou.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 2000,
            prompt: `<img src='image/10.jpg'; style='height:400px'>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: ['j'],
            stimulus: `<img src='image/10.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<br><h3>按下 <strong> "否"（J）</strong> 键以通知店员您不同意该播报。<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2> 你告诉店员你不同意这个声明。因此，他知道口香糖机不是空的，不需要重新装满机器。 </p2></big></h3><img src='image/store_worker_gumball.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<h3>请按下空格键以继续实验。<h3>`
        }
    ]
};
timeline.push(tutorial_2);

const warning_quiz = {
    timeline: [
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2>注意! </h3></big> <img src='image/13.jpg'; align='left'; style='height:200px'><h3><p2>有一次，有人拿了这么多口香糖，并被告知“你拿到了所有的口香糖。“ <br>可他按下了“否”(J)键，告诉店员他不同意这个播报。店员以为机器不是空的，不需要重新装满。结果他被解雇了。</br></p2></h3> <img src='image/store_worker_fired.jpg'; align='right'; style='height:200px'><br><br><br><br><br><br><br>`,
            response_ends_trial: true,
            prompt: `<h3>请按下空格键以继续实验。<h3>`
        },
        {   type: jsPsychCategorizeHtml,
            choices: ['a', 'b', 'c', 'd'],
            stimulus: `<h3><big>测验</big></h3><br>店员何时会被解雇? <br> 请按下选项相应的字母键（如选择a, 则按a键）<br><br>a. 当机器空了的时候。<br> b. 当机器卡住时。 <br> c. 当机器爆炸时。<br> d. 当机器没有声音时。`,
            key_answer: 'a',
            force_correct_button_press: true,
            correct_text: '<p2><br><br>正确! </p2>',
            incorrect_text: '<p2><br><br>错误。请重新选择。</p2> ',
            text_answer: '当机器空了的时候。',
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
            stimulus: `<h3>我们现在先从四个练习实验开始。</h3> 请确保你的食指放在 J 和 F 键上。 <br><p2>请记住，在你听到播报后，你有4秒钟通知店员。</p2></br></h3> <br><br><br><br><br><br>`,
            response_ends_trial: true,
            prompt: `<h3>请按下空格键以开始练习。<h3>`},
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
                stimulus: 'audio/suoyou.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/13.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 243)
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
                stimulus: 'audio/meiyou.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/13.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 243)
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
                stimulus: 'audio/suoyou.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 243)
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
                stimulus: 'audio/meiyou.wav',
                response_allowed_while_playing: true,
                trial_duration: 4000,
                prompt: `<img src='image/0.jpg'; style='height:400px'>`,
                on_finish: function(data) {
                    jsPsych.setProgressBar((data.trial_index) / 243)
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
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: `<h3>顺利完成！现在我们可以开始真正的实验了。</h3> 请确保你的食指放在 J 和 F 键上。 <br><p2>请记住，F 表示“同意”，J 表示“不同意”！。</p2></br></h3> <br><br><br><br><br><br>`,
                response_ends_trial: true,
                prompt: `<h3>请按下空格键以开始实验。<h3>`}
    ]
};
timeline.push(practice_trials);


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
                jsPsych.setProgressBar((data.trial_index) / 243)
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

const warning_quiz_switch = {
    timeline: [
        {   type: jsPsychCategorizeHtml,
            choices: ['a', 'b', 'c', 'd'],
            stimulus: `You will now complete the rest of the trials in English. <br><br><h3><big>Quiz</big></h3><br>When will the store worker be fired? <br> Please press the corresponding button on the keyboard.（For instance, if you choose a, then press "a" on your keyboard）<br><br>a. When the machines explode. <br> b. When the machines are empty. <br> c. When the machines don't make a sound. <br> d. When the machines jam.`,
            key_answer: 'b',
            force_correct_button_press: true,
            correct_text: '<p2><br><br>Correct! </p2>',
            incorrect_text: '<p2><br><br>False. Please choose again.</p2> ',
            text_answer: 'When the machines are empty.',
            feedback_duration: 1000
        }
    ]
};

timeline.push(warning_quiz_switch);

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
                jsPsych.setProgressBar((data.trial_index) / 243)
                evaluate_response(data);
            },
            data: jsPsych.timelineVariable('data')
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: ``,
            response_ends_trial: true,
            prompt: `<h3>Please press SPACE to continue。<h3>`
        }
    ],
    timeline_variables: English_tv_array,
    randomize_order: true
};

timeline.push(English_trials);

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
        jsPsych.setProgressBar((data.trial_index) / 243)
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
        jsPsych.setProgressBar((data.trial_index) / 243)
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
        jsPsych.setProgressBar((data.trial_index) / 243)
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
        jsPsych.setProgressBar((data.trial_index) / 243)
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
        jsPsych.setProgressBar((data.trial_index) / 243)
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
        jsPsych.setProgressBar((data.trial_index) / 243)
    },
};

timeline.push(feedback_thankyou);

jsPsych.run(timeline);
