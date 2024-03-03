//initialize jspsych & show data when done
const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: "实验完成进度条",
    on_finish: function(data) {
        proliferate.submit({trials: data.values()});
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

const microphone = {
    type: jsPsychInitializeMicrophone,
    device_select_message: "<p>请选择您想要使用的麦克风</p>",
    button_label: "<p>使用这个麦克风。</p>"
}

timeline.push(microphone);

//instructions
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "在接下来的实验中，你将听到一些句子。你的任务是根据你是否同意这些句子来回答“是”或“否”。这个实验应该需要大约30分钟的时间。<br><br>当你准备好开始时，请按下空格键。",
    choices: [" "]
};
timeline.push(instructions);

//display cover story
const cover_story = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 
            "<h3><strong><big><p2>Context</p2></big></strong></h3> <br> <img src='image/0.jpg'; alt='gumball_machine'; align='right'; style='height:200px'> <p2 align='left'><big> You are at a candy store and are testing a row of gumball machines. These are special gumball machines that say how many gumballs you got. However, this report is sometimes faulty. </big></p2> <br><br> <img src='image/store_worker_1.jpg' alt='store_worker_sitting' align='left' style='height:200px'> <br><br> <p2 align='right'> <big> The store worker tells you that his boss has threatened to fire him if the gumball machines are left empty, and he really needs this job. He cannot see the machines from the register, but he can normally tell how full they are by the machines' statements.</big> </p2> <br><br><br> <img src='image/store_worker_2.jpg' alt='store_worker_standing' align='center' style='height:200px'> <p2 align='left'> <big> He asks you to tell him if the statement is right or wrong, so that he will know if a machine is empty and needs to be refilled. </big> </p2> <br><br>", 
    choices: [" "],
    prompt: "<h3>Please press SPACE to continue <h3>"
};
timeline.push(cover_story);

//keyboard instruction
const response_keys = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
    '<p><font size="5"> Place your right index finger on the <strong>J</strong> key and left index finger on the <strong>F</strong> key. <br><br><img src="image/keypress.jpg"alt="keyboard" align="center" style="height:400px"> <br><br> If you agree with the statement, press <strong>F</strong>; if you disagree with the statement, press <strong>J</strong>. <br>Use your thumb to press <strong>SPACE</strong> and do not move your index fingers. <br> <strong><p2>Please remember, you have four seconds to inform the worker after you hear the statement. </p2></strong> <br><br></p></font> ', 
    choices: [" "],
    prompt: "<h3>Please press SPACE to continue<h3>"
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
            prompt: `<br><h3>Press the <strong>"YES"(F)</strong> key to alert the worker that you agree with the statement.<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2> You let the store worker know that you agree with the statement. He therefore knows that the machine is empty and that he needs to refill the machine. </p2></big></h3><img src='image/store_worker_gumball.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<h3>Please press SPACE to continue to next demo <h3>`
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
            prompt: `<br><h3>Press the <strong> "NO"（J）</strong> to alert the worker that you disagree with the statement.<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<h3><big><p2> You let the store worker know that you disagreed with the statement. He therefore knows that the machine is not empty and that he does not need to refill the machine. </p2></big></h3><img src='image/store_worker_gumball.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<h3>Please press SPACE to continue<h3>`
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
            prompt: `<h3>Please press SPACE to continue to quiz<h3>`
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
            prompt: `<h3>Please press SPACE to start the practice trials<h3>`},
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
                prompt: `<h3>Please press SPACE to continue<h3>`
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
                prompt: `<h3>Please press SPACE to continue<h3>`
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
                prompt: `<h3>Please press SPACE to continue<h3>`
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
                prompt: `<h3>Please press SPACE to continue<h3>`
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                choices: [' '],
                stimulus: `<h3>Great! Now we can start the real experiment.</h3> Please make sure that your index fingers are on the J and F keys. <br><p2>Remember: J means "agree" and F means "disagree"!</p2></br></h3> <br><br><br><br><br><br>`,
                response_ends_trial: true,
                prompt: `<h3>Please press SPACE to start the experiment<h3>`}
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

