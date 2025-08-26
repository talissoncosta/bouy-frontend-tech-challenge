import { useIntl } from "react-intl";
import { ContentLayout } from "components/layout/content";
import { useUsers } from "hooks";
import { useUserSearch } from "./hooks";
import { useUserActions } from "./hooks";
import { PAGE_SIZE } from "./constants";
import { UsersView } from "./UsersView";

export const UsersPage = () => {
  const { formatMessage } = useIntl();
  const { data, isLoading } = useUsers();
  const { searchTerm, setSearchTerm, filteredData } = useUserSearch(data?.list);
  const { handleViewUser, handleEditUser } = useUserActions();

  return (
    <ContentLayout>
      <UsersView
        filteredData={filteredData}
        isLoading={isLoading}
        pageSize={PAGE_SIZE}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={formatMessage({ id: "page.users.search.placeholder" })}
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
      />
    </ContentLayout>
  );
}
