import { Avatar } from 'antd';
import { ComponentProps } from 'react';
import { UserData } from 'services/users/interface';

type UserAvatarProps = {
  user: UserData;
  size?: number;
  className?: string;
} & ComponentProps<typeof Avatar>

export const UserAvatar = ({ user, size = 40, className = '', ...props }: UserAvatarProps) => (
  <Avatar
    src={user.image}
    alt={`${user.firstName} ${user.lastName}`}
    size={size}
    className={className}
    {...props}
  >
    {user.firstName[0]}{user.lastName[0]}
  </Avatar>
);
