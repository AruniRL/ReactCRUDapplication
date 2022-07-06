const initialState = [
  { id: 0, title: "Test1", discription: "test", status: "yes" , date: "2022-07-05"},
  { id: 1, title: "Test2", discription: "test3", status: "no" , date: "2022-07-05"},
];

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ title: null, discription: null, status: null, date: null}];
      return state;
    default:
      return state;
  }
};
