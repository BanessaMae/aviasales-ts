import React, { useEffect, useState } from 'react'
import { Alert, Space } from 'antd';

import './tickets.list.scss'
import { TicketCard } from '../tickets-card/tickets-card'
import { Loading } from '../loading/loading'
import { getData, allTickets, notAllTickets } from '../../store/ticketsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { dataObj } from '../../store/ticketsSlice';

export function TicketsList() {
  const [viewTickets, setViewTickets] = useState<dataObj[] | []>([])
  const [viewCounter, setViewCounter] = useState<number>(5)
  const [fetchCounter, setFetchCounter] = useState<number>(0)
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.tickets)
  const filterState = useAppSelector((state) => state.filter.filter)
  const tabsState = useAppSelector((state) => state.tabs.tabs)

  useEffect(() => {
    async function get() {
      const active = tabsState.findIndex((item) => item === true)
      await dispatch(getData(fetchCounter))
      await dispatch(allTickets([filterState, active]))
    }
    if (fetchCounter <= 3 && error && status === 'loading') {
      setFetchCounter(fetchCounter + 1)
      get()
    }
    if (!error && status === 'loading') {
      setFetchCounter(fetchCounter + 1)
      get()
    }

    /* eslint-disable-next-line */
  }, [dispatch, error])

  useEffect(() => {
    setViewTickets([...data.tickets].slice(0, viewCounter))
  }, [data, viewCounter])

  useEffect(() => {
    const active = tabsState.findIndex((item) => item === true)
    if (filterState[0]) {
      dispatch(allTickets([filterState, active]))
    } else {
      dispatch(notAllTickets([filterState, active]))
    }
  }, [filterState, tabsState, dispatch])

  function partTickets() {
    if (status === 'loading') {
      return <Loading />
    }
    if (status === 'ok') {
      if (viewTickets.length !== 0) {
        return viewTickets.map((item: dataObj) => (
          <TicketCard
            data={item}
            key={`avia-${Math.random().toString(36).substring(2).toString()}${Math.random()
              .toString(36)
              .substring(2)
              .toString()}`}
          />
        ))
      }
      return <Space direction="vertical" style={{ width: '100%', }}>
      <Alert  type="info" message="Рейсов, подходящих под заданные фильтры, не найдено" showIcon  />
      </Space>
    }
    if (status === 'rejected') {
      return <Space direction="vertical" style={{ width: '100%', }}>
        <Alert type="error"  message={`${error.toString().slice(0, -1)}Превышено количество попыток подключения` }showIcon  />
    </Space>
    }
    return null
  }
  function showBtn() {
    if (status === 'ok' && viewTickets.length !== 0) {
      return (
        <li className="tickets-load-btn-wrapper">
          <button
            type="button"
            className="tickets-load-btn"
            onClick={() => {
              setViewCounter((s) => s + 5)
            }}
          >
            Загрузить еще 5 билетов!
          </button>
        </li>
      )
    }
    return null
  }

  return (
    <ul className="tickets-list">
      {partTickets()}
      {showBtn()}
    </ul>
  )
}