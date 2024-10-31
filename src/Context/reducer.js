export const reducer = (state, action) => {
  // get data start
  if (action.type == "data") {
    const featureProduct = action.payload.filter((el) => {
      return el.feature == true;
    });
    return {
      ...state,
      FoodBank: action.payload,
      filtterFood: action.payload,
      featureFood: featureProduct,
    };
  }
  // get data end

  //   add to wish
  if (action.type == "addToWish") {
    const loveArray = state.love.find((el) => el == action.payload);

    const wishRemove = state.favouriteFood.find(
      (el) => el.id == action.payload
    );

    if (wishRemove || loveArray) {
      return {
        ...state,
        love: state.love.filter((el) => el !== action.payload),
        favouriteFood: state.favouriteFood.filter(
          (el) => el.id !== action.payload
        ),
      };
    } else {
      const fv = state.filtterFood.filter((el) => {
        if (el.id == action.payload) {
          return el;
        }
      });

      return {
        ...state,
        favouriteFood: [...state.favouriteFood, fv[0]],
        love: [...state.love, action.payload],
      };
    }
  }

  if (action.type == "category") {
    // category start
    return {
      ...state,
      FoodBank: state.filtterFood.filter((el) => {
        if (action.payload.toLowerCase() === "All".toLowerCase()) {
          return el;
        }
        if (el.category.toLowerCase() === action.payload.toLowerCase()) {
          return el;
        }
      }),
    };
  }

  // category end

  // popUp start
  if (action.type == "popUp") {
    return {
      ...state,
      popUp: true,
      popUpCart: state.filtterFood.filter((el) => {
        if (el.id === action.payload) {
          return el;
        }
      }),
    };
  }
  // popUp end

  // addToCart start
  if (action.type == "addToCart") {
    const { id, quantity, Variation } = action.payload;

    const add = state.filtterFood.filter((el) => {
      if (el.id === id) {
        return el;
      }
    });

    let obj = {
      id: add[0].id,
      name: add[0].name,
      description: add[0].description,
      price: add[0].price,
      image: add[0].image,
      category: add[0].category,
      thums: add[0].thums,
      feature: add[0].feature,
      quantity: quantity,
      Variation: Variation,
    };


    const match = state.cart.find((elm) => elm.id == id);

    if (match) {
      let updateQuntity = state.cart.map((el) => {
        if (el.id == id) {
          const nweQuantity = el.quantity + quantity;
          return {
            ...el,
            quantity: nweQuantity,
          };
        } else {
          return el;
        }
      });

      return {
        ...state,
        cart: updateQuntity,
        popUp: false,
      };
    }

    else {

      return {
        ...state,
        popUp: false,
        cart: [...state.cart, obj],
      };
    }

  }
  // addToCart end


  // Close start
  if (action.type == "Close") {
    return {
      ...state,
      popUp: false,
    };
  }
  // Close end

  // removeCart start
  if (action.type == "removeCart") {
    return {
      ...state,
      cart: state.cart.filter((el) => el.id !== action.payload),
    };
  }
  // removeCart end

  // CartDropDown start 
  if (action.type == "CartDropDown") {
    return {
      ...state,
      ddCart: true
    }
  }
  // CartDropDown end 

  // totalQuantity start 
  if (action.type == "totalQuantity") {
    return {
      ...state,
      totalQuantity: state.cart.reduce((ac, it) => {
        const { quantity } = it

        return ac += quantity
      }, 0)
    }
  }
  // totalQuantity end 


  // CloseCart start 
  if (action.type == "CloseCart") {
    return {
      ...state,
      ddCart: false
    }
  }
  // CloseCart end 


  // totalQuantity start 
  if (action.type == "totalFv") {

    return {
      ...state,
      totalFv: state.love.length,
    }
  }
  // totalQuantity end 


  // handleCheckout start 
  if (action.type == "handleCheckout") {
    const { id, quantity, Variation } = action.payload;

    const add = state.filtterFood.filter((el) => {
      if (el.id === id) {
        return el;
      }
    });

    let obj = {
      id: add[0].id,
      name: add[0].name,
      description: add[0].description,
      price: add[0].price,
      image: add[0].image,
      category: add[0].category,
      thums: add[0].thums,
      feature: add[0].feature,
      quantity: quantity,
      Variation: Variation,
    };

    return {
      ...state,
      checkOut: obj,
      ddCart: false,
    }
  }
  // handleCheckout end 

  // search filter product start
  if (action.type == "searchFilter") {
    return {
      ...state,
      FoodBank: state.filtterFood.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      ),
    };
  }
  // search filter product end

  //addBlogDetails part start
  if (action.type == "addBlogDetails") {
    return {
      ...state,
      Blog_D: state.filtterFood.filter((item) => item.id == action.payload),
    };
  }
  //addBlogDetails part end

  // addToToast part start
  if (action.type == "addToToast") {
    return {
      ...state,
      toast: true,
      toastMessage: action.payload
    };
  }
  // addToToast part end

  // removeToast part start 
  if (action.type == "removeToast") {
    return {
      ...state,
      toast: false
    }
  }
  // removeToast part end 


  // revFnc part start 
  if (action.type == "revFnc") {
    return {
      ...state,
      reviewArr: [...state.reviewArr, action.payload]
    }
  }
  // revFnc part end 

  return state;
}