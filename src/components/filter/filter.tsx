import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { toggleFilter, toggleAllFilters, toggleAllFilter } from '../../store/filterSlice';

import './filter.scss'

export function Filter() {
  const dispatch = useAppDispatch()
  const {
    allFilters,
    filters,
    filters: { without, one, two, three },
  } = useAppSelector((state) => state.filters);

  useEffect(() => {
    const activeFilters = Object.keys(filters).reduce(
      (accumulator, stateKey) => {
        if (filters[stateKey as keyof typeof filters] === true) {
          accumulator += 1;
        }
        return accumulator;
      },
      0,
    );
    if (activeFilters < 4) {
      dispatch(toggleAllFilter(false));
    } else {
      dispatch(toggleAllFilter(true));
    }
  }, [dispatch, filters]);
  
  return (
    <div className="filter">
      <div className="filter-wrapper">
        <span className="filter-title">КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        <form action="" id="filter">
          <ul>
            <label htmlFor="filter-1" id="filter-label-0">
              <li className="first">
                <input
                  type="checkbox"
                  id="filter-1"
                  checked={allFilters}
                  onChange={() => dispatch(toggleAllFilters())}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-1" />
                <span>Все</span>
              </li>
            </label>
            <label htmlFor="filter-2" id="filter-label-1">
              <li>
                <input
                  type="checkbox"
                  id="filter-2"
                  checked={without}
                  onChange={() => dispatch(toggleFilter('without'))}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-2" />
                <span>Без пересадок</span>
              </li>
            </label>
            <label htmlFor="filter-3" id="filter-label-2">
              <li>
                <input
                  type="checkbox"
                  id="filter-3"
                  checked={one}
                  onChange={() => dispatch(toggleFilter('one'))}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-3" />
                <span>1 пересадка</span>
              </li>
            </label>
            <label htmlFor="filter-4" id="filter-label-3">
              <li>
                <input
                  type="checkbox"
                  id="filter-4"
                  checked={two}
                  onChange={() => dispatch(toggleFilter('two'))}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-4" />
                <span>2 пересадки</span>
              </li>
            </label>
            <label htmlFor="filter-5" id="filter-label-4">
              <li>
                <input
                  type="checkbox"
                  id="filter-5"
                  checked={three}
                  onChange={() => dispatch(toggleFilter('three'))}
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="filter-5" />
                <span>3 пересадки</span>
              </li>
            </label>
          </ul>
        </form>
      </div>
    </div>
  )
}