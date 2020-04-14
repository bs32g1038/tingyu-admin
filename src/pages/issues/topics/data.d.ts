export interface TableListItem {
  id?: number;
  key?: number;
  category: string;
  title: string;
  user: string;
  content: string;
  replyCount: number;
  visitCount: number;
  updatedAt: Date;
  createdAt: Date;
  tags: any[];
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
