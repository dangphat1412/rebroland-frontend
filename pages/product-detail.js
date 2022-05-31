import { Container, Form, Icon } from "semantic-ui-react";
import Navigation from "../components/navigation/navigation.component";

export default function AddProperty() {
    return (
        <div>
            <Navigation />
            <div
                style={{
                    height: "1500px",
                    width: "100%",
                    position: "relative",
                    padding: "0",
                    maxHeight: "680px",
                    overflow: "hidden",
                    backgroundImage: "url('./zyro-image.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
            </div>
            <Container>
                <Form size="large">
                    <h1>Bán đất vườn 8000m2 thuộc xã Hàm Kiệm HTN cạnh bên đường dẫn về NovaWoorl Phan Thiết vs biển</h1>
                    <p><Icon name="map marker" /> Xã Hàm Kiệm, Hàm Thuận Nam, Bình Thuận</p>
                    <Form.Input fluid label='Tiêu đề' placeholder='Tiêu đề bài đăng' />
                    <Form.TextArea
                        label='Mô tả'
                        placeholder='Nhập mô tả chung'
                    />
                    <Form.Input fluid label='Tiêu đề' placeholder='Tiêu đề bài đăng' />
                    <Form.TextArea
                        label='Mô tả'
                        placeholder='Nhập mô tả chung'
                    />
                    <Form.Input fluid label='Tiêu đề' placeholder='Tiêu đề bài đăng' />
                    <Form.TextArea
                        label='Mô tả'
                        placeholder='Nhập mô tả chung'
                    />
                </Form>
            </Container>
        </div>
    );
}