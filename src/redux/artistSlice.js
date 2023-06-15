import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    artData: [],
    pending: true,
    albData: [],
    loading: null,
    token: "",
    fetchedArtist: [],
}
// export const fetchArtist = createAsyncThunk("user-updateUser", async ({ value, token }, _) => {
//     console.log('value', value)
//     console.log('token', token)
//     const response = await axios(
//         `https://api.spotify.com/v1/search?q=${value}&type=artist`,
//         { headers: { Authorization: `Bearer ${token}` } }
//     )
//     return response.data;
// });

const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        fetchingStart: (state) => {
            state.pending = true;
        },
        fetchingSuccess: (state, action) => {
            state.pending = false;
            state.artData = action.payload
        },
        fetchingFailure: (state) => {
            state.pending = false;
            state.error = true;
        },
        fetchAlbStart: (state) => {
            state.loading = true;
        },
        fetchAlbSuccess: (state, action) => {
            state.loading = false;
            state.albData = action.payload
        },
        fetchAlbFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
    // extraReducers(builder) {
    //     builder
    //         .addCase(fetchArtist.pending, (state) => {

    //         })
    //         .addCase(fetchArtist.fulfilled, (state, action) => {
    //             state.fetchedArtist = action.payload;
    //             state.pending = false;
    //         })
    //         .addCase(fetchArtist.rejected, (state) => {

    //         })
    // }

})
export const { setToken, fetchingStart, fetchingFailure, fetchingSuccess, fetchAlbStart, fetchAlbSuccess, fetchAlbFailure } = artistSlice.actions;

export default artistSlice.reducer