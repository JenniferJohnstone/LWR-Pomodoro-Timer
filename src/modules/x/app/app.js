import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {       

    @track hue = Math.floor(Math.random() * 360); //generates a starting hue to base colours on
    @track colors = this.generateColors(this.hue); //generates an array of colours based on hue
    @track mode = 'pomodoro'; 

    get background(){
        var background = this.generateBackground();
        var opacity = this.checkOpacity('pomodoro');
        return `background-image: url(${background}); opacity: ${opacity}`; 
    }

    get shortBreak(){ 
        var background = this.generateBackground();
        var opacity = this.checkOpacity('short');
        return `background-image: url(${background}); opacity: ${opacity}`; 
    }

    get longBreak(){ 
        var background = this.generateBackground();
        var opacity = this.checkOpacity('long');
        return `background-image: url(${background}); opacity: ${opacity}`; 
    }

    checkOpacity(mode){
        if(this.mode == mode){
            return 1
        } else {
            return 0
        }
    }

    generateBackground(){
        var colors = Array.from({length: 3}, () => this.getSimilarColor(this.hue));
        var background = this.generateGradient(colors);
        return background;
    }

    generateColors(hue){
        return Array.from({length: 3}, () => this.getSimilarColor(hue));
    }

    //takes in an array with 3 hsl values and returns a gradient URL
    generateGradient(colorsArr){ 
        const width = window.innerWidth;
        const height = window.innerHeight; 
        const canvas = document.createElement('canvas'); 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 

        const ctx = canvas.getContext('2d'); 
        const gradient = ctx.createLinearGradient(0, 0, width, height); 
        gradient.addColorStop(0, colorsArr[0]); 
        gradient.addColorStop(0.5, colorsArr[1]); 
        gradient.addColorStop(1, colorsArr[2]); 
        ctx.fillStyle = gradient; 
        ctx.fillRect(0,0, width, height); 
        const gradientURL = canvas.toDataURL(); 
        return gradientURL;
    }

    //generates similar hues
    getSimilarColor(hue){ 
        //To do: Allow the user to provide values for the brightness and saturation
        const offset = Math.floor(Math.random() * 150) - 15;
        //To do: define a random number within a range for the brightness and saturation values for more variance
        return `hsl(${(hue + offset) % 360}, 70%, 70%)`; 
    }

    //Alters the background gradient when the mode changes 
    handleMode(event){
        this.mode = event.detail; 
        this.colors = Array.from({length: 3}, () => this.getSimilarColor(this.hue));
    }

    // Uses the provided hue value to set the hue the colours are based on 
    handleHue(event){
        const hueValue = Number(event.detail) || 180; // Default to 180 if invalid
        this.hue = hueValue;
        console.log("running hue change event", this.hue);
        this.colors = Array.from({length: 3}, () => this.getSimilarColor(this.hue));
    }

}
