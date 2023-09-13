// / <reference types="vite/client" />

interface IFiltersState {
    allFilters: boolean;
    filters: {
      without: boolean;
      one: boolean;
      two: boolean;
      three: boolean;
    };
  }
  
  interface ITabsState {
    tabs: 'cheaper' | 'faster' | 'optimal';
  }
  
  interface ITicket {
    // Цена в рублях
    price: number;
    // Код авиакомпании (iata)
    carrier: string;
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [
      {
        // Код города (iata)
        origin: string;
        // Код города (iata)
        destination: string;
        // Дата и время вылета туда
        date: string;
        // Массив кодов (iata) городов с пересадками
        stops: string[];
        // Общее время перелёта в минутах
        duration: number;
      },
      {
        // Код города (iata)
        origin: string;
        // Код города (iata)
        destination: string;
        // Дата и время вылета обратно
        date: string;
        // Массив кодов (iata) городов с пересадками
        stops: string[];
        // Общее время перелёта в минутах
        duration: number;
      },
    ];
  }
  
  interface ITicketsState {
    error: string | null;
    loading: boolean;
    searchID: string | null;
    tickets: ITicket[];
    ticketsOnPage: number;
  }
  
  interface TicketProps {
    price: number;
    carrier: string;
    segmentsThere: {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    };
    segmentsBack: {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    };
  }