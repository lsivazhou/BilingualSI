//initialize jspsych & show data when done
const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: true,
    message_progress_bar: "实验完成进度条",
    on_finish: function () {
        jsPsych.data.displayData('csv');
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

//instructions
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "在接下来的实验中，你将听到一些句子。你的任务是根据你是否同意这些句子来回答“是”或“否”。这个实验应该需要大约10分钟的时间。 <br><br><strong>这个实验需要音频。请在安静的地方完成，并确保声音是打开的。 </strong> <br><br>当你准备好开始时，请按下空格键。",
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
                    jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length))
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
                    jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length))
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
                    jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length))
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
                    jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length))
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

//actural trials
let tv_array = create_tv_array(trial_objects);
const trials = {
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
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + tv_array.length))
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
    timeline_variables: tv_array,
    randomize_order: true
}
timeline.push(trials)
/*
const Mint = {
    timeline: [
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `接下来您将看到8行图片。从左上角开始，请试着用中文说出每个东西的名称，并且请尽可能在不犯错的情况下快速回答。如果有任何您不知道或不记得的名称，请说“不知道”，然后继续说剩下图片的名称。如果在跳过一些图片之后想起了之前图片的正确名称，可以随时重新说那张图片正确名称（例如：之前的图是...）。请在3分钟内命名尽可能多的图片。`,
            response_ends_trial: true,
            prompt: `<br><h3>请按空格键继续<h3>`
        },
        {   type: jsPsychHtmlKeyboardResponse,
            choices: [' '],
            stimulus: `<img src='image/mint_prep_page.jpg'; style='height:400px'>`,
            response_ends_trial: true,
            prompt: `<br><h3>按下空格开始实验<h3>`
        },
        {
            type: jsPsychHtmlAudioResponse,
            stimulus: ` <img src='image/mint_sprint.jpg'; style='height:600px'>`,
            recording_duration: 180000
        }
    ]
}

timeline.push(Mint)*/


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
                name: 'immigration',
                textbox_columns: 50
            },
        ]
    ],
    button_label_finish: '继续'
};

timeline.push(questionnaire);

const leapQ = {
    timeline: [
    {
        type: jsPsychSurveyHtmlForm,
        preamble: '<p> 请按<p2>主次顺序</p2>列出你所学过或用过的语言 </p> <p>请在以下列出最多 5 种语言，并<b>按熟练程度排列</b>，也就是说，语言 1 是最熟练的语言，语言 2 是第二熟练的语言。</p>',
        html: '<p> 语言1. <input name="first" type="text" />  语言2. <input name="second" type="text" /> 语言3. <input name="third" type="text" /> 语言4. <input name="third" type="text" /> 语言5. <input name="third" type="text" /> </p>',
        button_label: '继续',
        required: true
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: '<p> 请按<p2>习得顺序</p2>列出你所学过或用过的语言（母语在先） </p> <p>请在以下列出最多 5 种语言，并<b>按习得顺序排列</b>，也就是说，语言 1 是母语，语言 2 是第个学会的语言。</p>',
        html: '<p> 语言1. <input name="first" type="text" />  语言2. <input name="second" type="text" /> 语言3. <input name="third" type="text" /> 语言4. <input name="third" type="text" /> 语言5. <input name="third" type="text" /> </p>',
        button_label: '继续',
        required: true
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: '<p> 请列出目前你所接触每种语言时间的百分比<p2>（各项百分比之和应为100%） </p2></p>',
        html: '<p> 语言1. <input name="first" type="text" />  语言2. <input name="second" type="text" /> 语言3. <input name="third" type="text" /> 语言4. <input name="third" type="text" /> 语言5. <input name="third" type="text" /> </p> <p> 语言1百分比. <input name="first" type="text" />  语言2百分比. <input name="second" type="text" /> 语言3百分比. <input name="third" type="text" /> 语言4百分比. <input name="third" type="text" /> 语言5百分比. <input name="third" type="text" /> </p>',
        button_label: '继续',
        required: true
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: '<p> 如果有你所学过或用过的几种语言的阅读材料供你选择，你选择每种语言的比例会是怎样的？假定阅读材料的原文是另一种你所不熟悉的语言<p2>（各项百分比之和应为100%） </p2></p>',
        html: '<p> 语言1. <input name="first" type="text" />  语言2. <input name="second" type="text" /> 语言3. <input name="third" type="text" /> 语言4. <input name="third" type="text" /> 语言5. <input name="third" type="text" /> </p> <p> 语言1百分比. <input name="first" type="text" />  语言2百分比. <input name="second" type="text" /> 语言3百分比. <input name="third" type="text" /> 语言4百分比. <input name="third" type="text" /> 语言5百分比. <input name="third" type="text" /> </p>',
        button_label: '继续',
        required: true
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: '<p> 如果当你与一个语言能力和语言水平与你的语言能力和语言水平完全匹配的人进行口头交流的时候，让你选择某一种语言，你使用每种你所学过或用过的语言的百分比会是怎样的？请给出全部时间的百分比<p2>（各项百分比之和应为100%） </p2></p>',
        html: '<p> 语言1. <input name="first" type="text" />  语言2. <input name="second" type="text" /> 语言3. <input name="third" type="text" /> 语言4. <input name="third" type="text" /> 语言5. <input name="third" type="text" /> </p> <p> 语言1百分比. <input name="first" type="text" />  语言2百分比. <input name="second" type="text" /> 语言3百分比. <input name="third" type="text" /> 语言4百分比. <input name="third" type="text" /> 语言5百分比. <input name="third" type="text" /> </p>',
        button_label: '继续',
        required: true
    }
    ]
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
        ]
    ],
    button_label_finish:'继续'
};

