"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Typography, Alert } from 'antd'

const { Title } = Typography

const Register = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const onFinish = async (values: any) => {
        const { email, password, confirmPassword } = values

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        try {
            setLoading(true)
            setError("")
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Registration failed.")
                setLoading(false)
                return
            }

            router.push("/login")
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
            <Title level={2}>Register</Title>

            {error && <Alert type="error" message={error} style={{ marginBottom: '1rem' }} />}

            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: 'email', message: "Please enter a valid email" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: "Please confirm your password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
