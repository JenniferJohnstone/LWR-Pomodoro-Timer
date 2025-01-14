import { LightningElement, track, api } from 'lwc'; 

export default class App extends LightningElement {          
 
    @api hue; 
    @track testClass = `hueSelection closed`;   
    @track display = `display: none;`
    @track menuVisibility = false;
    @track menuTitle = 'Color options'

    handleHueChange(event){  
        const hexValue = event.target.value; 
        this.hue = hexValue;
        console.log('this is hexValue', this.hue);
        const hueChangeEvent =  new CustomEvent('huechange', { 
            detail: hexValue
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
            this.menuTitle = 'Color options'
            this.testClass = `hueSelection preOpen`; 
            setTimeout(() => {
                this.display = `display:none;`; 
            }, 100); 
            setTimeout(() => {
                this.testClass = `hueSelection preClosed`;
            }, 300); 
        }
    }

    // hexToHue(hex) {
    //     // Convert hex to RGB
    //     let r = parseInt(hex.substring(1, 3), 16) / 255;
    //     let g = parseInt(hex.substring(3, 5), 16) / 255;
    //     let b = parseInt(hex.substring(5, 7), 16) / 255;
    
    //     // Find max and min values
    //     let max = Math.max(r, g, b), min = Math.min(r, g, b);
    //     let h;
    
    //     if (max === min) {
    //         h = 0; // No hue (grayscale)
    //     } else {
    //         let d = max - min;
    
    //         switch (max) {
    //             case r: h = ((g - b) / d) % 6; break;
    //             case g: h = ((b - r) / d) + 2; break;
    //             case b: h = ((r - g) / d) + 4; break;
    //         }
    
    //         h = Math.round(h * 60);
    //         if (h < 0) h += 360; // Ensure positive hue value
    //     }
    
    //     return h;
    // }    

}
