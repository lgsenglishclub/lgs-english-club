function speakWord(word){

    let speech = new SpeechSynthesisUtterance(word);


    speech.lang = "en-US";

    speech.rate = 0.8;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}