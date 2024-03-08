import { AUTHOR_FILTER_TRACK, GENRE_FILTER_TRACK, RELEASE_DATE_FILTER_TRACK } from "../actions/types/filter";

const initialState = {
    genreFilter: [],
    authorFilter: [],
    releaseDateOrder:  "По умолчанию",
};

export function filterReducer(state = initialState, action) {
    switch(action.type){
        case GENRE_FILTER_TRACK: {
            const {genreValue} = action.payload;
            let newArray  = [];

            if(state.genreFilter.indexOf(genreValue) === -1){
                newArray = [...state.genreFilter, genreValue];
            } else {
                newArray = state.genreFilter.filter((item) => item !== genreValue);
            }

            return {
                genreFilter: newArray,
                authorFilter: state.authorFilter,
                releaseDateOrder: state.releaseDateOrder,
            };
        }
        case AUTHOR_FILTER_TRACK: {
            const {authorValue} = action.payload;
            let newArray  = [];

            if(state.authorFilter.indexOf(authorValue) === -1){
                newArray = [...state.authorFilter, authorValue];
            } else {
                newArray = state.authorFilter.filter((item) => item !== authorValue);
            }


            return {
                genreFilter: state.genreFilter,
                authorFilter: newArray,
                releaseDateOrder:state.releaseDateOrder,
            };
        }
        case RELEASE_DATE_FILTER_TRACK: {
            const {releaseDateOrder} = action.payload;

            return {
                genreFilter: state.genreFilter,
                authorFilter: state.authorFilter,
                releaseDateOrder: releaseDateOrder,
            };
        }
        
        default: 
            return state;
    };
};