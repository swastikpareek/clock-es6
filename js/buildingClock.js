import {compose} from './libs/compose.js';
// const compose = (...fns) => (args) => fns.reduce((composed, fn) => fn(composed), args);
// get current CLock time
// Searlise clock
// update the clock time for AM PM version
// Add double digit

export var Clock = Clock || {};

Clock.oneSecond = () => 1000;
Clock.getCurrentTime = () => new Date();
Clock.clearScreen = () => console.clear();
Clock.log = (message) => {console.log(message); return message};
Clock.print = (message) => {document.querySelector('.clock-digital').innerHTML = message};
Clock.updateClock = (clock) => {
  document.querySelector('.clock-hour-tick').style.transform = `rotateZ(${(parseInt(clock.hours, 10) * 30) + ((parseInt(clock.mins, 10) * 6) / 12) - 90}deg)`;
  document.querySelector('.clock-min-tick').style.transform = `rotateZ(${(parseInt(clock.mins, 10) * 6) + ((parseInt(clock.secs, 10) * 6) / 60 ) - 90}deg)`;
  document.querySelector('.clock-secs-tick').style.transform = `rotateZ(${(parseInt(clock.secs, 10) * 6) - 90}deg)`;
  return clock;
};

Clock.searliseClock = (date) => ({hours: date.getHours(), mins: date.getMinutes(), secs: date.getSeconds()});
Clock.get12HrTime = (clock) => ({...clock, hours: clock.hours > 12 ? clock.hours - 12 : clock.hours});
Clock.setAMPM = (clock) => ({...clock, ampm: clock.hours > 12 ? 'PM': 'AM'});


// Higher order function 
// display the target fn with passed message.
Clock.display = target => time => target(time);
Clock.addDoubleDigit = key => clock => ({...clock, [key]: clock[key] < 10 ? '0' + clock[key] : clock[key] });

// Get functions for outputting time
Clock.getTimeString = format => clock => format.replace('hh', clock.hours).replace('mm', clock.mins).replace('ss', clock.secs).replace('tt', clock.ampm);

Clock.getDoubleDigitTime = compose(
    Clock.addDoubleDigit('hours'),
    Clock.addDoubleDigit('mins'),
    Clock.addDoubleDigit('secs')
  );

// Final Fn for start Clock ticking
Clock.start = () => setInterval( 
  compose(
    Clock.clearScreen,
    Clock.getCurrentTime,
    Clock.searliseClock,
    Clock.setAMPM,
    Clock.updateClock,
    Clock.get12HrTime,
    Clock.getDoubleDigitTime,
    Clock.getTimeString('hh : mm : ss tt'),
    Clock.display(Clock.print)
    ), 
  Clock.oneSecond());

export default Clock;
