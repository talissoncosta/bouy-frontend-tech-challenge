import { Table, TableProps } from 'antd';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import { UserData } from 'services/users/interface';
import { useTableColumns } from '../../hooks/useTableColumns';

type UsersTableProps = {
  data: UserData[];
  loading: boolean;
  pageSize: number;
  onViewUser?: (user: UserData) => void;
  onEditUser?: (user: UserData) => void;
} & Omit<TableProps<UserData>, 'dataSource' | 'columns' | 'loading'>


export const UsersTable = ({
  data,
  loading,
  pageSize,
  onViewUser,
  onEditUser,
  ...props
}: UsersTableProps) => {
  const { formatMessage } = useIntl();
  const columns = useTableColumns({ loading, onViewUser, onEditUser });

  const pagination = useMemo(() => ({
    pageSize,
    showSizeChanger: false,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} users`,
  }), [pageSize]);

  return (
    <Table<UserData>
      dataSource={data}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      scroll={{ x: 800 }}
      aria-label={formatMessage({ id: "page.users.table.aria.label" })}
      {...props}
    />
  );
};
