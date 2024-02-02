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
  onDoubleRowClick?: (issueNumber: number) => void;
}

function IssuesTable({ data, onDoubleRowClick = () => {} }: IIssueTable) {
  const handleRowDoubleClick = (
    record: Issue,
    index: number | undefined,
    event: React.MouseEvent
  ) => {
    // console.log('Double clicked on row:', record, index, event);
    onDoubleRowClick(record.number);
  };

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={data}
      onChange={onChange}
      rowKey="id"
      onRow={(record, rowIndex) => {
        return {
          // onClick: (event) => {}, // click row
          onDoubleClick: (event) =>
            handleRowDoubleClick(record, rowIndex, event), // double click row
          // onContextMenu: (event) => {}, // right button click row
          // onMouseEnter: (event) => {}, // mouse enter row
          // onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
    />
  );
}

IssuesTable.defaultProps = {
  onDoubleRowClick: (issueNumber: number) => {},
};
export default IssuesTable;
