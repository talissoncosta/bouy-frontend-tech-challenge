import { useIntl } from 'react-intl';
import { ColumnType } from 'antd/es/table';
import { UserData } from 'services/users/interface';
import { UserRow } from '../components/UserRow';
import { UserActions } from '../components/UserActions';

interface UseTableColumnsProps {
  loading: boolean;
  onViewUser?: (user: UserData) => void;
  onEditUser?: (user: UserData) => void;
}

export const useTableColumns = ({ loading, onViewUser, onEditUser }: UseTableColumnsProps): ColumnType<UserData>[] => {
  const { formatMessage } = useIntl();

  return [
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
      render: (_: unknown, record: UserData) => (
        <UserActions
          onViewUser={() => onViewUser?.(record)}
          onEditUser={() => onEditUser?.(record)}
        />
      ),
    },
  ]
};
