import axios from 'axios';
import { setAllPossibleGear } from '../../reducers/gearSlice';


export const preloadGear = () => async (dispatch) => {
  try {
    const { data: gear } = await axios.get('/api/gear/');
    console.log(gear) // gets array of gear objects
    const AllGear = {};
    gear.forEach(sword => AllGear[sword.id] = sword) // stores gear items keyed to the item id
    dispatch(setAllPossibleGear(AllGear))  
    console.log("all possible gear loaded up to state")
} catch (error) {
    console.error(error);
}
};