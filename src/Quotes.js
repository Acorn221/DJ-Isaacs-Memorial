import React from 'react';

class Quotes extends React.Component {
    constructor(props) {
      super(props);
      this.currentQuote = 0;
      this.timeBetweenQuotes = props.timeBetweenQuotes*1000;
      this.classNameArray = ["quotes"];
      this.fadeTimeout = {running: false};
      this.fadeTime = props.fadeTime*1000;
      this.quotes = [
        {"name": "James Arnott", "quote": "Mr Isaacs was my favourite teacher in school"},
        {"name": "Josh Dinsdale", "quote": "I always sucked off DJ in class"},
        {"name": "Ben WW", "quote": "DJ let us make the bone smuggler presentation"}
      ];
    }
    makeid(length) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * 
     charactersLength)));
       }
       return result.join('');
    }
    fade(bool) { // true for in, false for out
        if(this.fadeTimeout.running) return console.error(`Fuck, fade doesn't work, fade opt: ${bool ? "in" : "out"}`);
        if(this.classNameArray.indexOf(bool ? "fadeIn" : "fadeOut") === -1) this.classNameArray.push(bool ? "fadeIn" : "fadeOut");
        this.forceUpdate();
        this.fadeTimeout = {running: true, timer : setTimeout(() => {
            this.classNameArray = this.classNameArray.filter(x => x !== "fadeIn" && x !== "fadeOut");
            console.log("Removing fade");
            this.fadeTimeout.running = false;
            this.forceUpdate();
        }, this.fadeTime-10)};
    }

    fadeSequence(){
        this.fade(true);
        this.fadeSequenceTimeout = setTimeout(() => {
            this.fade(false);
        }, this.timeBetweenQuotes-this.fadeTime);
    }
  
    tick() {
        this.currentQuote === this.quotes.length-1 ? this.currentQuote = 0 : this.currentQuote++;
        this.fadeSequence();
        this.forceUpdate();
    }
  
    componentDidMount() {
      this.interval = setInterval(() => this.tick(), this.timeBetweenQuotes);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
      clearInterval(this.fadeSequenceTimeout);
      clearInterval(this.fadeTimeout);
    }  

    getClassName() {
        return this.classNameArray.join(" ");
    }
    render() {
      return (
        <div className={this.getClassName()} key={this.makeid(10)}>
          {this.quotes[this.currentQuote].quote} - {this.quotes[this.currentQuote].name}
        </div>
      );
    }
  }

  export default Quotes;