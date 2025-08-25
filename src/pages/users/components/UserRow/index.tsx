import { theme } from 'antd';
import { UserData } from 'services/users/interface';
import { UserAvatar } from '../UserAvatar';

interface UserRowProps {
  user: UserData;
  isLoading?: boolean;
}

export function UserRow({ user, isLoading = false }: UserRowProps) {
  const {
    token: { colorText, colorFillContent, borderRadius }
  } = theme.useToken();

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
      role="gridcell"
    >
      <UserAvatar user={user} />
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isLoading ? (
          <div 
            style={{
              backgroundColor: colorFillContent,
              borderRadius,
              height: '20px',
              width: '120px'
            }}
          />
        ) : (
          <div 
            style={{
              color: colorText,
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            {user.fullName}
          </div>
        )}
      </div>
    </div>
  );
}