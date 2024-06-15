import { SET_PAGE } from "./actions";
export default function reducer(state, action) {
    switch (action.type) {
        case SET_PAGE:
            return { ...state, page: action.page };
        default:
            return state;
    }
}