import { Table, Button, theme } from 'antd';
import { useIntl } from 'react-intl';
import { UserData } from 'services/users/interface';
import { UserRow } from '../UserRow';

interface UsersTableProps {
  data: UserData[];
  loading: boolean;
  pageSize: number;
  onViewUser?: (user: UserData) => void;
  onEditUser?: (user: UserData) => void;
}


export function UsersTable({ 
  data, 
  loading, 
  pageSize,
  onViewUser,
  onEditUser 
}: UsersTableProps) {
  const { formatMessage } = useIntl();
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadowSecondary }
  } = theme.useToken();
  const columns = [
    {
      title: formatMessage({ id: "page.users.table.columns.id" }),
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: formatMessage({ id: "page.users.table.columns.user" }),
      key: "user",
      render: (_: any, record: UserData) => (
        <UserRow user={record} isLoading={loading} />
      ),
    },
    {
      title: formatMessage({ id: "page.users.table.columns.firstName" }),
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: formatMessage({ id: "page.users.table.columns.lastName" }),
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: formatMessage({ id: "page.users.table.columns.email" }),
      dataIndex: "email",
      key: "email",
      sorter: (a: UserData, b: UserData) => a.email.localeCompare(b.email),
      showSorterTooltip: { title: formatMessage({ id: "page.users.table.sort.email.tooltip" }) },
    },
    {
      title: formatMessage({ id: "page.users.table.columns.actions" }),
      key: "actions",
      width: 120,
      render: (_: any, record: UserData) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="link"
            size="small"
            onClick={() => onViewUser?.(record)}
            aria-label={formatMessage({ id: "page.users.table.actions.view.aria" }, { name: record.fullName })}
          >
            {formatMessage({ id: "page.users.table.actions.view" })}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => onEditUser?.(record)}
            aria-label={formatMessage({ id: "page.users.table.actions.edit.aria" }, { name: record.fullName })}
          >
            {formatMessage({ id: "page.users.table.actions.edit" })}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ 
      backgroundColor: colorBgContainer, 
      borderRadius: borderRadiusLG,
      overflow: 'hidden',
      boxShadow: boxShadowSecondary
    }}>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} users`,
        }}
        scroll={{ x: 800 }}
        aria-label={formatMessage({ id: "page.users.table.aria.label" })}
      />
    </div>
  );
}