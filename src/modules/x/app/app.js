import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {

    @track hue = '#3498db';
    @track colors = this.generateColors(this.hue); //generates an array of colours based on hue
    @track mode = 'pomodoro';
    @track muted = false;

    get background() {
        var background = this.generateBackground(this.colors);
        var opacity = this.checkOpacity('pomodoro');
        return `background-image: url(${background}); opacity: ${opacity}`;
    }

    get shortBreak() {
        var colorOrder = [this.colors[2], this.colors[0], this.colors[1]];
        var background = this.generateBackground(colorOrder);
        var opacity = this.checkOpacity('short');
        return `background-image: url(${background}); opacity: ${opacity}`;
    }

    get longBreak() {
        var colorOrder = [this.colors[0], this.colors[2], this.colors[1]];
        var background = this.generateBackground(colorOrder);
        var opacity = this.checkOpacity('long');
        return `background-image: url(${background}); opacity: ${opacity}`;
    }

    checkOpacity(mode) {
        if (this.mode == mode) {
            return 1
        } else {
            return 0
        }
    }

    generateBackground(coloursArr) {
        var background = this.generateGradient(coloursArr);
        return background;
    }

    generateColors(hue) {
        return Array.from({ length: 3 }, () => this.getSimilarColor(hue));
    }

    //takes in an array with 3 hsl values and returns a gradient URL
    generateGradient(colorsArr) {
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
        ctx.fillRect(0, 0, width, height);
        const gradientURL = canvas.toDataURL();
        return gradientURL;
    }

    getSimilarColor(hex) {
        // Convert hex to RGB
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        // Convert RGB to HSL
        r /= 255;
        g /= 255;
        b /= 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = (h + (Math.random() * 0.4 - 0.20)) % 1;  // Randomly adjust hue by -5% to +5%
        s = Math.min(s + (Math.random() * 0.2 - 0.1), 1); // Randomly adjust saturation by -10% to +20%
        l = Math.min(l + (Math.random() * 0.2 - 0.1), 1); // Randomly adjust lightness by -10% to +20%

        // Convert HSL back to RGB
        let q = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
        let p = 2 * l - q;
        r = this.hueToRgb(p, q, h + 1 / 3);
        g = this.hueToRgb(p, q, h);
        b = this.hueToRgb(p, q, h - 1 / 3);

        // Convert RGB back to hex
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
    }

    hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    //Alters the background gradient when the mode changes 
    handleMode(event) {
        this.mode = event.detail;
    }

    // Uses the provided hue value to set the hue the colours are based on 
    handleHue(event) {
        const hueValue = event.detail;
        this.hue = hueValue;
        this.colors = this.generateColors(this.hue);
    }

    changeColor(event){
        const color = event.detail.color; 
        const index = event.detail.key; 
        this.colors[index] = color; 
    }

    muteSound(){
        if(this.muted == false){
            console.log('muting sound');
            this.muted = true;
        } else {
            console.log('un mute');
            this.muted = false;
        }
    }
}
