import { AUTHOR_FILTER_TRACK, GENRE_FILTER_TRACK, RELEASE_DATE_FILTER_TRACK } from "../types/filter";

export const genreFilterTrack = (filterValue) => ({
    type: GENRE_FILTER_TRACK,
    payload: {genreValue: filterValue},
 });
 
 export const authorFilterTrack = (filterValue) => ({
    type: AUTHOR_FILTER_TRACK,
    payload: {authorValue: filterValue},
 });

 export const releaseDateFilterTrack = (filterValue) => ({
   type: RELEASE_DATE_FILTER_TRACK,
   payload: {releaseDateOrder: filterValue},
 }); 
 