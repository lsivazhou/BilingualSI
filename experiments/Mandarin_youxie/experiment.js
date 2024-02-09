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
const preload_image_array = ['image/0.jpg', 'image/1.jpg', 'image/2.jpg', 'image/3.jpg', 'image/4.jpg', 'image/5.jpg', 'image/6.jpg', 'image/7.jpg', 'image/8.jpg', 'image/9.jpg', 'image/10.jpg', 'image/11.jpg', 'image/12.jpg', 'image/13.jpg']
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
    stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
    // What should the button(s) say
    choices: ['Continue']
};

// push to the timeline
timeline.push(irb);

// instructions
const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "在接. Your job is to answer yes or no based on whether you agree with these sentences or not. The experiment should take ~10 minutes. <br><br><strong>This experiment requires audio. Please complete it in a quiet place and make sure the sound is on. </strong> <br><br>When you're ready to begin, press the space bar.",
    choices: [" "]
};
timeline.push(instructions);

jsPsych.run(timeline);
