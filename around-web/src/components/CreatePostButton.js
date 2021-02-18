import { Modal, Button, message } from 'antd';
import React from 'react';
import {WrappedCreatePostForm} from "./CreatePostForm";
import $ from 'jquery';
import {API_ROOT, LOC_SHAKE, POS_KEY, TOKEN_KEY} from '../constant';

export class CreatePostButton extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({confirmLoading: true});
        this.form.validateFields((err, values) => {
            if (!err) {
                const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));

                const formData = new FormData();
                formData.set('lat', lat + Math.random() * LOC_SHAKE * 2 - 1);
                formData.set('lon', lon + Math.random() * LOC_SHAKE * 2 - 1);
                formData.set('message', values.message);

                formData.set('image', values.image[0].originFileObj);
                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text'
                }).then(
                    (response) => {
                        message.success('Created a post successfully!');
                        this.form.resetFields();
                        this.setState({ visible: false, confirmLoading: false });
                        this.props.loadNearbyPosts();

                    }, (response) => {
                        message.error(response.responseText);
                        this.setState({ visible: false, confirmLoading: false });
                    }).catch((error) => {
                    console.log(error);
                });
            }
        })
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });


        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    saveFormRef = (formInstance) => {
        this.form = formInstance;
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal title="Create New Post"
                       visible={visible}
                       okText='Create'
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm ref={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}
