import Chef from "./Crew/Chef";
import Electrician from "./Crew/Electrician";
import Mechanic from "./Crew/Mechanic";
import Navigator from "./Crew/Navigator";
import Radio_Tech from "./Crew/RadioTech";

function randomDialogue(state) {
    let selectedCrew = Math.floor(Math.random() * (5));

    // switch(selectedCrew) {
    //     case 1:
    //         return Chef(state, true);
    //     case 2:
    //         return Electrician(state, true);
    //     case 3:
    //         return Mechanic(state, true);
    //     case 4:
    //         return Navigator(state, true);
    //     case 0:
    //         return Radio_Tech(state, true);
    //     default:
    //         return;
    // }

}

export default randomDialogue;