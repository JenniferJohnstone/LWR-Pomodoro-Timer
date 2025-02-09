import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {

    @api hue;
    @api colors;
    @api muted;
    @track testClass = `hueSelection closed`;
    @track display = `display: none;`
    @track menuVisibility = false;
    @track menuTitle = 'Settings'; 

    changeSound = '/static/resources/sounds/pop.mp3'

    handleHueChange(event) {
        const hexValue = event.target.value;
        this.hue = hexValue;
        const hueChangeEvent = new CustomEvent('huechange', {
            detail: hexValue
        });
        this.dispatchEvent(hueChangeEvent);
        this.playSound(this.changeSound);
    }

    handleColorChange(event) {
        const hexValue = event.target.value;
        const key = event.target.dataset.index;
        const colorChangeEvent = new CustomEvent('colorchange', {  
            detail: { color: hexValue, key: key }
        });
        this.dispatchEvent(colorChangeEvent);
    }

    toggleMenu() {
        if (this.menuVisibility == false) {
            this.testClass = `hueSelection preOpen`
            setTimeout(() => {
                this.testClass = `hueSelection open`;
                this.menuVisibility = true;
                this.menuTitle = 'Hide settings';
            }, 200);
            setTimeout(() => {
                this.display = `display:block;`;
            }, 400)
        } else {
            this.menuVisibility = false;
            this.menuTitle = 'Settings'
            this.testClass = `hueSelection preOpen`;
            setTimeout(() => {
                this.display = `display:none;`;
            }, 600);
            setTimeout(() => {
                this.testClass = `hueSelection preClosed`;
            }, 1000);
        }
    }

    playSound(soundPath){
        if(this.muted == false){
            const sound = new Audio(soundPath); 
            sound.play(); 
        }
    }

    muteSound(){
        const muteEvent = new CustomEvent('mute'); 
        this.dispatchEvent(muteEvent);
    }
}
