import axios from 'axios';
import { setAllPossibleGear } from '../../reducers/gearSlice';
import { setCharacterClasses, removeCharacterClasses } from '../../reducers/characterSelectionSlice';


export const preloadGear = () => async (dispatch) => {
  try {
    const { data: gear } = await axios.get('/api/gear/');
    console.log(gear) // gets array of gear objects
    const AllGear = {};
    gear.forEach(sword => AllGear[sword.id] = sword) // stores gear items keyed to the item id
    dispatch(setAllPossibleGear(AllGear))  
    console.log("all possible gear loaded up to state")
    console.log(AllGear)
} catch (error) {
    console.error(error);
}
};


export const preloadCharacterClasses = () => async (dispatch) => {
  try {
    const { data: classes } = await axios.get('/api/characterclass/');
    console.log(classes) 
    const allClasses = {};
    classes.forEach(archetype => allClasses[archetype.id] = archetype) // stores classes keyed to their item id
    dispatch(setCharacterClasses(allClasses)) 
    console.log("all possible character classes loaded up to state")
    console.log(allClasses)
} catch (error) {
    console.error(error);
}
};