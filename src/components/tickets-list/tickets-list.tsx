import React, { useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.tsx';
import {
  addTicketsOnPage,
  fetchSearchIDThunk,
  fetchTicketsThunk,
} from '../../store/ticketsSlice.tsx';

import TicketCard from '../tickets-card/tickets-card.module.tsx';

import  styles from './tickets.list.module.scss';

const TicketList: React.FC = () => {
  const { tickets, loading, ticketsOnPage, error } = useAppSelector(
    (state) => state.tickets,
  );

  const { filters } = useAppSelector((state) => state.filters);

  const { tabs } = useAppSelector((state) => state.tabs);

  const { searchID } = useAppSelector((state) => state.tickets);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) {
      if (searchID === null) {
        dispatch(fetchSearchIDThunk());
      } else {
        dispatch(fetchTicketsThunk(searchID));
      }
    }
  }, [dispatch, tickets, searchID, loading]);

  const filterTickets = () => {
    let filteredTickets = tickets.filter(
      (ticket: ITicket) =>
        (filters.without &&
          ticket.segments[0].stops.length === 0 &&
          ticket.segments[1].stops.length === 0) ||
        (filters.one &&
          ticket.segments[0].stops.length === 1 &&
          ticket.segments[1].stops.length === 1) ||
        (filters.two &&
          ticket.segments[0].stops.length === 2 &&
          ticket.segments[1].stops.length === 2) ||
        (filters.three &&
          ticket.segments[0].stops.length === 3 &&
          ticket.segments[1].stops.length === 3),
    );

    filteredTickets =
      tabs === 'faster'
        ? filteredTickets.sort(
            (a, b) =>
              a.segments[0].duration +
              a.segments[1].duration -
              (b.segments[0].duration + b.segments[1].duration),
          )
        : filteredTickets.sort((a, b) => a.price - b.price);

    return filteredTickets;
  };

  return (
    <>
      <ul className={styles['ticket-list']}>
        {filterTickets().length === 0 ? (
          <div className={styles.error}>
            {error === null
              ? 'Рейсов, подходящих под заданные фильтры, не найдено.'
              : error}
          </div>
        ) : (
          filterTickets().map((ticket, ticketIndex) => {
            if (ticketIndex < ticketsOnPage) {
              return (
                <li key={nanoid()} className={styles['ticket-list__item']}>
                  <TicketCard
                    price={ticket.price}
                    carrier={ticket.carrier}
                    segmentsThere={ticket.segments[0]}
                    segmentsBack={ticket.segments[1]}
                  />
                </li>
              );
            }

            return null;
          })
        )}
      </ul>
      {filterTickets().length === 0 ? null : (
        <button
          onClick={() => dispatch(addTicketsOnPage())}
          className={styles['ticket-list__button']}
          type='button'>
          Показать еще 5 билетов!
        </button>
      )}
    </>
  );
};

export default TicketList;