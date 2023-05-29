import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Layout, message } from 'antd';
import { Space, Skeleton } from 'antd';
import { useNavigate } from "react-router";


const Profile = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [{token}, , removeCookie] = useCookies()
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        const getProfile = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const {email, name} = res.data

                setEmail(email)
                setName(name)
            } catch (e) {
                console.log(e);
                messageApi.open({
                    type: 'error',
                    content: 'Authorization error'
                })
                removeCookie('token')
                setTimeout(() => {
                    navigate('login')
                }, 1500)
            }

        }
        getProfile()
    }, [])

  return (
    <Layout className="profile">
        {contextHolder}
        <h1 style={{marginBottom: 30}}>Profile</h1>
        {name && email 
            ? <Space direction="vertical">
                <div>Email: {email}</div>
                <div>Name: {name}</div>
            </Space>
            : <Skeleton title={false} paragraph={{ rows: 2, width: [200, 200] }} />
        }
    </Layout>
  )
};
export default Profile;