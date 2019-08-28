import createStore from "unistore";

export const store = createStore({
  host: "http://localhost:8888/",
  // cart: 0,
  category: [],
  product: [],
  cart: {},
  cartTotalPrice: 0,
  logged_in: "",
  user_token: "",
  // cartTotalProduct: 0,
  name: "",
  address: "",
  phone_number: "",
  email: "",
  sex: "",
  province: "",
  city: "",
  foto: "",
  postcode: ""
});

export const actions = store => ({
  setCart: (state, baru) => {
    store.setState({ cart: baru });
  },
  setCategory: (state, baru) => {
    store.setState({ category: baru });
  },
  setProduct: (state, baru) => {
    store.setState({ product: baru });
  },
  setCartList: (state, baru) => {
    store.setState({ cartList: baru });
  },
  setCartTotalPrice: (state, baru) => {
    store.setState({ cartTotalPrice: baru });
  },
  setLoggedIn: (state, baru) => {
    store.setState({ logged_in: baru })
  },
  setUserToken: (state, baru) => {
    store.setState({ user_token: baru })
  },
  setCartTotalProduct: (state, baru) => {
    store.setState({ cartTotalProduct: baru })
  },
  setUserFullName: (state, baru) => {
    store.setState({ name: baru })
  },
  setUserAddress: (state, baru) => {
    store.setState({ address: baru })
  },
  setSex: (state, baru) => {
    store.setState({ sex: baru })
  },
  setEmail: (state, baru) => {
    store.setState({ email: baru })
  },
  setPhoneNumber: (state, baru) => {
    store.setState({ phone_number: baru })
  },
  setUsername: (state, baru) => {
    store.setState({ name: baru })
  },
  setProvince: (state, baru) => {
    store.setState({ province: baru })
  },
  setCity: (state, baru) => {
    store.setState({ city: baru })
  },
  setFoto: (state, baru) => {
    store.setState({ foto: baru })
  },
  setPostcode: (state, baru) => {
    store.setState({ postcode: baru })
  }
});
