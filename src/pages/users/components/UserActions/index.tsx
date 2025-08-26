import React from 'react';
import { Button } from 'antd';
import { useIntl } from 'react-intl';
import { UserData } from '../../../../services/users/interface';
import styles from './styles.module.css';

interface UserActionsProps {
  user: UserData;
  onViewUser?: (user: UserData) => void;
  onEditUser?: (user: UserData) => void;
}

export const UserActions = ({ user, onViewUser, onEditUser }: UserActionsProps) => {
  const { formatMessage } = useIntl();

  // Handle cases where fullName might be undefined
  const userName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';

  return (
    <div className={styles.actionButtons}>
      <Button
        type="link"
        size="small"
        onClick={() => onViewUser?.(user)}
        aria-label={formatMessage(
          { id: "page.users.table.actions.view.aria" }, 
          { name: userName }
        )}
      >
        {formatMessage({ id: "page.users.table.actions.view" })}
      </Button>
      <Button
        type="link"
        size="small"
        onClick={() => onEditUser?.(user)}
        aria-label={formatMessage(
          { id: "page.users.table.actions.edit.aria" }, 
          { name: userName }
        )}
      >
        {formatMessage({ id: "page.users.table.actions.edit" })}
      </Button>
    </div>
  );
}