const warning_quiz_switch = {
    timeline: [
        {   type: jsPsychCategorizeHtml,
            choices: ['a', 'b', 'c', 'd'],
            stimulus: `接下来你将会用中文来完成剩下的试验。 <br><br><h3><big>测验</big></h3><br>店员何时会被解雇? <br>请按下选项相应的字母键（如选择a, 则按a键）<br><br>a. 当机器爆炸时。 <br> b. 当机器空了的时候。 <br> c. 当机器没有声音时。 <br> d. 当机器卡住时。`,
            key_answer: 'b',
            force_correct_button_press: true,
            correct_text: '<p2><br><br>正确。 </p2>',
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

const Mandarin_Mint = {
    timeline: [
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `接下来您将看到8行图片。从<strong>左上角</strong>开始，请试着用中文说出每个东西的名称，并且请尽可能在不犯错的情况下快速回答。如果有任何您不知道或不记得的名称，请说“不知道”或“跳过”，然后继续说剩下图片的名称。如果在跳过一些图片之后想起了之前图片的正确名称，可以随时重新说那张图片正确名称（例如：之前的图是...）。请在<strong>2分钟</strong>内命名尽可能多的图片。`,
            response_ends_trial: true,
            prompt: `<br><h3>请按空格键继续<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<p2>请注意：由于音频较大，当您完成这项任务后，会出现一个空白页一到两分钟来上传数据，请您完成这项任务后不要关闭网页，当音频上传完毕时，实验会自动继续进行。</p2>`,
            response_ends_trial: true,
            prompt: `<br><h3>按下空格开始实验<h3>`,
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<img src='image/mint_prep_page.jpg'; style='height:400px'> <br>请从左到右依次说每一行的图片名称。这项任务将在两分钟后自动结束，<p2>并紧接着会有一个空白的页面持续一到两分钟</p2>。`,
            response_ends_trial: true,
            prompt: `<br><h3>按下空格开始实验<h3>`,
        },
        {
            type: jsPsychHtmlAudioResponse,
            stimulus: ` <img src='image/mint_sprint.jpg'; style='height:600px'>`,
            recording_duration: 180000,
            show_done_button: false,
            stimulus_duration: 120000,
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index) / 243)
            },
        }
    ]
}

timeline.push(Mandarin_Mint);

const English_Mint = {
    timeline: [
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `Now you will complete the same task in English. <br>You will be presented with 8 rows of pictures. Starting at the <strong>top left</strong>, try to name each picture in ENGLISH from first to last going as quickly as you can without making errors. If you come across one you don’t know-or can’t remember - just say “don’t know” and keep going. If the name comes to mind later, you can go back and say the name (ex: the previous item is...). You will have <strong>2 minutes</strong> to name as many pictures as you can. 
            `,
            response_ends_trial: true,
            prompt: `<br><h3>Please press SPACE to continue.<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<p2>Note：Due to the large size of the audio recording，there will be a blank page that lasts for a minute for two to upload the data once you finish the task，please DO NOT close the tab. Once the data is uploaded successfully, the experiment will resume automatically.</p2>`,
            response_ends_trial: true,
            prompt: `<br><h3>Please press SPACE to continue.<h3>`,
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<img src='image/mint_prep_page_english.jpg'; style='height:400px'> <br>Please name each row of pictures from left to right。This task will end in two minutes automatically，<p2>and there will be a blank page that lasts for a minute or two.</p2>。`,
            response_ends_trial: true,
            prompt: `<br><h3>Please press SPACE to start the trial.<h3>`,
        },
        {
            type: jsPsychHtmlAudioResponse,
            stimulus: ` <img src='image/mint_sprint.jpg'; style='height:600px'>`,
            recording_duration: 180000,
            show_done_button: false,
            stimulus_duration: 120000,
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index) / 243)
            },
        }
    ]
}

timeline.push(English_Mint);

