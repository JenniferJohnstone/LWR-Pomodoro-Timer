import { LightningElement, track, api } from 'lwc'; 

export default class App extends LightningElement {          
 
    @api hue; 
    @track testClass = `hueSelection closed`;   
    @track display = `display: none;`
    @track menuVisibility = false;
    @track menuTitle = 'View options'

    get previewStyle(){
        return `background-color: hsl(${this.hue}, 70%, 70%);`; 
    }

    handleHueChange(event){
        this.hue = event.target.value; 
        const hueChangeEvent =  new CustomEvent('huechange', { 
            detail: this.hue
        }); 
        this.dispatchEvent(hueChangeEvent);   
    } 

    toggleMenu(){
        if(this.menuVisibility == false){
            this.testClass = `hueSelection preOpen`
            setTimeout(() => {
                this.testClass = `hueSelection open`; 
                this.menuVisibility = true;
                this.menuTitle = 'Hide options'; 
            }, 200);
            setTimeout(() => {
                this.display = `display:block;`; 
            }, 400)
        } else {
            this.menuVisibility = false; 
            this.menuTitle = 'View options'
            this.testClass = `hueSelection preOpen`; 
            setTimeout(() => {
                this.display = `display:none;`; 
            }, 100); 
            setTimeout(() => {
                this.testClass = `hueSelection preClosed`;
            }, 300); 
        }
    }

}
