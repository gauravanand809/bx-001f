import axios from 'axios';
import { toast } from 'react-hot-toast'; // Updated to use react-hot-toast

export const fetchTickets = () => async (dispatch) => {
  try {
    dispatch({ type: 'TICKETS_FETCH_REQUEST' });

    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api/tickets`);

    dispatch({
      type: 'TICKETS_FETCH_SUCCESS',
      payload: data,
    });
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    dispatch({
      type: 'TICKETS_FETCH_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createTicket = (ticketData) => async (dispatch) => {
  try {
    dispatch({ type: 'TICKET_CREATE_REQUEST' });

    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api/tickets`, ticketData);

    dispatch({
      type: 'TICKET_CREATE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    dispatch({
      type: 'TICKET_CREATE_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};