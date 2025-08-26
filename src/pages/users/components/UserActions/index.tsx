import { Button } from 'antd';
import { useIntl } from 'react-intl';
import styles from './styles.module.css';

interface UserActionsProps {
  onViewUser?: () => void;
  onEditUser?: () => void;
}

export const UserActions = ({ onViewUser, onEditUser }: UserActionsProps) => {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.actionButtons}>
      <Button
        type="link"
        size="small"
        onClick={onViewUser}
      >
        {formatMessage({ id: "page.users.table.actions.view" })}
      </Button>
      <Button
        type="link"
        size="small"
        onClick={onEditUser}
      >
        {formatMessage({ id: "page.users.table.actions.edit" })}
      </Button>
    </div>
  );
}
