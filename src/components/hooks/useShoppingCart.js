import {useDispatch} from "react-redux";
import {addItem, removeItem, updateItem} from "../../redux/reducer/cartSliceReducer";

export default function useShoppingCart({cartItem,quantity=1}){
    const dispatch = useDispatch()
    if (!cartItem && quantity !== -1) {

        dispatch(addItem({...cartItem, quantity}));
    } else if (cartItem) {
        if (quantity === 1) {
            dispatch(updateItem({id: cartItem.id, changes: {quantity: cartItem.quantity + 1}}));
        } else if (quantity === -1) {
            dispatch(updateItem({id: cartItem.id, changes: {quantity: cartItem.quantity - 1}}));
        }

    } else if(quantity===0) {
        dispatch(removeItem({id: cartItem.id}))
    }

}