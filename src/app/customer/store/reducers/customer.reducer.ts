const initialState = {
  customers: [
    {
      name: "Soumya",
      phone: "9238591744",
      address: "salipur, cuttack",
      membership: "Basic",
      id: 1
    }
  ],
  loaded: true,
  loading: false
};

export function customerReducer(state=initialState,action){
    switch(action.type){
        case "LOAD_CUSTOMERS":{
            return{
                ...state,
                loading:true,
                loaded:false
            };
        }
        default:{
            return state;
        }
    }
}