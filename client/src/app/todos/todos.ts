export interface Todos {
  _id: string;
  owner: string;
  status: TodosStatus;
  body: string;
  category: string;
}

export type TodosStatus = 'complete' | 'incomplete';
