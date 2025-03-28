import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {

    @api muted;
    @api textcolor;

    @track secondsLeft = 25 * 60;
    @track pauseButtonLabel = 'Start';
    @track timerRunning = false; //used to handle pause button 
    @track isPomodoro = false; //used to track pomodoro completion 
    @track pomodoroCount = 0;

    //button sounds
    runningTimer = '/static/resources/sounds/ticking.mp3';
    buttonClick = '/static/resources/sounds/short.mp3';
    finishChime = 'static/resources/sounds/sessionChime.mp3';

    //notification image
    appIcon = 'static/resources/images/timer.svg';

    connectedCallback(){
        this.getNotificationPermission(); 
    }

    get formattedTime() { //changes seconds left to a readable format MM:SS 
        const minutes = String(Math.floor(this.secondsLeft / 60)).padStart(2, '0');
        const seconds = String(this.secondsLeft % 60).padStart(2, '0');
        return `${minutes}:${seconds}`

    }

    get textStyle() {
        return `color: ${this.textcolor};`; 
    }

    toggleTimer(playSound = true) {
        if (this.timerRunning == false) {
            this.runTimer();
            this.pauseButtonLabel = 'Stop';
            this.timerRunning = true;
        } else {
            clearInterval(this.timer);
            this.timerRunning = false;
            this.pauseButtonLabel = 'Start';
            if (playSound) {
                this.playSound(this.buttonClick);
            }
        }
    }

    runTimer() {
        this.playSound(this.runningTimer);
        this.timer = setInterval(() => {
            if (this.secondsLeft > 0) {
                this.secondsLeft--;
            } else {
                clearInterval(this.timer);
                var comparison = (this.isPomodoro == true);
                if (this.isPomodoro == true) {
                    this.pomodoroCount++
                    if (this.checkForLongBreak()) {
                        var longSession = { modeType: 'long', secondsLeft: 900, isPomodoro: false };
                        this.modeChange({ detail: longSession });
                        this.sendNotification("🔔 Time's up! You've completed a Pomodoro session. Take a well-earned break! ☕🎉"); 
                    } else {
                        var shortSession = { modeType: 'short', secondsLeft: 300, isPomodoro: false }
                        this.modeChange({ detail: shortSession });
                        this.sendNotification("🔔 Time's up! You've completed a Pomodoro session. Take a well-earned break! ☕🎉"); 
                    }
                } else {
                    var pomodoroSession = { modeType: 'pomodoro', secondsLeft: 1500, isPomodoro: true }
                    this.modeChange({ detail: pomodoroSession });
                    this.sendNotification("⏳ Focus time! Your break is over—time to dive back in and crush another Pomodoro! 💪🚀"); 
                }
                this.playSound(this.finishChime);
            }
        }, 1000);
    }

    modeChange(event) {
        if (this.timerRunning) {
            this.toggleTimer(false);
        }
        const { modeType, secondsLeft, isPomodoro } = event.detail; // Destructure the properties
        this.sendModeChange(modeType);
        this.secondsLeft = secondsLeft;
        this.isPomodoro = isPomodoro;
    }

    checkForLongBreak() {
        return this.pomodoroCount % 4 == 0;
    }

    sendModeChange(mode) {
        const event = new CustomEvent('modechange', { 
            detail: mode
        });
        this.dispatchEvent(event);
    }

    playSound(soundPath) {
        if (this.muted == false) {
            const sound = new Audio(soundPath);
            sound.play();
        }
    }

    // Notifications 
    getNotificationPermission() {
        if ("Notification" in window) {
            if (Notification.permission !== "granted") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification("We will send you notifications when your session has finished.")
                    }
                })
            }
        }
    }

    sendNotification(content) {
        if (Notification.permission === "granted") {
            const options = {
                body: content,
                icon: this.appIcon
            };
            new Notification("Pomodoro Timer", options);
        }
    }

}
