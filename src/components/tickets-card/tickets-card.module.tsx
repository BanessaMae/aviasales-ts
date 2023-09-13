import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import styles from './ticjets-card.module.scss';

dayjs.extend(duration); // Подключаем плагин для dayjs

const TicketCard: React.FC<TicketProps> = ({
  price,
  carrier,
  segmentsThere,
  segmentsBack,
}: TicketProps) => {
  const airLineLogo = `https://pics.avs.io/110/36/${carrier}.png`;

  return (
    <>
      <span className={styles['item__price']}>{`${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Р`}</span>
      <img
        className={styles['item__logo']}
        src={airLineLogo}
        alt='Логотип компании'
      />
      <span className={`${styles['item__title']} ${styles['title1-column1']}`}>
        {segmentsThere.origin} – {segmentsThere.destination}
      </span>
      <span className={`${styles['item__title']} ${styles['title3-column2']}`}>
        В пути
      </span>
      <span className={`${styles['item__title']} ${styles['title5-column3']}`}>
        {segmentsThere.stops.length === 0
          ? 'Без пересадок'
          : segmentsThere.stops.length === 1
          ? '1 пересадка'
          : `${segmentsThere.stops.length} пересадки`}
      </span>
      <span className={`${styles['item__title']} ${styles['title2-column1']}`}>
        {segmentsBack.origin} – {segmentsBack.destination}
      </span>
      <span className={`${styles['item__title']} ${styles['title4-column2']}`}>
        В пути
      </span>
      <span className={`${styles['item__title']} ${styles['title6-column3']}`}>
        {segmentsBack.stops.length === 0
          ? 'Без пересадок'
          : segmentsBack.stops.length === 1
          ? '1 пересадка'
          : `${segmentsBack.stops.length} пересадки`}
      </span>
      <span
        className={`${styles['item__description']} ${styles['description1-column1']}`}>
        {dayjs(segmentsThere.date).format('HH:mm')} –{' '}
        {dayjs(segmentsThere.date)
          .add(segmentsThere.duration, 'm')
          .format('HH:mm')}
      </span>
      <span
        className={`${styles['item__description']} ${styles['description3-column2']}`}>
        {dayjs.duration(segmentsThere.duration, 'm').format('H[ч] m[м]')}
      </span>
      <span
        className={`${styles['item__description']} ${styles['description5-column3']}`}>
        {segmentsThere.stops.join(', ')}
      </span>
      <span
        className={`${styles['item__description']} ${styles['description2-column1']}`}>
        {dayjs(segmentsBack.date).format('HH:mm')} –{' '}
        {dayjs(segmentsBack.date)
          .add(segmentsBack.duration, 'm')
          .format('HH:mm')}
      </span>
      <span
        className={`${styles['item__description']} ${styles['description4-column2']}`}>
        {dayjs.duration(segmentsBack.duration, 'm').format('H[ч] m[м]')}
      </span>
      <span
        className={`${styles['item__description']} ${styles['description6-column3']}`}>
        {segmentsBack.stops.join(', ')}
      </span>
    </>
  );
};

export default TicketCard;