//LEAPQ questionnaire + demographic questions
const questionnaire = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'html',
                prompt: `<p style="color: #000000">请回答以下的问题。</p>`
            },
            {
                type: 'text',
                prompt: '您的年龄:',
                name: 'age',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '出生年份:',
                name: 'birthyear',
                textbox_columns: 10
            },
            {
                type: 'drop-down',
                prompt: '您的性别是什么？',
                name: 'gender',
                options: ['女', '男', '其他', '不想回答']
            },
            {
                type: 'multi-choice',
                prompt: "您的公民身份是什么？",
                name: 'citizenship',
                options: ['中华人民共和国', '美国', '其他', '不想回答']
            },
            {
                type: 'multi-choice',
                prompt: "您的出生地在哪里？",
                name: 'birthplace',
                options: ['中华人民共和国', '美国', '其他', '不想回答']
            },
            {
                type: 'text',
                prompt: '您受过多少年的正规教育?',
                name: 'education',
                textbox_columns: 10
            },
            {
                type: 'multi-choice',
                prompt: "您的最高学历是什么？",
                name: 'education',
                options: ['低于高中', '高中', '职高', '大专', '大学', '研究生未毕业', '硕士', '哲学博士/医学博士/法学博士', '其他', '不想回答']
            },
            {
                type: 'text',
                prompt: '如您已经移民至美国，请填写移民日期。如若移民过其它国家，请在下栏填写移民日期和该国名称。',
                name: 'immigration',
                textbox_columns: 100
            },
            {
                type: 'multi-select',
                prompt: "您是否有过下列问题？请选择所有相关栏目。",
                name: 'birthplace',
                options: ['视力障碍', '听力障碍', '语言障碍', '学习障碍', '无障碍']
            },
            {
                type: 'text',
                prompt: '如您有过某项问题，请说明（包括校正）',
                name: 'other_comments',
                textbox_columns: 50
            },
        ],
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243)
    },
    button_label_finish: '继续'
};

timeline.push(questionnaire);

const leapQ = {
    timeline:[
        {
            type:jsPsychSurvey,
            pages: [
                [
                {type: 'html', prompt: "<p> 请按<p2>主次顺序</p2>列出你所学过或用过的语言 </p> <p>请在以下列出最少 2 种语言、最多 5 种语言，并<b>按熟练程度排列</b>，也就是说，语言 1 是最熟练的语言，语言 2 是第二熟练的语言。</p>"},
                {type: 'text', prompt: '语言1:', name: 'lang1_dom', required: true},
                {type: 'text', prompt: '语言2:', name: 'lang2_dom', required: true},
                {type: 'text', prompt: '语言3:', name: 'lang3_dom'},
                {type: 'text', prompt: '语言4:', name: 'lang4_dom'},
                {type: 'text', prompt: '语言5:', name: 'lang5_dom'},
                ]
            ]
        },
        {
            type:jsPsychSurvey,
            pages: [
                [
                {type: 'html', prompt: "<p> 请按<p2>习得顺序</p2>列出你所学过或用过的语言（母语在先） </p> <p>请在以下列出最少 2 种语言、最多 5 种语言，并<b>按习得顺序排列</b>，也就是说，语言 1 是母语，语言 2 是第二个学会的语言。</p>"},
                {type: 'text', prompt: '语言1:', name: 'lang1_time', required: true},
                {type: 'text', prompt: '语言2:', name: 'lang2_time', required: true},
                {type: 'text', prompt: '语言3:', name: 'lang3_time'},
                {type: 'text', prompt: '语言4:', name: 'lang4_time'},
                {type: 'text', prompt: '语言5:', name: 'lang5_time'},
                ]
            ]
        },
        {
            type:jsPsychSurvey,
            pages: [
                [
                {type: 'html', prompt: "<p> 请列出目前你所接触每种语言时间的百分比<p2>（各项百分比之和应为100%） </p2></p>"},
                {type: 'text', prompt: '语言1:', name: 'lang1_%', required: true},
                {type: 'text', prompt: '语言2:', name: 'lang2_%', required: true},
                {type: 'text', prompt: '语言3:', name: 'lang3_%'},
                {type: 'text', prompt: '语言4:', name: 'lang4_%'},
                {type: 'text', prompt: '语言5:', name: 'lang5_%'},
                ]
            ]
        },
        {
            type:jsPsychSurvey,
            pages: [
                [
                {type: 'html', prompt: "<p> 如果有你所学过或用过的几种语言的阅读材料供你选择，你选择每种语言的比例会是怎样的？假定阅读材料的原文是另一种你所不熟悉的语言<p2>（各项百分比之和应为100%） </p2></p>"},
                {type: 'text', prompt: '语言1:', name: 'lang1_read', required: true},
                {type: 'text', prompt: '语言2:', name: 'lang2_read', required: true},
                {type: 'text', prompt: '语言3:', name: 'lang3_read'},
                {type: 'text', prompt: '语言4:', name: 'lang4_read'},
                {type: 'text', prompt: '语言5:', name: 'lang5_read'},
                ]
            ]
        },
        {
            type:jsPsychSurvey,
            pages: [
                [
                {type: 'html', prompt: "<p> 如果当你与一个语言能力和语言水平与你的语言能力和语言水平完全匹配的人进行口头交流的时候，让你选择某一种语言，你使用每种你所学过或用过的语言的百分比会是怎样的？请给出全部时间的百分比<p2>（各项百分比之和应为100%） </p2></p> </p2></p>"},
                {type: 'text', prompt: '语言1:', name: 'lang1_oral', required: true},
                {type: 'text', prompt: '语言2:', name: 'lang2_oral', required: true},
                {type: 'text', prompt: '语言3:', name: 'lang3_oral'},
                {type: 'text', prompt: '语言4:', name: 'lang4_oral'},
                {type: 'text', prompt: '语言5:', name: 'lang5_oral'},
                ]
            ]
        },
    ],
    button_label_finish: '继续',
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243)
    },
};

