//initialize jspsych & show data when done
const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
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
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<h3><strong><big>声明</big></strong></h3> <p><font size="3"> 斯坦福大学语言学系诚邀您参与一项关于语言生成和理解的研究。您的科研员将请您完成语言任务，比如阅读句子或词语，命名图片或描述场景，造句，或参与简单的语言游戏。 <br><br> 本研究没有任何风险，不会为您带来正面或负面的影响。 <br><br> 您将按照公布的费率获得参与报酬。<br><br> 如果您已阅读本声明并决定参与本实验，请理解您的参与是自愿的，您有权随时撤回您的准许或停止参与，而不会受到处罚或失去您本应享有的权利。您有权拒绝执行特定任务。您的个人隐私将在由该研究产生的所有出版和书面数据中得到保护。您可以打印此声明作为您的记录。<br><br>联系信息：如果您对这项研究、其程序、风险和好处有任何疑问、担忧或投诉，请联系章程主管Meghan Sumner，电话号码为(650)-725-9336。如果您对该研究的执行过程不满意，或者如果您有任何疑虑、投诉、关于研究的问题或您作为参与者的权利的问题，请联系斯坦福大学审查委员会(IRB)以与研究团队外的独立的人员交流，电话号码为(650)-723-2480或免费电话1-866-680-2906。您还可以写信至斯坦福大学审查委员会，地址为美国加利福尼亚州帕洛阿尔托市艾尔卡米诺皇家大道3000号，Five Palo Alto Square，4楼，邮编94306 （3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA）。<br><br>如果您同意参与，请继续进行这项实验。</font></p>',
    // What should the button(s) say
    choices: ['继续']
};

// push to the timeline
timeline.push(irb);

// instructions
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
            "<h3><strong><big>背景故事</big></strong></h3> <br> <img src='image/0.jpg'; alt='gumball_machine'; align='right'; style='height:200px'> <p2 align='left'><big> 你正在一家糖果店里测试一排口香糖机。这些是特殊的口香糖机，它们会语音播报你得到了多少颗口香糖。然而，这个报告有时会出错。</big></p2> <br><br> <img src='image/store_worker_1.jpg' alt='store_worker_sitting' align='left' style='height:200px'> <br><br> <p2 align='right'> <big> 店员告诉你，他的老板曾经威胁他，如果口香糖机空了，就解雇他，但他真的需要这份工作。他不能从收银台看到这些机器，但通常可以通过机器的播报来判断它们的装满程度。</big> </p2> <br><br><br> <img src='image/store_worker_2.jpg' alt='store_worker_standing' align='center' style='height:200px'> <p2 align='left'> <big> 他请你告诉他声明是正确还是错误，这样他就会知道机器是否为空，是否需要补充口香糖。</big> </p2> <br><br>", 
    choices: [" "],
    prompt: "<h3>请按下空格键以继续实验。<h3>"
};
timeline.push(cover_story);
/*
const trials = {
    timeline: [
        {
            type: jsPsychAudioKeyboardResponse,
            choices: [""],
            stimulus: 'audio/kaching.wav',
            response_ends_trial: false,
            trial_ends_after_audio: true,
            trial_duration: 1000,
            prompt: `<img src='image/0.jpg'>`
        },
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['f', 'j'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: true,
            response_ends_trial: true,
            trial_duration: 4000,
            prompt: `<img src='image/13.jpg'>`,
            on_finish: function(data) {
                evaluate_response(data);
            },
            data: jsPsych.timelineVariable('data')
        }
    ],
    timeline_variables: [
        {stimulus: 'audio/suoyou.wav'},
    ],
    randomize_order: true
}*/

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
            prompt: `<img src='image/0.jpg'>`
        },
        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['f', 'j'],
            stimulus: jsPsych.timelineVariable('stimulus'),
            response_allowed_while_playing: false,
            trial_duration: 4000,
            prompt: jsPsych.timelineVariable('prompt'),
            on_finish: function(data) {
                evaluate_response(data);
            },
            data: jsPsych.timelineVariable('data')
        }
    ],
    timeline_variables: tv_array,
    randomize_order: true
}
timeline.push(trials)

jsPsych.run(timeline);
