import { LightningElement, track, api} from 'lwc';

export default class App extends LightningElement {
    @api label;
    @api event; 
    @api styling;

    executeEvent(){
        if (this.event == undefined) {
            return;
        }
        this.dispatchEvent(this.event);
    }

}
