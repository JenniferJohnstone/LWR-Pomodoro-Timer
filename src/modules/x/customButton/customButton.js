import { LightningElement, track, api} from 'lwc';

export default class App extends LightningElement {
    @api label;
    @api modeType;
    @api secondsLeft; 
    @api isPomodoro;  

    setMode(){
        const modeChange = new CustomEvent('modechange', {
            detail: { modeType: this.modeType, secondsLeft: this.secondsLeft, isPomodoro: this.isPomodoro }
        });
        this.dispatchEvent(modeChange);
    }

}
