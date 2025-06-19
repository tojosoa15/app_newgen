import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

import axios from "axios";

const AffectationFormModal = ({ visible, onClose, claimNo }) => {
    const [form]                = Form.useForm();
    const [roles, setRoles]     = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("/api/roles");
                setRoles(response.data.map(role => ({
                    value: role.id,
                    label: role.role_name
                })));
            } catch (err) {
                // setError("Failed to load roles");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                console.log('Form values:', values);
                // Here you can handle the form submission, e.g., send data to the server
                form.resetFields();
                onClose(); // Close the modal after submission
            })
            .catch(errorInfo => {
                console.error('Validation failed:', errorInfo);
            });
    };

    // Define the buttons for the modal footer
    const buttons = 
        [
            <Button key="cancel" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        ];
    return (
        <Modal
            title= "Claim Affectation"
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

                {/* Modifier le formulaire en fonctin de rôle */}
                <Form.Item
                    label="Rôle"
                    name="role"
                >
               <Select
                    placeholder={loading ? "Chargement..." : "Choose a role"}
                    loading={loading}
                    options={roles}
                    disabled={loading}
                />
                </Form.Item>

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}>
                    {({ getFieldValue }) => {
                        const role = getFieldValue('role');
                        
                        if (role === 1) {
                            return (
                                <Form.Item
                                    label="Surveyor"
                                    name="surveyor"
                                >
                                    <Select
                                        placeholder="Choose a surveyor"
                                        options={[
                                            { value: 1, label: 'Tojosoa' },
                                            { value: 2, label: 'René' },
                                            { value: 3, label: 'Raharison' },
                                        ]}
                                    />
                                </Form.Item>
                            );
                        }
                        
                        if (role === 2) {
                            return (
                                <Form.Item
                                    label="Garage"
                                    name="garage"
                                >
                                    <Select
                                        placeholder="Choose a garage"
                                        options={[
                                            { value: 1, label: 'Lucas' },
                                            { value: 2, label: 'Tinah' },
                                            { value: 3, label: 'Mathieu' },
                                        ]}
                                    />
                                </Form.Item>
                            );
                        }
                        
                        if (role === 3) {
                            return (
                                <Form.Item
                                    label="Spare Part"
                                    name="spare_part"
                                >
                                    <Select
                                        placeholder="Choose a spare part"
                                        options={[
                                            { value: 1, label: 'SP 1' },
                                            { value: 2, label: 'SP 2' },
                                            { value: 3, label: 'SP 3' },
                                        ]}
                                    />
                                </Form.Item>
                            );
                        }
                        
                        return null;
                    }}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AffectationFormModal;