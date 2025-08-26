import { Row, Col, Card } from "antd";
import { UserData } from "services/users/interface";
import { SearchInput } from "./components/SearchInput";
import { UsersTable } from "./components";

export interface UsersViewProps {
  filteredData: UserData[];
  isLoading: boolean;
  pageSize: number; 
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchPlaceholder?: string;
  onViewUser: (user: UserData) => void;
  onEditUser: (user: UserData) => void;
}

export const UsersView = ({
  filteredData,
  isLoading,
  pageSize,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search users...",
  onViewUser,
  onEditUser,
}: UsersViewProps) => (
  <Row justify="space-around" gutter={[0, 20]}>
    <Col span={22}>
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <SearchInput
              value={searchTerm}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
              aria-label="Search users by name or email"
            />
          </Col>
        </Row>
      </Card>
    </Col>

    <Col span={22}>
      <Card bodyStyle={{ padding: 0 }}>
        <UsersTable
          data={filteredData}
          loading={isLoading}
          pageSize={pageSize}
          onViewUser={onViewUser}
          onEditUser={onEditUser}
        />
      </Card>
    </Col>
  </Row>
);  
