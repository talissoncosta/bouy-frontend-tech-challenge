import { Avatar } from 'antd';
import { UserData } from 'services/users/interface';

interface UserAvatarProps {
  user: UserData;
  size?: number;
  className?: string;
}

export function UserAvatar({ user, size = 40, className = '' }: UserAvatarProps) {
  return (
    <Avatar
      src={user.image}
      alt={`${user.firstName} ${user.lastName}`}
      size={size}
      className={className}
    >
      {user.firstName[0]}{user.lastName[0]}
    </Avatar>
  );
}