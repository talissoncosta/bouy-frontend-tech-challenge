import { Row, Col, Typography } from "antd";
import { useIntl } from "react-intl";
import { useUsers } from "hooks";
import { useState, useMemo, useCallback } from "react";
import { UserData } from "services/users/interface";
import { useDebounce } from "hooks";
import { SearchInput } from "./components/SearchInput";
import { UsersTable } from "./components/UsersTable";
import styles from "./styles.module.css";

const PAGE_SIZE = 13;
const { Title } = Typography;


export function Users() {
    const { formatMessage } = useIntl();
    const { data, isLoading } = useUsers();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Client-side filtering logic with debounced search
    const filteredData = useMemo(() => {
        if (!data?.list) return [];
        
        if (!debouncedSearchTerm) return data.list;
        
        const searchLower = debouncedSearchTerm.toLowerCase();
        return data.list.filter((user: UserData) => {
            return user.firstName.toLowerCase().includes(searchLower) ||
                   user.lastName.toLowerCase().includes(searchLower) ||
                   user.email.toLowerCase().includes(searchLower) ||
                   user.fullName.toLowerCase().includes(searchLower);
        });
    }, [data?.list, debouncedSearchTerm]);

    const handleViewUser = useCallback((user: UserData) => {
        console.log('View user:', user);
        // TODO: Implement user view modal/page
    }, []);

    const handleEditUser = useCallback((user: UserData) => {
        console.log('Edit user:', user);
        // TODO: Implement user edit modal/form
    }, []);

    return (
        <div className={styles.pageContainer} role="main">
            <Title level={2} className={styles.pageTitle}>
                {formatMessage({ id: "page.users.title" })}
            </Title>
            
            <div className={styles.searchSection}>
                <Row gutter={[16, 16]} className={styles.searchRow}>
                    <Col xs={24} md={12}>
                        <SearchInput 
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder={formatMessage({ id: "page.users.search.placeholder" })}
                            aria-label={formatMessage({ id: "page.users.search.aria.label" })}
                            data-testid="users-search"
                        />
                    </Col>
                </Row>
            </div>
            
            <UsersTable
                data={filteredData}
                loading={isLoading}
                pageSize={PAGE_SIZE}
                onViewUser={handleViewUser}
                onEditUser={handleEditUser}
            />
        </div>
    );
}