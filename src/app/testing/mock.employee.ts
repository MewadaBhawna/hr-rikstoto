import { Employee } from '../model/employee.model';

export const mockEmployees: Employee[] = [
  {
    id: {
      name: 'SSN',
      value: '405-88-3636',
    },
    name: {
      title: 'Miss',
      first: 'Jennie',
      last: 'Nichols',
    },
    email: 'jennie.nichols@example.com',
    location: {
      street: {
        number: 8929,
        name: 'Valwood Pkwy',
      },
      city: 'Billings',
      state: 'Michigan',
      country: 'United States',
      postcode: '63104',
    },
    dob: {
      date: '1992-03-08T15:13:16.688Z',
      age: 30,
    },
    registered: {
      date: '2007-07-09T05:51:59.390Z',
      age: 14,
    },
    phone: '(272) 790-0888',
    cell: '(489) 330-2385',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/75.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
    isFlagged: false,
  },
  {
    id: {
      name: 'SSN-test',
      value: '405-88-3636',
    },
    name: {
      title: 'Miss',
      first: 'Jennie',
      last: 'Nichols',
    },
    email: 'jennie.nichols@example.com',
    location: {
      street: {
        number: 8929,
        name: 'Valwood Pkwy',
      },
      city: 'Billings',
      state: 'Michigan',
      country: 'United States',
      postcode: '63104',
    },
    dob: {
      date: '1992-03-08T15:13:16.688Z',
      age: 30,
    },
    registered: {
      date: '2007-07-09T05:51:59.390Z',
      age: 14,
    },
    phone: '(272) 790-0888',
    cell: '(489) 330-2385',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/75.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
    isFlagged: false,
  },
];
