import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { message } from 'antd';
import { useCookies } from 'react-cookie';

const RegisterForm = () => {
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [, setCookie] = useCookies()

    const onFinish = async (values) => {
      try {
        setDisabledBtn(true)
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, values)

        if (response.data) {
          setCookie('token', response.data.access_token)
          window.location = 'profile'
        }
      } catch (e) {
        console.log(e);
        message.open({
          type: 'error',
          content: e.response.data.message || 'Registration error'
        })
        setDisabledBtn(false)
      }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='login-form'
  >
    <Form.Item
      label="Имя"
      name="name"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите имя!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Пароль"
      name="password"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите пароль!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" disabled={disabledBtn}>
        Регистрация
      </Button>
    </Form.Item>
  </Form>
};
export default RegisterForm;