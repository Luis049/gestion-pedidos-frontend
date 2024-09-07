interface Orders {
  id: string;
  ref: string;
  date: string;
  client: string;
  file: string;
  machine: string;
  tecnico: string;
  state: string;
}

export const ordersData: Orders[] = [
  {
    id: '1',
    ref: '54893',
    date: '03 Sep 2024, 8:28 AM',
    client: 'Juan Pérez',
    file: 'archivo.png',
    machine: '1',
    tecnico: '1',
    state: '1',
  },
  {
    id: '2',
    ref: '54894',
    date: '03 Sep 2024, 9:48 AM',
    client: 'Yeison Hernandez',
    file: 'archivo.png',
    machine: '1',
    tecnico: '2',
    state: '3',
  },
  {
    id: '3',
    ref: '54895',
    date: '03 Sep 2024, 10:28 AM',
    client: 'Yan Gomez',
    file: 'archivo.png',
    machine: '2',
    tecnico: '3',
    state: '1',
  },
  {
    id: '4',
    ref: '54896',
    date: '03 Sep 2024, 11:48 AM',
    client: 'Juan Pérez',
    file: 'archivo.png',
    machine: '2',
    tecnico: '1',
    state: '2',
  },
]
