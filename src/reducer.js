export const initialState = {
    basket: [],
};
// selector
export const getBasketTotal = (basket) => 
    basket.reduce((amount,item) => item.price + amount, 0);


const reducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket,action.item]
            };

        case 'REMOVE_FROM_BASKET':
            // findIndex array method takes function that work to find the 1st match and remove product and return true
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id=== action.id
            );
            let newBasket = [...state.basket]
           
            if(index>=0){
                //In this case, newBasket.splice(index,1) removes one element from the newBasket array at the index specified by the index variable. 
                newBasket.splice(index,1);
            }else{
                console.warn(
                    'Cant remove product'
                )
            }

            return {
                ...state,
                basket: newBasket
            }
            
        default:
            return state;
    }  
}

export default reducer;
