import React from 'react';
import * as quotesImport from './quotes.json';

class QuoteSwitcher extends React.Component {
    constructor(props) {
      super(props);
      this.currentQuote = 0;
      this.timePerWord = props.timePerWord;
      this.classNameArray = ["quotes"];
      this.fadeTimeout = {running: false};
      this.fadeTime = props.fadeTime*1000;
      this.quoteSection = props.quoteSection;
      this.quotes = quotesImport.default[this.quoteSection].quotes;
      console.log(this.quotes);
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
    async fade(bool) {
        return new Promise((resolve) => {
          this.classNameArray = this.classNameArray.filter(x => x !== "fadedOut");
          if(this.classNameArray.indexOf(bool ? "fadeIn" : "fadeOut") === -1) this.classNameArray.push(bool ? "fadeIn" : "fadeOut");
          this.forceUpdate();
          setTimeout(() => {
            this.classNameArray = this.classNameArray.filter(x => x !== "fadeIn" && x !== "fadeOut");
            if(!bool)this.classNameArray.push("fadedOut");
            console.log("Removing fade");
            this.fadeTimeout.running = false;
            this.forceUpdate();
            resolve();
          }, this.fadeTime);
        });
    }
    async fadeSequence(){
      console.log("fade sequence called")
      if(this.fadeTimeout.running) return console.error("Fade sequence called when it's running already");
      await this.fade(true);
      var delayTime = (this.timePerWord*this.quotes[this.currentQuote].quote.split(" ").length) - this.fadeTime;
      console.log("Delay time: "+delayTime);
      await new Promise((resolve) => setTimeout(resolve, delayTime));
      await this.fade(false);
    }
    
  
    async componentDidMount() {
      this.notUnmounted = true;
      while(this.notUnmounted){
        this.currentQuote === this.quotes.length-1 ? this.currentQuote = 0 : this.currentQuote++;
        this.classNameArray.push("fadeIn");
        console.log(this.quotes[this.currentQuote].quote);
        await this.fadeSequence();
      }
    }
  
    componentWillUnmount() {
      console.log("Component unmounted!!");
      this.notUnmounted = false;
    }  

    getClassName() {
        return this.classNameArray.join(" ");
    }
    render() {
      return (
        <div className={this.getClassName()} key={this.makeid(10)}>
          {this.quoteSection}: <br></br>
          {this.quotes[this.currentQuote].quote} - {this.quotes[this.currentQuote].name}
        </div>
      );
    }
  }

  export default QuoteSwitcher;