timeline.push(leapQ);

const leapQlikert = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
                type: 'html',
                prompt: '<p2>请列出你所认同的各种文化的名称（至少两个文化）。例如：北美文化，中国文化，正统犹太教文化，等等。<br>在0-10的数值范围之内，请标出你对每一种文化认同感。（0为不认同，1为非常低程度的认同，5为中等认同，10为完全认同。）</p2>',
            },
            {
                type: 'text',
                prompt: '此栏列文化',
                name: 'cultural identification 1',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'likert',
                prompt: "在0-10的数值范围之内，请标出你对这一种文化的认同感。",
                name: 'cultural identification likert 1',
                required: true,
                likert_scale_min_label: '不认同',
                likert_scale_max_label: '完全认同',
                likert_scale_values: [
                  { value: '无' },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                  { value: 6 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 10 },
                ]
            },
            {
                type: 'text',
                prompt: '此栏列文化',
                name: 'cultural identification 2',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'likert',
                prompt: "在0-10的数值范围之内，请标出你对这一种文化的认同感。",
                name: 'cultural identification likert 2',
                required: true,
                likert_scale_min_label: '不认同',
                likert_scale_max_label: '完全认同',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'text',
                prompt: '此栏列文化',
                name: 'cultural identification 3',
                textbox_columns: 10,
                required: false
            },
            {
                type: 'likert',
                prompt: "在0-10的数值范围之内，请标出你对这一种文化的认同感。",
                name: 'cultural identification likert 3',
                likert_scale_min_label: '不认同',
                likert_scale_max_label: '完全认同',
                likert_scale_values: [
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
                ],
                required: false
            },
            {
                type: 'text',
                prompt: '此栏列文化',
                name: 'cultural identification 4',
                textbox_columns: 10,
                required: false
            },
            {
                type: 'likert',
                prompt: "在0-10的数值范围之内，请标出你对这一种文化的认同感。",
                name: 'cultural identification likert 4',
                likert_scale_min_label: '不认同',
                likert_scale_max_label: '完全认同',
                likert_scale_values: [
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
                ],
                required: false
            },
            {
                type: 'text',
                prompt: '此栏列文化',
                name: 'cultural identification 5',
                textbox_columns: 10,
                required: false
            },
            {
                type: 'likert',
                prompt: "在0-10的数值范围之内，请标出你对这一种文化的认同感。",
                name: 'cultural identification likert 5',
                likert_scale_min_label: '不认同',
                likert_scale_max_label: '完全认同',
                likert_scale_values: [
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
                ],
                required: false
            }
        ],
    ],
    button_label_finish:'继续',
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243)
    },
};

timeline.push(leapQlikert);

