import { Table } from 'antd';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { UserData } from 'services/users/interface';
import { UserRow } from '../UserRow';
import { UserActions } from '../UserActions';

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
  
  const columns = useMemo(() => [
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
        <UserActions
          user={record}
          onViewUser={onViewUser}
          onEditUser={onEditUser}
        />
      ),
    },
  ], [formatMessage, loading, onViewUser, onEditUser]);

  return (
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
  );
}