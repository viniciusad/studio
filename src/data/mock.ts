export interface Transaction {
  date: string;
  category: string;
  type: 'Entrada' | 'Saída';
  description: string;
  amount: number;
}

export const mockData: Transaction[] = [
  {
    date: '2024-01-01',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Mercado',
    amount: 150,
  },
  {
    date: '2024-01-05',
    category: 'Salário',
    type: 'Entrada',
    description: 'Pagamento',
    amount: 3000,
  },
  {
    date: '2024-01-10',
    category: 'Lazer',
    type: 'Saída',
    description: 'Cinema',
    amount: 80,
  },
  {
    date: '2024-01-15',
    category: 'Contas',
    type: 'Saída',
    description: 'Aluguel',
    amount: 1200,
  },
  {
    date: '2024-01-20',
    category: 'Salário',
    type: 'Entrada',
    description: 'Freelance',
    amount: 500,
  },
  {
    date: '2024-01-25',
    category: 'Transporte',
    type: 'Saída',
    description: 'Gasolina',
    amount: 200,
  },
  {
    date: '2024-01-30',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Restaurante',
    amount: 120,
  },
  {
    date: '2024-02-01',
    category: 'Salário',
    type: 'Entrada',
    description: 'Pagamento',
    amount: 3000,
  },
  {
    date: '2024-02-05',
    category: 'Lazer',
    type: 'Saída',
    description: 'Show',
    amount: 250,
  },
  {
    date: '2024-02-10',
    category: 'Contas',
    type: 'Saída',
    description: 'Condomínio',
    amount: 800,
  },
  {
    date: '2024-02-15',
    category: 'Salário',
    type: 'Entrada',
    description: 'Freelance',
    amount: 600,
  },
  {
    date: '2024-02-20',
    category: 'Transporte',
    type: 'Saída',
    description: 'Uber',
    amount: 100,
  },
  {
    date: '2024-02-25',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Mercado',
    amount: 180,
  },
  {
    date: '2024-03-01',
    category: 'Salário',
    type: 'Entrada',
    description: 'Pagamento',
    amount: 3000,
  },
  {
    date: '2024-03-05',
    category: 'Lazer',
    type: 'Saída',
    description: 'Viagem',
    amount: 1000,
  },
  {
    date: '2024-03-10',
    category: 'Contas',
    type: 'Saída',
    description: 'Internet',
    amount: 150,
  },
  {
    date: '2024-03-15',
    category: 'Salário',
    type: 'Entrada',
    description: 'Freelance',
    amount: 700,
  },
  {
    date: '2024-03-20',
    category: 'Transporte',
    type: 'Saída',
    description: 'Ônibus',
    amount: 50,
  },
  {
    date: '2024-03-25',
    category: 'Alimentação',
    type: 'Saída',
    description: 'Restaurante',
    amount: 150,
  },
];
