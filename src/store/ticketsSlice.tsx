import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchSearchIDThunk = createAsyncThunk<
  string,
  undefined,
  { rejectValue: number }
>('tickets/fetchSearchIDThunk', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<{ searchId: string }> = await axios.get(
      'https://aviasales-test-api.kata.academy/search',
    );

    return response.data.searchId;
  } catch (error) {
    return rejectWithValue(error.response.status as number);
  }
});

export const fetchTicketsThunk = createAsyncThunk<
  { tickets: ITicket[]; stop: boolean },
  string,
  { rejectValue: number }
>(
  'tickets/fetchTicketsThunk',
  async (searchID, { rejectWithValue, dispatch }) => {
    try {
      const response: AxiosResponse<{ tickets: ITicket[]; stop: boolean }> =
        await axios.get(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchID}`,
        );

      return response.data;
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(fetchTicketsThunk(searchID));
      }
      return rejectWithValue(error.response.status as number);
    }
  },
);

const initialState: ITicketsState = {
  error: null,
  loading: true,
  searchID: null,
  tickets: [],
  ticketsOnPage: 5,
} as ITicketsState;

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicketsOnPage: (state) => {
      state.ticketsOnPage += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTicketsThunk.fulfilled,
        (
          state: ITicketsState,
          action: PayloadAction<{ tickets: ITicket[]; stop: boolean }>,
        ) => {
          const { tickets: responseTickets, stop: responseLoading } =
            action.payload;

          state.tickets = [...state.tickets, ...responseTickets];
          state.loading = !responseLoading;
        },
      )
      .addCase(fetchTicketsThunk.rejected, (state: ITicketsState, action) => {
        if (action.payload !== 500) {
          state.loading = false;
          state.error =
            'Не удалось установить соединение с сервером при получении билетов';
        }
      })
      .addCase(
        fetchSearchIDThunk.fulfilled,
        (state: ITicketsState, action: PayloadAction<string>) => {
          state.searchID = action.payload;
        },
      )
      .addCase(fetchSearchIDThunk.rejected, (state: ITicketsState, action) => {
        if (action.payload !== 200) {
          state.error =
            'Не удалось установить соединение с сервером при получении Search ID';
          state.loading = false;
        }
      });
  },
});

export const { addTicketsOnPage } = ticketsSlice.actions;
export default ticketsSlice.reducer;