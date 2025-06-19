import React, { useState } from "react";
import { CheckOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Modal, Form, Button, Table, Space, Tooltip } from "antd";

const ShowFormModal = ({ visible, onClose, claimNo }) => {
    const [form] = Form.useForm();

    const [data, setData] = useState([
        { PROC: 1, user:'Surveyor', name: 'Tojosoa', status: 'Draft' },
        { PROC: 2, user:'Garage',name: 'Lucas', status: 'Approved' },
        { PROC: 3, user:'Spare part', name: 'SP 1', status: 'In Progress' }
    ]);

    const handleApprove = (id, record) => {
        // Logique pour approuver l'affectation
        // Mettre à jour le statut de l'affectation
        setData(prevData => 
            prevData.map(item => 
                item.PROC === id ? { ...item, status: 'Approved' } : item
            )
        );
    }

    const handleCompleted = (id, record) => {
        // Logique pour completer l'affectation
        // Mettre à jour le statut de l'affectation
        setData(prevData => 
            prevData.map(item => 
                item.PROC === id ? { ...item, status: 'Completed' } : item
            )
        );
    }

    const buttons = 
        <Button key="cancel" onClick={onClose}>
            Cancel
        </Button>;

    const columns = [
        {
            title: "PROC",
            dataIndex: "PROC",
            key: "PROC",
        },
        {
            title: "Rôle",
            dataIndex: "user",
            key: "PROC",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "PROC",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "PROC",
        },
        {
            title: "Action",
            key: "ID",
            render: (text, record) => (
                <Space>
                    { 
                        record.status === 'In Progress' ? (
                            <>
                                <Tooltip title="Approve">
                                    <Button 
                                        type="primary" 
                                        icon={<CheckOutlined />}
                                        onClick={() => handleApprove(record.PROC, record)}
                                    />
                                            
                                </Tooltip>
                            </>
                        ) : record.status === 'Approved' ? (
                                <>
                                    <Tooltip title="Completed">
                                        <Button 
                                            type="primary" 
                                            icon={<CheckSquareOutlined/>}
                                            onClick={() => handleCompleted(record.PROC, record)}
                                        />
                                                
                                    </Tooltip>
                                </>
                            ) : null
                    }
                </Space>
            ),
        },
    ];

    return (
    <Modal
        title= "Claim Show Affectation"
        open={visible}
        onCancel={onClose}
        footer={buttons}
    >
        <Form form={form} layout="vertical">
            <Form.Item
                name="claim_no"
            >
                <div style={{ padding: '8px 0' }}>
                    Claim : {claimNo}
                </div>
            </Form.Item>
        </Form>

        <Table
            columns={columns}
            dataSource={data} // Données des utilisateurs
            rowKey="PROC" // Clé unique pour chaque ligne
            // loading={loading} // Indicateur de chargement
            pagination={{ pageSize: 5 }} // Pagination
        />
    </Modal>
    );
};

export default ShowFormModal;