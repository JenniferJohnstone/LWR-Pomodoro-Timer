import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {

    @api hue;
    @api colors;
    @api muted;
    @track testClass = `hueSelection closed`;
    @track display = `opacity:0;`
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

    // toggles the options menu from being visible or not
    toggleMenu() {
        if (this.menuVisibility == false) {
            this.testClass = `hueSelection preOpen`
            // toggles the width of the white container
            setTimeout(() => {
                this.testClass = `hueSelection open`;
                this.menuVisibility = true;
                this.menuTitle = 'Hide settings';
            }, 200);
            // sets the items inside the container to be visible 
            setTimeout(() => {
                // this.display = `display:block;opacity:1;`; 
                this.display = `opacity:1;`; 

            }, 400)
        } else {
            this.menuVisibility = false;
            this.menuTitle = 'Settings'
            this.display = `opacity:0;`; 
            setTimeout(() => {
                this.testClass = `hueSelection preOpen`;
            }, 300);
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
