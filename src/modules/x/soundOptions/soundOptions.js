import { LightningElement, track, api} from 'lwc';

export default class App extends LightningElement {
    
    muteSound(){
        const muteEvent = new CustomEvent('mute'); 
        this.dispatchEvent(muteEvent);
    }
 
}
