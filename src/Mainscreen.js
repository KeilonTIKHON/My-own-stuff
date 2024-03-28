import React from "react";
import sound from "./music/betterday186374.mp3"
import sound1 from "./music/coverless-book-186307.mp3"
import './mainscreen.css';
import MultiPlayer from "./Player";



class Mainscreen extends React.Component{
    render(){
        return(
            
            <div className="mainscreen">
                <MultiPlayer MusArr={[
          {link:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', name:'sound helix 1',date:'01.03.2024',duration:'6:12'},
          {link:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', name:'sound helix 2',date:'02.03.2024',duration:'7:05'},
          {link:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', name:'sound helix 3',date:'03.03.2024',duration:'5:44'},
        ]} />
            </div>
            
        )
    }
}

export default Mainscreen