import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import { Issue } from 'src/service/issues';

const columns: TableColumnsType<Issue> = [
  {
    title: 'Номер',
    dataIndex: 'number',
    sorter: {
      compare: (a, b) => a.number - b.number,
      multiple: 3,
    },
  },
  {
    title: 'Заголовок',
    dataIndex: 'title',
    sorter: {
      compare: (a, b) => a.title.localeCompare(b.title),
      multiple: 3,
    },
  },
  {
    title: 'Статус',
    dataIndex: 'state',
    sorter: {
      compare: (a, b) => a.state.localeCompare(b.state),
      multiple: 2,
    },
  },
  {
    title: 'Создана',
    dataIndex: 'created_at',
    sorter: {
      compare: (a, b) => a.created_at.localeCompare(b.created_at),
      multiple: 1,
    },
  },
  {
    title: 'Изменена',
    dataIndex: 'updated_at',
    sorter: {
      compare: (a, b) => a.updated_at.localeCompare(b.updated_at),
      multiple: 1,
    },
  },
];

const onChange: TableProps<Issue>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface IIssueTable {
  data: Issue[];
}

function IssuesTable({ data }: IIssueTable) {
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
}

export default IssuesTable;
