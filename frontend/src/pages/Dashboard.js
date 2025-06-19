import React, {useState, useEffect}  from "react";
import { EyeOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import {Button, Space, Table, Tooltip, message, Spin, Card} from "antd";

import AffectationFormModal  from "../components/AffectationFormModal";
import ShowFormModal  from "../components/ShowFormModal";
import EditFormModal from './../components/EditFormModal';

import axios from "axios";

const Dashboard = () => {
    const [claims, setClaims]                               = useState([]);
    const [loading, setLoading]                             = useState(false);
    const [claimNo, setClaimNo]                             = useState();
    const [AffecationModalVisible, setAffectModalVisible]   = useState(false);
    const [ShowModalVisible, setShowModalVisible]           = useState(false);
    const [EditModalVisible, setEditModalVisible]           = useState(false);

    // Récupérer les données au chargement du composant
    useEffect(() => {
        fetchClaims();
    }, []);

    const fetchClaims = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/claims");
            console.log(response.data);
            
            setClaims(response.data);
            message.success("Liste des claims chargée avec succès");
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            message.error("Impossible de charger les claims.");
        } finally {
            setLoading(false);
        }
    };

    const handleAffectation = (id, claimNo) => {
        setClaimNo(claimNo);
        setAffectModalVisible(true);
    };

    const handleShow = (id, claimNo) => {
        setClaimNo(claimNo);
        setShowModalVisible(true);
    };
    
    const handleEdit = (id, claimNo) => {
        setClaimNo(claimNo);
        setEditModalVisible(true);
    };

    // Colonnes pour le tableau
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Date Received",
            dataIndex: "received_date",
            key: "received_date",
            render: (date) => {
                if (!date) return '-';
                const d = new Date(date);
                const day = d.getDate();
                const month = d.toLocaleString('default', { month: 'short' });
                const year = d.getFullYear();
                return `${day}-${month}-${year}`;
            }
        },
        {
            title: "Claim n°",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Registration n°",
            dataIndex: "registration_number",
            key: "registration_number",
        },
        {
            title: "Ageing",
            dataIndex: "ageing",
            key: "ageing",
        },
        {
            title: "Mobile Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Affected",
            dataIndex: "is_affected",
            key: "is_affected",
            render: (is_affected) => is_affected ? "Yes" : "No"
        },
        {
            title: "Action",
            key: "id",
            render: (text, record) => (
                <Space>
                    { 
                        record.is_affected === true ? (
                            <>
                                <Tooltip title="View">
                                    <Button 
                                        type="primary" 
                                        icon={<EyeOutlined />}
                                        onClick={() => handleShow(record.id, record.number)}
                                    />
                                            
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <Button 
                                        type="primary"
                                        style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} 
                                        icon={<EditOutlined />}
                                        onClick={() => handleEdit(record.id, record.number)}
                                    />
                                </Tooltip>
                            </>
                        ) : record.is_affected === false ? (
                            <Tooltip title="Affected">
                                <Button 
                                    type="primary"
                                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} 
                                    icon={<FormOutlined />} 
                                    onClick={() => handleAffectation(record.id, record.number)}
                                />
                            </Tooltip>
                        ) : null
                    }
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Card title="Liste des Claims" style={{ margin: '20px' }}>
                <Spin spinning={loading}>
                    <Table 
                        dataSource={claims} 
                        columns={columns} 
                        rowKey="id"
                        bordered
                        size="middle"
                    />
                </Spin>
            </Card>

            <AffectationFormModal
                visible={AffecationModalVisible}
                onClose={() => setAffectModalVisible(false)}
                claimNo={claimNo}
            />

            <ShowFormModal
                visible={ShowModalVisible}
                onClose={() => setShowModalVisible(false)}
                claimNo={claimNo}
            />

            <EditFormModal
                visible={EditModalVisible}
                onClose={() => setEditModalVisible(false)}
                claimNo={claimNo}
            />
        </div>
    );
};

export default Dashboard;