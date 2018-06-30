import { createStore, combineReducers, applyMiddleware } from "redux";

const token = (state = {}, action) => {
  switch (action.type) {
    case "setCreateToken": {
      state.token = action.payload
      break
    }
  }
  return state;
}

const eventState = {
  event: {
    name: "1",
    date: "date",
    tranferBank: ""
  },
  distanceEvent: {
    distanceName: "",
    distance: "1 km",
    price: 0.
  }
};
const credit = {
  nameCredit: {
    nameCredit: "",
    numberCredit: "1234 5678 1234 5678",
    expCredit: "00/0000",
    cvcCredit: "XXX"
  },
};
const user = {
  profile: {
    userid: "",
    password: "",
  },
  verify: {
    statusVerify: 0
  }
};

const profile = (state = user, action) => {
  switch (action.type) {
    case "setProfile": {
      state.profile = action.payload;
    }
    case "setAddress": {
      state.address = action.payload;
    }
    case "setHelp": {
      state.help = action.payload;
    }
    case "setVerify": {
      state.verify = action.payload
    }
  }
  return state;
};

const event = (state = eventState, action) => {
  switch (action.type) {
    case "addEvent": {
      state.event = action.payload;
      break;
    }

    case "addDistance": {
      state.distanceEvent = action.payload;
      break;
    }
    case "setTotal": {
      state.totalPrice = action.payload;
      break;
    }
    case "setTotalPromo": {
      state.totalPromo = action.payload
      break;
    }
    case "setTotalRegister": {
      state.totalRegister = action.payload;
      break;
    }
  }
  return state;
};

const shirtphoto = (state = {}, action) => {
  switch (action.type) {
    case "setPrice": {
      state.price = action.payload;
      break;
    }
    case "setSizeShirt": {
      state.size = action.payload;
      break;
    }
    case "setImageShirt": {
      state.shirt = action.payload;
      break;
    }
    default:
  }
  return state;
};
const photoplus = (
  state = {
    title: "Photo Plus Service",
    pricePhoto: 100
  },
  action
) => {
  switch (action.type) {
    case "onPhotoPlus":
      state = {
        ...state,
        title: action.payload,
        pricePhoto: action.payload
      };
      break;
    default:
  }
  return state;
};

const creditcard = (state = credit, action) => {
  switch (action.type) {
    case "setCredit": {
      state.nameCredit = action.payload;
      break;
    }
    case "setCreditPrice": {
      state.vat = action.payload;
      break;
    }
    case "setStatusPayment": {
      state.statusPayment = action.payload
    }
    case "setCharge": {
      state.charge = action.payload
    }
    default:
      break;
  }
  return state;
};
const choiceSend = (state = {}, action) => {
  switch (action.type) {
    case "setSendChoice": {
      state.choiceSend = action.payload;
      break;
    }
  }
  return state;
};
const address = (state = {}, action) => {
  switch (action.type) {
    case "setUser": {
      state.user = action.payload;
      break;
    }
  }
  return state;
};


const username = (state = {}, action) => {
  switch (action.type) {
    case "setUsername": {
      state.username = action.payload
      break;
    }
  }
  return state;
}
const userprofile = (state = {}, action) => {
  switch (action.type) {
    case "setUserProfile": {
      state.userprofile = action.payload
      break;
    }
  }
  return state;
}
const invoice = (state = {}, action) => {
  switch (action.type) {
    case "setInvoice": {
      state.invoice = action.payload
      break;
    }
  }
  return state;
}
const friend = {
  friendRegis: {},
  dataDis: {},
  friendEvent: {},
  shirtSize: {}

}
const friendlist = (state = friend, action) => {
  switch (action.type) {
    case "addFriend":
      return {
        ...state,
        profile: [...state.profile, action.payload]
      }
      break;
    case "addDistanceFriend":
      state.dataDis = action.payload
      break;
    case "addSize":
      state.shirtSize = action.payload
      break;
    case "addFriendInEvent": {
      state.friendEvent = action.payload
      break;
    }
    case "setFriendRegister": {
      state.friendRegis = action.payload
      break;
    }
    case "setTotalPrice": {
      state.friendTotalPrice = action.payload
      break;

    }
  }
  return state;
}
const network = (state = {}, action) => {
  switch (action.type) {
    case "setIP": {
      state.ip = action.payload
      break;
    }
    case "setLatitude": {
      state.lat = action.payload
      break;
    }
    case "setLongitude": {
      state.long = action.payload
      break;
    }
  }
  return state;
}

const promocode = (state = {}, action) => {
  switch (action.type) {
    case "setDisPrice": {
      state.disPrice = action.payload
      break;
    }
  }
  return state;
}


const myLogger = store => next => action => {
  console.log("Log Action", action);
  next(action);
};

const store = createStore(
  combineReducers({
    token,
    profile,
    event,
    shirtphoto,
    creditcard,
    photoplus,
    choiceSend,
    address,
    friendlist,
    username,
    userprofile,
    invoice,
    network,
    promocode
  }),
  {},
  applyMiddleware(myLogger)
);
store.subscribe(() => {
  console.log("Updata Store", store.getState());
});

export default store;
