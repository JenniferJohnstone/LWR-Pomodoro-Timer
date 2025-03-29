import { LightningElement, track, api} from 'lwc';

export default class App extends LightningElement {

    textColor = '#000000'
    
    changeTextColor(){
        //if color is black 
        if(this.textColor == '#000000'){
            this.textColor = '#FFFFFF'; 
        } else {
            this.textColor = '#000000'; 
        }
        const newEvent = new CustomEvent('textcolor', {
            bubbles: true, 
            composed: true, 
            detail: {color: this.textColor}
        }); 
        this.dispatchEvent(newEvent);
    }
 
}
