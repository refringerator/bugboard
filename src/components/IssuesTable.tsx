import { Table, ConfigProvider } from 'antd';
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
    _index: number | undefined,
    _event: React.MouseEvent
  ) => {
    // console.log('Double clicked on row:', record, index, event);
    onDoubleRowClick(record.number);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#17724c',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#5f9ea0',
        },

        components: {
          Table: { borderColor: '#000', headerSplitColor: '#000' },
        },
      }}
    >
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
        pagination={{ pageSize: 6 }}
      />
    </ConfigProvider>
  );
}

IssuesTable.defaultProps = {
  onDoubleRowClick: (_issueNumber: number) => {},
};
export default IssuesTable;
