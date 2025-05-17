import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [
    { id: 1, date: '2025-05-15', time: '10:30 AM', name: 'John Doe', criticality: 'High', type: 'Computer', status: 'Open' },
    { id: 2, date: '2025-05-14', time: '02:15 PM', name: 'Jane Smith', criticality: 'Critical', type: 'Other', status: 'Open' },
  ],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    closeTicket: (state, action) => {
      const ticketId = action.payload;
      const ticket = state.tickets.find((t) => t.id === ticketId);
      if (ticket) {
        ticket.status = 'Closed';
      }
    },
  },
});

export const { closeTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;