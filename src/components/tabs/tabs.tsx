import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import { toggleTabs } from '../../store/tabsSlice'

import styles from './tabs.module.scss';

export function Tabs() {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('cheaper')


  function changeValue(tab: 'cheaper' | 'faster' | 'optimal') {
    dispatch(toggleTabs(tab));
    setValue(tab);
  }

  return (
    <ul className={styles.tabs}>
      <li
        className={`${styles.tab} ${styles['left-tab']} ${
          value === 'cheaper' && styles['active-tab']
        }`}>
        <label className={styles.tab__label} htmlFor='left-tab'>
          <input
            id='left-tab'
            name='tab'
            checked={value === 'cheaper'}
            value='cheaper'
            type='radio'
            onChange={() => changeValue('cheaper')}
          />
          Самый дешевый
        </label>
      </li>
      <li
        className={`${styles.tab} ${styles['right-tab']} ${
          value === 'faster' && styles['active-tab']
        }`}>
        <label className={styles.tab__label} htmlFor='right-tab'>
          <input
            id='right-tab'
            name='tab'
            checked={value === 'faster'}
            value='faster'
            type='radio'
            onChange={() => changeValue('faster')}
          />
          Самый быстрый
        </label>
      </li>
      <li
        className={`${styles.tab} ${styles['left-tab2']} ${
          value === 'optimal' && styles['active-tab']
        }`}>
        <label className={styles.tab__label} htmlFor='left2-tab'>
          <input
            id='left-tab'
            name='tab'
            checked={value === 'optimal'}
            value='optimal'
            type='radio'
            onChange={() => changeValue('optimal')}
          />
          Оптимальный
        </label>
      </li>
    </ul>
  );
};