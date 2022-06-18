import { genKey } from '../../components/randGen.js';

export const GenUserID = () => {
    var notValid = true; 
    var userID = ''; 
    while (notValid) {
        userID = genKey(10) 

        if (localStorage.getItem("userID") !== userID) {
            notValid = false; 
        }
    }
    return userID; 
}