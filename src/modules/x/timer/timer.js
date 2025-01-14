import { LightningElement, track, api} from 'lwc';

export default class App extends LightningElement {
    @track secondsLeft = 25 * 60; 
    @track pauseButtonLabel = 'Start'; 
    @track timerRunning = false; //used to handle pause button 
    @track isPomodoro = false; //used to track pomodoro completion 
    @track pomodoroCount = 0; 

    get formattedTime(){ //changes seconds left to a readable format MM:SS 
        const minutes = String(Math.floor(this.secondsLeft / 60)).padStart(2, '0'); 
        const seconds = String(this.secondsLeft % 60).padStart(2,'0');
        return `${minutes}:${seconds}`

    }

    toggleTimer(){
        if(this.timerRunning == false){
            this.runTimer(); 
            this.pauseButtonLabel = 'Stop';
            this.timerRunning = true; 
        } else {
            clearInterval(this.timer); 
            this.timerRunning = false; 
            this.pauseButtonLabel = 'Start';
        }
    }

    runTimer(){
        this.timer = setInterval(() => {
            if(this.secondsLeft > 0){
                this.secondsLeft--;
            } else {
                clearInterval(this.timer); 
                console.log('is pomodoro?', this.isPomodoro);
                if(this.isPomodoro == true){
                    this.pomodoroCount++
                    if (this.checkForLongBreak()){
                        this.setLongBreak();  
                    } else {
                        this.setShortBreak(); 
                    }
                } else {
                    this.setPomodoro(); 
                }
                this.toggleTimer();
            }
        }, 1000);
    }

    setShortBreak(){
        this.sendModeChange('short');
        this.secondsLeft = 5 * 60; 
        this.isPomodoro = false; 
    }

    setLongBreak(){
        this.sendModeChange('long');
        this.isPomodoro = false; 
        this.secondsLeft = 15 * 60; 
    }

    setPomodoro(){ 
        this.sendModeChange('pomodoro');
        this.secondsLeft = 25 * 60;
        this.isPomodoro = true; 
    }

    checkForLongBreak(){ 
        return this.pomodoroCount % 4 == 0; 
    }

    sendModeChange(mode){
        const event =  new CustomEvent('modechange', {
            detail: mode
        }); 
        this.dispatchEvent(event); 
    }

}
