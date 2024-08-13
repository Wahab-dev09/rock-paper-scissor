import React from 'react'
import { useNavigate } from 'react-router-dom'
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import "./Rps.css"
import { useState, useEffect } from 'react'

const Rps = () => {
  const [username, setusername] = useState('')
  const [roundnumbers, setroundnumbers] = useState(0)
  const [roundResults, setRoundResults] = useState([]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedRoundnumber = sessionStorage.getItem('rounds');
    if (storedUsername) {
      setusername(storedUsername);
    }
    if (storedRoundnumber) {
      setroundnumbers(Number(storedRoundnumber));
    }
  }, []);
  const nav = useNavigate();
  const gotohome = () => {
    nav('/')
  }
  const { width, height } = useWindowSize();
  const [playerop, setplayerop] = useState(null);
  const [playerbg, setplayerbg] = useState('');
  const [winner, setwinner] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [loader, setloader] = useState(false);
  const [overallWinner, setOverallWinner] = useState(null);
  const [round, setRound] = useState(0);
  const [disablebtn, setdisablebtn] = useState(false)
  const optionsarray = [`${import.meta.env.BASE_URL}hand.webp`, `${import.meta.env.BASE_URL}scissor.webp`, `${import.meta.env.BASE_URL}rock.webp`];
  const colorsarray = ['rgb(216, 0, 187)', 'rgb(0, 217, 255)', 'rgb(0, 247, 0)'];
  const [compop, setcompop] = useState(null);
  useEffect(() => {
    setRoundResults(Array(roundnumbers).fill(null));
  }, [roundnumbers]); // Dependency on roundnumbers
  const [fade, setfade] = useState(false)
  const [winnertext, setwinnertext] = useState(false);
  const [rulesbox, setrulesbox] = useState(false);
  const [conf, setconf] = useState(false)
  const [confeffect, setconfeffect] = useState(false)

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
  };

  const handleoption = (index) => {
    const playerChoice = optionsarray[index];
    const playerColor = colorsarray[index];
    setplayerop(playerChoice);
    setplayerbg(playerColor);
    setloader(true);
    setfade(false);
    setdisablebtn(true);

    const randomnum = Math.floor(Math.random() * 3);
    const computerChoice = optionsarray[randomnum];
    const computerColor = colorsarray[randomnum];
    const comp = {
      computerop: computerChoice,
      computerbg: computerColor
    };

    setTimeout(() => {
      setcompop(comp);
      const result = determineWinner(playerChoice, computerChoice);
      setwinner(result);
      setloader(false);
      setwinnertext(true);

      // Update the round results
      const updatedResults = [...roundResults];
      if (result === 'You win') {
        updatedResults[round] = 'green';
      } else if (result === 'You lose') {
        updatedResults[round] = 'red';
      } else {
        updatedResults[round] = 'draw';
      }
      setRoundResults(updatedResults);
      setRound(round + 1);

      if (round < roundnumbers - 1) {
        setTimeout(() => {
          resetRound();
        }, 2000);
      } else {
        setTimeout(() => {
          checkOverallWinner(updatedResults);
        }, 2000);
        // Check for overall winner after three rounds
      }
    }, 1000);
  };

  const resetRound = () => {
    setfade(true);
    setdisablebtn(false)
    setTimeout(() => {
      setplayerop(null);
      setplayerbg('');
      setcompop(null);
      setwinner('');
      setfade(false);
      setwinnertext(false);
    }, 750);
  };
  const checkOverallWinner = (results) => {
    // Count the number of wins for each player
    const userWins = results.filter(result => result === 'green').length;
    const computerWins = results.filter(result => result === 'red').length;

    // Determine overall winner
    if (userWins > computerWins) {
      setOverallWinner(`${username} Wins`);
      triggerConfetti();
    } else if (userWins < computerWins) {
      setOverallWinner('Computer Wins');
    } else {
      setOverallWinner('Draw');
    }
  };

  const resetGame = () => {
    setfade(true);
    setTimeout(() => {
      setplayerop(null);
      setplayerbg('');
      setwinner('');
      setloader(false);
      setcompop(null);
      setRound(0);
      setRoundResults(Array(roundnumbers).fill(null));
      setdisablebtn(false)
      setOverallWinner(null)
    }, 700);
  };
  const HandleAgain = () => {
    resetGame();
  }

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return 'Draw';
    }
    if (
      (player === `${import.meta.env.BASE_URL}rock.webp` && computer === `${import.meta.env.BASE_URL}scissor.webp`) ||
      (player === `${import.meta.env.BASE_URL}scissor.webp` && computer === `${import.meta.env.BASE_URL}hand.webp`) ||
      (player === `${import.meta.env.BASE_URL}hand.webp` && computer === `${import.meta.env.BASE_URL}rock.webp`)
    ) {
      return 'You win';
    } else {
      return 'You lose';
    }
  };
  useEffect(() => {
    if (playerop && compop && winner) {
      console.log('Player choice:', playerop);
      console.log('Computer choice:', compop);
      console.log('Winner:', winner);
    }
  }, [playerop, compop, winner]);
  const togglerules = () => {
    setrulesbox(!rulesbox)
  }
  const handlehomeconf = () => {
    setdisablebtn(true)
    setconf(true);
    setTimeout(() => {
      setconfeffect(true);
    }, 10);
  }
  const homeconfhide = () => {
    setdisablebtn(false)
    setconfeffect(false);
    setTimeout(() => {
      setconf(false);
    }, 1000);
  }

  return (
    <div className="fullscreen">
      {showConfetti && <Confetti style={{ zIndex: 8 }} width={width} height={height} gravity={0.5} recycle={false} />} {/* Confetti component */}
      <div className="inner-box">
        <div className="box1">
          <span>Best of {roundnumbers}</span>
          <button onClick={togglerules}>RULES</button>
        </div>
        <div className="box2">
          <div className="rounds">
            <svg onClick={handlehomeconf} width='24px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" /><path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" /></svg>
            <div className="round-box">
              {roundResults.map((arritem, index) => (
                <div key={index}>
                  {arritem === 'green' ? <img decoding='async' loading='lazy' fetchpriority='low' width='20px' height='20px' src={`${import.meta.env.BASE_URL}crown.webp`} alt="crown" /> : arritem === 'red' ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill='red'><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg> : arritem === 'draw' ? <img decoding='async' loading='lazy' fetchpriority='low' width="20" height="20" src={`${import.meta.env.BASE_URL}handshake.webp`} /> : ''
                  }
                </div>
              ))}
            </div>
          </div>
          <div className={`rulesbox ${rulesbox ? "r-show" : "r-hide"}`}>
            <h1>Rules :</h1>
            <div><img decoding='async' loading='lazy' fetchpriority='low' className='rule-r' width='41px' height='41px' src={`${import.meta.env.BASE_URL}rock.webp`} alt="rock" /><span>Beats</span><img decoding='async' loading='lazy' fetchpriority='low' className='rule-s' width='41px' height='41px' src={`${import.meta.env.BASE_URL}scissor.webp`} alt="scissor" /></div>
            <div><img decoding='async' loading='lazy' fetchpriority='low' className='rule-s' width='41px' height='41px' src={`${import.meta.env.BASE_URL}scissor.webp`} alt="scissor" /><span>Beats</span><img decoding='async' loading='lazy' fetchpriority='low' className='rule-h' width='41px' height='41px' src={`${import.meta.env.BASE_URL}hand.webp`} alt="hand" /></div>
            <div><img decoding='async' loading='lazy' fetchpriority='low' className='rule-h' width='41px' height='41px' src={`${import.meta.env.BASE_URL}hand.webp`} alt="hand" /><span>Beats</span><img decoding='async' loading='lazy' fetchpriority='low' className='rule-r' width='41px' height='41px' src={`${import.meta.env.BASE_URL}rock.webp`} alt="rock" /></div>
          </div>
          {conf &&
            <div className={`home-conf ${confeffect ? "home-conf-show" : "home-conf-hide"}`}>
              <h1>Are you sure</h1>
              <p>Do you want to leave the game ?</p>
              <div>
                <button onClick={gotohome}>Yes</button>
                <button onClick={homeconfhide}>No, wait</button>
              </div>
            </div>
          }
          <div className="compare">
            <div>
              <img decoding='async' loading='lazy' fetchpriority='low' className={`crown-svg ${winner === 'You win' ? "show-crown" : "hide-crown"}`} width="34px" height="34px" src={`${import.meta.env.BASE_URL}crown.webp`} alt="crown" />
              <div className="circle" style={{ boxShadow: `0px 0px 49px -49px ${playerbg} inset` }}>{playerop && <img decoding='async' loading='lazy' fetchpriority='low' className={`${fade ? 'fade-out' : 'user-img'}`} style={{ filter: `drop-shadow(2px 2px 5px ${playerbg})` }} src={playerop} alt="" />}</div>
              {username ? <span>{username}</span> : <span>User</span>}
            </div>
            <div>
              <img decoding='async' loading='lazy' fetchpriority='low' className={`crown-svg ${winner === 'You lose' ? "show-crown" : "hide-crown"}`} width="34px" height="34px" src={`${import.meta.env.BASE_URL}crown.webp`} alt="crown" />
              {compop ?
                <div className="circle" style={{ boxShadow: `0px 0px 49px -49px ${compop.computerbg} inset` }}><img decoding='async' loading='lazy' fetchpriority='low' className={`${fade ? 'comp-out' : 'computer-img'}`} style={{ filter: `drop-shadow(2px 2px 5px ${compop?.computerbg})` }} src={compop.computerop} alt="" /></div> :
                loader ?
                  <div className="circle"><svg className='load-svg' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill='white'><path d="M2 11h5v2H2zm15 0h5v2h-5zm-6 6h2v5h-2zm0-15h2v5h-2zM4.222 5.636l1.414-1.414 3.536 3.536-1.414 1.414zm15.556 12.728-1.414 1.414-3.536-3.536 1.414-1.414zm-12.02-3.536 1.414 1.414-3.536 3.536-1.414-1.414zm7.07-7.071 3.536-3.535 1.414 1.415-3.536 3.535z"></path></svg></div> :
                  <div className="circle"></div>
              }
              <span>Computer</span>
            </div>
          </div>
          {overallWinner ?
            <div className="final-winner-box">
              <h1>{overallWinner}</h1>
              <div>
                <button onClick={HandleAgain}>Play again</button>
                <button onClick={gotohome}>Main Menu</button>
              </div>
            </div> :
            <div className='winner'>
              {winnertext && (
                <span className={`${fade ? 'w-fout' : 'w-fin'}`}>{winner}</span>
              )
              }
            </div>
          }

        </div>
        <div className="box3">
          <button disabled={disablebtn} onClick={() => { handleoption(0) }} className="option1"><img width='49px' height='49px' loading='lazy' decoding='async' src={optionsarray[0]} alt="hand" /></button>
          <button disabled={disablebtn} onClick={() => { handleoption(1) }} className="option2"><img width='49px' height='49px' loading='lazy' decoding='async' src={optionsarray[1]} alt="scissor" /></button>
          <button disabled={disablebtn} onClick={() => { handleoption(2) }} className="option3"><img width='55px' height='55px' loading='lazy' decoding='async' src={optionsarray[2]} alt="rock" /></button>
        </div>
      </div>
    </div>
  )
}

export default Rps