const language_experience_1 = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
            type: 'html',
            prompt: '<br><br><p2>接下来将会有三份相同的问卷就您的母语、第二语言和第三语言（如有的话）水平和经历进行了解，请至少回答有关您母语和第二语言的问题。</p2>',
            },
            {
                type: 'text',
                prompt: '这是我的母语：',
                name: 'native_language',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你开始说这门语言时候的年龄：',
                name: 'native_lang_speak_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你说得流畅时候的年龄：',
                name: 'native_lang_prof_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你开始用这门语言阅读时候的年龄：',
                name: 'native_lang_read_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你读得流畅时候的年龄：',
                name: 'native_lang_readprof_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出你在每种语言环境中所度过的时间（尽可能精确到多少年多少月）：</p2>',
            },
            {
                type: 'text',
                prompt: '使用该语言的国家：',
                name: 'native_lang_country',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'text',
                prompt: '使用该语言的家人：',
                name: 'native_lang_family',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'text',
                prompt: '使用该语言的学校或工作单位：',
                name: 'native_lang_work',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请标出你口语能力、理解能力和阅读能力方面的语言水平：</p2>',
            },
            {
                type: 'likert',
                prompt: '说',
                name: 'native_lang_speak_ability',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: '理解口语',
                name: 'native_lang_oral_comprehension',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: '阅读',
                name: 'native_lang_read_ability',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>在1-10的数值范围之内，下列诸因素对你学习的影响程度为(0为没影响，1为最小影响，5为一般影响，10为最重要影响。)</p2>',
            },
            {
                type: 'likert',
                prompt: "与朋友互动",
                name: 'native_lang_friend_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "与家庭互动",
                name: 'native_lang_family_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "阅读",
                name: 'native_lang_read_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "语言工具/自学",
                name: 'native_lang_selflearn_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "看电视",
                name: 'native_lang_tv_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "听收音机",
                name: 'native_lang_radio_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "上网",
                name: 'native_lang_internet_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>在1-10的数值范围之内，请标出你目前接触下列语境的程度：(0为从来没有，1为几乎没有，5为一半时间，10为总是如此。)</p2>',
            },
            {
                type: 'likert',
                prompt: "与朋友互动",
                name: 'native_lang_friend_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "与家庭互动",
                name: 'native_lang_family_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "阅读",
                name: 'native_lang_read_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "语言工具/自学",
                name: 'native_lang_selflearn_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "看电视",
                name: 'native_lang_tv_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "听收音机",
                name: 'native_lang_radio_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "上网",
                name: 'native_lang_internet_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>你感觉自己讲这门语言口音有多重？</p2>',
            },
            {
                type: 'likert',
                prompt: '请做选择',
                name: 'native_lang_accent_self_eval',
                likert_scale_values: [
                  { value: '没有'},
                  { value: '几乎没有' },
                  { value: '很轻' },
                  { value: '轻' },
                  { value: '有一些' },
                  { value: '中等' },
                  { value: '相当程度' },
                  { value: '重' },
                  { value: '很重' },
                  { value: '极重' },
                  { value: '完全' },
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出他人根据你的口音判断这门语言不是你母语的频率：(0为从来没有，1为几乎没有，5为一半时间，10为总是如此。)</p2>',
            },
            {
                type: 'likert',
                prompt: '在1-10的数值范围之内标出频率',
                name: 'native_lang_accent_other_eval',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
        ]
    ],
    button_label_finish: '继续',
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243)
    }
};

timeline.push(language_experience_1);

