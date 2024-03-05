import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const musicApi = createApi ({ 
    reducerPath: 'musicApi', 
    tagTypes: ["TRACKS"],
    baseQuery: fetchBaseQuery({baseUrl:'https://skypro-music-api.skyeng.tech/catalog'}),
    endpoints: (builder) => ({
        getAllTracks: builder.query ({
            query: () => ({url:  '/track/all/'}),
            providesTags: ["TRACKS"]
        }),
        getFavouriteTracks: builder.query ({
            query: () => ({
                url:  '/track/favorite/all/',
                headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            
            }),
            transformResponse: (response) => {
                return response.map((track) => ({ ...track, isLike: true }));
              },
              providesTags: ["TRACKS"]
            }),
            
        
        
        addTrack: builder.mutation ({
         query:  (id) => ({
            url: `/track/${id}/favorite/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
                
            },
            method: 'POST'

        }),
        invalidatesTags: ["TRACKS"],
        }),
       
        deleteTrack: builder.mutation ({
            query:  (id) => ({
               url: `/track/${id}/favorite/`,
               headers: {
                   Authorization: `Bearer ${localStorage.getItem("access")}`
                   
               },
               method: 'DELETE'
   
           }),
           invalidatesTags: ["TRACKS"],
           }),

          viewSelectionsById: builder.query({
            query: ({ id }) => ({
              url: `/selection/${id}/`,
              method: "GET",
            }),
            transformResponse: (response) => {
              return response.items.map((track) => ({ ...track, isFavorite: true }));
            },
          }),
        }),
      });
      

export const { useGetAllTracksQuery, useGetFavouriteTracksQuery, useAddTrackMutation, useDeleteTrackMutation, useViewSelectionsByIdQuery, } = musicApi
export default musicApi.reducer
