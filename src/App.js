import djImg from './images/upscaler-deepdream-cropped-2x-morecrop.jpg'
import './App.css';
import QuoteSwitcher from './QuoteSwitcher';


function Quote(props){
  console.log("Running quote thing");
  var currentQuote = 0;
  var quotes = [
    {"name": "James Arnott", "quote": "Mr Isaacs was my favourite teacher in school"},
    {"name": "Josh Dinsdale", "quote": "I always sucked off DJ in class"}
  ];
  var interval = setInterval(() => {
    console.log(currentQuote);
    currentQuote === quotes.length-1 ? currentQuote = 0 : currentQuote++;
    document.querySelector("#currentQuote").innerText = `${quotes[currentQuote].quote} - ${quotes[currentQuote].name}`;
    console.log("Changed Quote!");
  }, 1000);
  return <p id="currentQuote">{quotes[props.startQuote].quote} - {quotes[props.startQuote].name}</p>
} // <Quote startQuote="0"></Quote>

function App() {

  // eslint-disable-next-line
  return (
    
    <div className="App">
      <img src={djImg} alt="" className="backgroundDJ"></img>
      <header className="App-header">
        <div className="Title">
          <h1>David (DJ) Isaacs</h1>
          <h2>Memorial</h2>
          
        </div>
        <br></br>
        <p className="subTitle">
          A memorial for him, from his students
        </p>
      </header>
      <QuoteSwitcher timePerWord="500" fadeTime="1" quoteSection="Best Moments"/>
      <div className="formLinkContainer">
      <a className="responseForm" href="https://forms.gle/CT63yfhdCnmfx25p6">
        Click Here To Submit Your Own Experiences With Mr Isaacs
      </a>
      </div>
      
    </div>
  );
}

export default App;
