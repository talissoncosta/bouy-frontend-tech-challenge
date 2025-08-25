import { UserData } from 'services/users/interface';
import { UserAvatar } from '../UserAvatar';
import { theme } from 'antd';
import styles from './styles.module.css';

interface UserRowProps {
  user: UserData;
  isLoading?: boolean;
}

export function UserRow({ user, isLoading = false }: UserRowProps) {
  const {
    token: { colorText }
  } = theme.useToken();

  return (
    <div className={styles.userRow} role="gridcell">
      <UserAvatar user={user} />
      <div className={styles.userInfo}>
        {isLoading ? (
          <div className={styles.userNameLoading} />
        ) : (
          <div className={styles.userName} style={{ color: colorText }}>
            {user.fullName}
          </div>
        )}
      </div>
    </div>
  );
}