const language_experience_2 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'text',
                prompt: '这是我的第二语言：',
                name: 'second_language',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你开始说这门语言时候的年龄：',
                name: 'second_lang_speak_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你说得流畅时候的年龄：',
                name: 'second_lang_read_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你开始用这门语言阅读时候的年龄：',
                name: 'second_lang_read_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你读得流畅时候的年龄：',
                name: 'second_lang_readprof_age',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出你在每种语言环境中所度过的时间（尽可能精确到多少年多少月）：</p2>',
            },
            {
                type: 'text',
                prompt: '使用该语言的国家：',
                name: 'second_lang_country',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'text',
                prompt: '使用该语言的家人：',
                name: 'second_lang_family',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'text',
                prompt: '使用该语言的学校或工作单位：',
                name: 'second_lang_work',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请标出你口语能力、理解能力和阅读能力方面的语言水平：</p2>',
            },
            {
                type: 'likert',
                prompt: '说',
                name: 'second_lang_speak_ability',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: '理解口语',
                name: 'second_lang_oral_comprehension',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: '阅读',
                name: 'second_lang_read_ability',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>在1-10的数值范围之内，下列诸因素对你学习的影响程度为(0为没影响，1为最小影响，5为一般影响，10为最重要影响。)</p2>',
            },
            {
                type: 'likert',
                prompt: "与朋友互动",
                name: 'second_lang_friend_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "与家庭互动",
                name: 'second_lang_family_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "阅读",
                name: 'second_lang_read_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "语言工具/自学",
                name: 'second_lang_selflearn_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "看电视",
                name: 'second_lang_tv_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "听收音机",
                name: 'second_lang_radio_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "上网",
                name: 'second_lang_internet_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>在1-10的数值范围之内，请标出你目前接触下列语境的程度：(0为从来没有，1为几乎没有，5为一半时间，10为总是如此。)</p2>',
            },
            {
                type: 'likert',
                prompt: "与朋友互动",
                name: 'second_lang_friend_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "与家庭互动",
                name: 'second_lang_family_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "阅读",
                name: 'second_lang_read_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "语言工具/自学",
                name: 'second_lang_selflearn_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "看电视",
                name: 'second_lang_tv_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "听收音机",
                name: 'second_lang_radio_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'likert',
                prompt: "上网",
                name: 'second_lang_internet_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>你感觉自己讲这门语言口音有多重？</p2>',
            },
            {
                type: 'likert',
                prompt: '请做选择',
                name: 'second_lang_accent_self_eval',
                likert_scale_values: [
                  { value: '没有'},
                  { value: '几乎没有' },
                  { value: '很轻' },
                  { value: '轻' },
                  { value: '有一些' },
                  { value: '中等' },
                  { value: '相当程度' },
                  { value: '重' },
                  { value: '很重' },
                  { value: '极重' },
                  { value: '完全' },
                ],
                required: true
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出他人根据你的口音判断这门语言不是你母语的频率：(0为从来没有，1为几乎没有，5为一半时间，10为总是如此。)</p2>',
            },
            {
                type: 'likert',
                prompt: '在1-10的数值范围之内标出频率',
                name: 'second_lang_accent_other_eval',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ],
                required: true
            },
        ]
    ],
    button_label_finish: '继续',
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243)
    },
};

timeline.push(language_experience_2);

