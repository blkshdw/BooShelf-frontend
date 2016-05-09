import {
    TOGGLE_LEFT_PANEL
} from 'constants';

const initialState = {
    isExpandedLeftPanel: window.localStorage.getItem('isExpandedLeftPanel') ? window.localStorage.getItem('isExpandedLeftPanel') === 'true' : true
};

export default function(state = initialState, action) {

    const { type } = action;

    switch (type) {

    case TOGGLE_LEFT_PANEL:
    console.log(window.localStorage.getItem('isExpandedLeftPanel'));
        window.localStorage.setItem('isExpandedLeftPanel', !state.isExpandedLeftPanel);
        return {
            ...state,
            isExpandedLeftPanel: !state.isExpandedLeftPanel
        }
    default:
        return state;
    }
}
