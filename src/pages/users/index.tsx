import { Input, Table } from "antd";
import { useUsers } from "hooks";
import { useParams } from "react-router-dom";

export function Users() {
    const { query } = useParams();
    const { data } = useUsers(query);

    const columns = [
        {
            title: "Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
        },
    ];
    return (
        <div>
            <Input placeholder="Search" />
            <Table dataSource={data?.list} columns={columns} />
        </div>
    );
}