const language_experience_3 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'text',
                prompt: '这是我的第三语言：（如果没有请直接前往下一个页面）',
                name: 'third_language',
                textbox_columns: 10,
            },
            {
                type: 'text',
                prompt: '当你开始说这门语言时候的年龄：',
                name: 'third_lang_speak_age',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你说得流畅时候的年龄：',
                name: 'third_lang_prof_age',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你开始用这门语言阅读时候的年龄：',
                name: 'third_lang_read_age',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你读得流畅时候的年龄：',
                name: 'third_lang_readprof_age',
                textbox_columns: 10
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出你在每种语言环境中所度过的时间（尽可能精确到多少年多少月）：</p2>',
            },
            {
                type: 'text',
                prompt: '使用该语言的国家：',
                name: 'third_lang_country',
                textbox_columns: 15
            },
            {
                type: 'text',
                prompt: '使用该语言的家人：',
                name: 'third_lang_family',
                textbox_columns: 15
            },
            {
                type: 'text',
                prompt: '使用该语言的学校或工作单位：',
                name: 'third_lang_work',
                textbox_columns: 15
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请标出你口语能力、理解能力和阅读能力方面的语言水平：</p2>',
            },
            {
                type: 'likert',
                prompt: '说',
                name: 'third_lang_speak_ability',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ]
            },
            {
                type: 'likert',
                prompt: '理解口语',
                name: 'third_lang_oral_comprehension',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ]
            },
            {
                type: 'likert',
                prompt: '阅读',
                name: 'third_lang_read_ability',
                likert_scale_values: [
                  { value: '无'},
                  { value: '很差' },
                  { value: '差' },
                  { value: '勉强' },
                  { value: '尚可' },
                  { value: '一般' },
                  { value: '较好' },
                  { value: '良好' },
                  { value: '很好' },
                  { value: '优秀' },
                  { value: '精通' },
                ]
            },
            {
                type: 'html',
                prompt: '<br><br><p2>在1-10的数值范围之内，下列诸因素对你学习的影响程度为(0为没影响，1为最小影响，5为一般影响，10为最重要影响。)</p2>',
            },
            {
                type: 'likert',
                prompt: "与朋友互动",
                name: 'third_lang_friend_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "与家庭互动",
                name: 'third_lang_family_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "阅读",
                name: 'third_lang_read_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "语言工具/自学",
                name: 'third_lang_selflearn_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "看电视",
                name: 'third_lang_tv_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "听收音机",
                name: 'third_lang_radio_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "上网",
                name: 'third_lang_internet_impact',
                likert_scale_min_label: '没影响',
                likert_scale_max_label: '最重要影响',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'html',
                prompt: '<br><br><p2>在1-10的数值范围之内，请标出你目前接触下列语境的程度：(0为从来没有，1为几乎没有，5为一半时间，10为总是如此。)</p2>',
            },
            {
                type: 'likert',
                prompt: "与朋友互动",
                name: 'third_lang_friend_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "与家庭互动",
                name: 'third_lang_family_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "阅读",
                name: 'third_lang_read_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "语言工具/自学",
                name: 'third_lang_selflearn_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "看电视",
                name: 'third_lang_tv_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "听收音机",
                name: 'third_lang_radio_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'likert',
                prompt: "上网",
                name: 'third_lang_internet_time',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
            {
                type: 'html',
                prompt: '<br><br><p2>你感觉自己讲这门语言口音有多重？</p2>',
            },
            {
                type: 'likert',
                prompt: '请做选择',
                name: 'third_lang_accent_self_eval',
                likert_scale_values: [
                  { value: '没有'},
                  { value: '几乎没有' },
                  { value: '很轻' },
                  { value: '轻' },
                  { value: '有一些' },
                  { value: '中等' },
                  { value: '相当程度' },
                  { value: '重' },
                  { value: '很重' },
                  { value: '极重' },
                  { value: '完全' },
                ]
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出他人根据你的口音判断这门语言不是你母语的频率：(0为从来没有，1为几乎没有，5为一半时间，10为总是如此。)</p2>',
            },
            {
                type: 'likert',
                prompt: '在1-10的数值范围之内标出频率',
                name: 'third_lang_accent_other_eval',
                likert_scale_min_label: '从来没有',
                likert_scale_max_label: '总是如此',
                likert_scale_values: [
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
                ]
            },
        ]
    ],
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243);
    },
    button_label_finish: '继续',
};

timeline.push(language_experience_3);

//payment information
const payment_info = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
            type: 'html',
            prompt: '<br><br>这个页面会问您要支付信息，以让研究人员转您报酬。如果您没有Prolific账户，请您填写自己的信息。如果您通过Prolific参与实验，您将通过Prolific平台收到报酬。',
            },
            {
                type: 'drop-down',
                prompt: '请问您接受哪种付款方式：',
                name: 'payment_method',
                options: ['微信', '支付宝', 'venmo', 'zelle']
            },
            {
                type: 'text',
                prompt: '请您填写自己的姓名（仅作转账使用）',
                name: 'payment_name',
                textbox_columns: 50
            },
            {
                type: 'text',
                prompt: '请您提供您的收款账号（仅作转账使用）。研究人员将通过此账号来给您您参加此实验的报酬。',
                name: 'payment_number',
                textbox_columns: 50
            },
            {
                type: 'text',
                prompt: '请您提供您的电子邮箱email地址。如果您没有邮箱地址，请您填写自己的微信账号。（仅作转账使用）',
                name: 'payment_email/wechat',
                textbox_columns: 100
            },
            {
                type: 'multi-choice',
                prompt: "请问您是否是美国公民",
                name: 'participant_citizenship',
                options: ['是', '否']
            },
        ]
    ],
    button_label_finish: '继续',
    on_finish: function(data) {
        jsPsych.setProgressBar((data.trial_index) / 243)
    },
};

timeline.push(payment_info);

const thankyou = {
    type: jsPsychHtmlButtonResponse,
    stimulus: ' <p>感谢您完成实验！</p> <p>请点击“完成”按钮提交您的回答并完成研究。</p>',
    choices: ['完成']
  };

timeline.push(thankyou);

jsPsych.run(timeline);