timeline.push(leapQlikert);

const language_experience_1 = {
    type: jsPsychSurvey,
    pages: [
        [   
            {
            type: 'html',
            prompt: '<br><br><p2>接下来将会有三份相同的问卷就您的母语、第二语言（如有的话）和第三语言（如有的话）水平和经历进行了解，请至少回答有关您母语的问题。</p2>',
            },
            {
                type: 'text',
                prompt: '这是我的母语：',
                name: 'language',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你开始说这门语言时候的年龄：',
                name: 'language_exp_1',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你说得流畅时候的年龄：',
                name: 'language_exp_2',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你开始用这门语言阅读时候的年龄：',
                name: 'language_exp_3',
                textbox_columns: 10,
                required: true
            },
            {
                type: 'text',
                prompt: '当你读得流畅时候的年龄：',
                name: 'language_exp_4',
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
                name: 'language__env_1',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'text',
                prompt: '使用该语言的家庭：',
                name: 'language__env_2',
                textbox_columns: 15,
                required: true
            },
            {
                type: 'text',
                prompt: '使用该语言的学校或工作单位：',
                name: 'language__env_3',
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
                name: 'speak_ability',
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
                name: 'oral_comprehension',
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
                name: 'read_ability',
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
                name: 'friend_impact',
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
                name: 'family_impact',
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
                name: 'read_impact',
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
                name: 'selflearn_impact',
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
                name: 'tv_impact',
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
                name: 'radio_impact',
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
                name: 'internet_impact',
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
                name: 'friend_time',
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
                name: 'family_time',
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
                name: 'read_time',
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
                name: 'selflearn_time',
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
                name: 'tv_time',
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
                name: 'radio_time',
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
                name: 'internet_time',
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
                name: 'accent_self_eval',
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
                name: 'accent_other_eval',
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
    button_label_finish: '继续'
};

timeline.push(language_experience_1);

const language_experience_2 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'text',
                prompt: '这是我的第二语言：',
                name: 'language',
                textbox_columns: 10,
            },
            {
                type: 'text',
                prompt: '当你开始说这门语言时候的年龄：',
                name: 'language_exp_1',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你说得流畅时候的年龄：',
                name: 'language_exp_2',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你开始用这门语言阅读时候的年龄：',
                name: 'language_exp_3',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你读得流畅时候的年龄：',
                name: 'language_exp_4',
                textbox_columns: 10
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出你在每种语言环境中所度过的时间（尽可能精确到多少年多少月）：</p2>',
            },
            {
                type: 'text',
                prompt: '使用该语言的国家：',
                name: 'language__env_1',
                textbox_columns: 15
            },
            {
                type: 'text',
                prompt: '使用该语言的家庭：',
                name: 'language__env_2',
                textbox_columns: 15
            },
            {
                type: 'text',
                prompt: '使用该语言的学校或工作单位：',
                name: 'language__env_3',
                textbox_columns: 15
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请标出你口语能力、理解能力和阅读能力方面的语言水平：</p2>',
            },
            {
                type: 'likert',
                prompt: '说',
                name: 'speak_ability',
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
                name: 'oral_comprehension',
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
                name: 'read_ability',
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
                name: 'friend_impact',
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
                name: 'family_impact',
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
                name: 'read_impact',
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
                name: 'selflearn_impact',
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
                name: 'tv_impact',
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
                name: 'radio_impact',
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
                name: 'internet_impact',
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
                name: 'friend_time',
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
                name: 'family_time',
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
                name: 'read_time',
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
                name: 'selflearn_time',
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
                name: 'tv_time',
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
                name: 'radio_time',
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
                name: 'internet_time',
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
                name: 'accent_self_eval',
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
                name: 'accent_other_eval',
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
    button_label_finish: '继续'
};

timeline.push(language_experience_2);

const language_experience_3 = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'text',
                prompt: '这是我的第三语言：',
                name: 'language',
                textbox_columns: 10,
            },
            {
                type: 'text',
                prompt: '当你开始说这门语言时候的年龄：',
                name: 'language_exp_1',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你说得流畅时候的年龄：',
                name: 'language_exp_2',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你开始用这门语言阅读时候的年龄：',
                name: 'language_exp_3',
                textbox_columns: 10
            },
            {
                type: 'text',
                prompt: '当你读得流畅时候的年龄：',
                name: 'language_exp_4',
                textbox_columns: 10
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请列出你在每种语言环境中所度过的时间（尽可能精确到多少年多少月）：</p2>',
            },
            {
                type: 'text',
                prompt: '使用该语言的国家：',
                name: 'language__env_1',
                textbox_columns: 15
            },
            {
                type: 'text',
                prompt: '使用该语言的家庭：',
                name: 'language__env_2',
                textbox_columns: 15
            },
            {
                type: 'text',
                prompt: '使用该语言的学校或工作单位：',
                name: 'language__env_3',
                textbox_columns: 15
            },
            {
                type: 'html',
                prompt: '<br><br><p2>请标出你口语能力、理解能力和阅读能力方面的语言水平：</p2>',
            },
            {
                type: 'likert',
                prompt: '说',
                name: 'speak_ability',
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
                name: 'oral_comprehension',
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
                name: 'read_ability',
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
                name: 'friend_impact',
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
                name: 'family_impact',
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
                name: 'read_impact',
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
                name: 'selflearn_impact',
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
                name: 'tv_impact',
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
                name: 'radio_impact',
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
                name: 'internet_impact',
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
                name: 'friend_time',
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
                name: 'family_time',
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
                name: 'read_time',
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
                name: 'selflearn_time',
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
                name: 'tv_time',
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
                name: 'radio_time',
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
                name: 'internet_time',
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
                name: 'accent_self_eval',
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
                name: 'accent_other_eval',
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
    button_label_finish: '继续'
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
                prompt: '请您提供您的电子邮箱email地址（仅作转账使用）。',
                name: 'payment_emailr',
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
    button_label_finish: '继续'
};

timeline.push(payment_info);

const thankyou = {
    type: jsPsychHtmlButtonResponse,
    stimulus: ' <p>感谢您完成实验！</p> <p>请点击“完成”按钮提交您的回答并完成研究。</p>',
    choices: ['完成']
  };

timeline.push(thankyou);

jsPsych.run(timeline);
