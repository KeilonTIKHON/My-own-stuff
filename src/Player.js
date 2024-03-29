import React, { useState, useEffect } from 'react'
import './Player.css'
let clicked = false;
let saved = null;
let timer = null;
let smth = 0;

//12
  

function update(player,audio) {
  
  if (player.playing) {
    document.querySelector('.slider').addEventListener("click", ()=>{setTimeout(()=>{audio.currentTime=document.getElementsByClassName('slider')[0].value},0)})
    console.log('mem')
    timer = setInterval(() => {
      if (player.playing) {
        let range=document.getElementsByClassName('slider');
        smth=player.audio.currentTime
        range[0].value = smth
        
        
      }

    }, 1000)
  } else {
    
      smth=player.audio.currentTime
      clearInterval(timer)
      
    
    
    

  }
  console.log(smth)
}

const useMultiAudio = urls => {




  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url,
        fromstart: false,
        playing: false,
        switchbt: false,
        audio: new Audio(url),
      }
    }),
  )

  const toggle = targetIndex => () => {

    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      smth=0;
      newPlayers[targetIndex].fromstart = true
      newPlayers[targetIndex].switchbt = true
      newPlayers[currentIndex].fromstart = true
      newPlayers[currentIndex].switchbt = false
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
      clicked = true;


    } else if (currentIndex !== -1) {


      newPlayers[targetIndex].playing = false
      newPlayers[targetIndex].fromstart = false
      saved = newPlayers[targetIndex]

    } else {

      if (clicked) {
        saved.switchbt = false;
        if (saved !== newPlayers[targetIndex]) {
          newPlayers[targetIndex].fromstart = true

        }
      }
      newPlayers[targetIndex].switchbt = true
      newPlayers[targetIndex].playing = true

      clicked = true;
    }
    setPlayers(newPlayers)

  }

  useEffect(() => {
    players.forEach((source, i) => {
      if (players[i].playing) {
        if (players[i].fromstart) {

          source.audio.currentTime = 0
          source.audio.play()
        } else {

          source.audio.play()
          console.log(source.audio.currentTime)
        }


      } else {

        source.audio.pause()
      }

      //players[i].playing ? source.audio.play() : source.audio.pause()
    })
  }, [players])

  useEffect(() => {
    players.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      players.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
  }, [])

  return [players, toggle]
}

const MultiPlayer = ({ MusArr }) => {
  let urls = []
  for (let i = 0; i < MusArr.length; i++) {
    urls[i] = MusArr[i].link;
  }
  const [players, toggle] = useMultiAudio(urls)

  return (
    <div>
      {players.map((player, i) => (
        <Player key={i} player={player} toggle={toggle(i)} name={MusArr[i].name} date={MusArr[i].date} duration={MusArr[i].duration} audio={player.audio} />
      ))}

    </div>
  )
}

const Player = ({ player, toggle, name, date, duration, audio }) => (
  <div className='player'>
    <div className='btn' onClick={toggle}  >{player.playing ? <div className='pausebtn'></div> : <div className='playbtn'></div>}</div>
    <p className='player_child'>{name}</p>
    <p className='player_child'>{date}</p>
    <p className='player_child'>{duration}</p>
    <div className='b'>{player.switchbt ? <Botplayer player={player} toggle={toggle} name={name} date={date} duration={duration} audio={audio} /> : ''}
    </div>
  </div>
)

const Botplayer = ({ player, toggle, name, date, duration, audio }) => {


  useEffect(()=>{
    
    clearInterval(timer)
    console.log('change')
    update(player,audio)
    document.getElementsByClassName('slider')[0].value = smth
  },[])  




  return (
    <div className='botplayer'>
      <div className='lato-regular1'>{name}</div>
      <div className='btn' onClick={toggle}>{player.playing ? <div className='pausebtn1'></div> : <div className='playbtn1'></div>}</div>
      <input type="range" min="0" max={audio.duration} className="slider" id="myRange" ></input>
    </div>
  )
}




export default MultiPlayer