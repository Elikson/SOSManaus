import React from 'react'
import { View, Text } from 'react-native'
import { Container, Header, Content, Textarea, Form } from "native-base";

export default function Register({ navigation }) {
    return (
        <Container>
            <Header />
                <Content padder>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Textarea" />
                    </Form>
                </Content>
      </Container>
    )
}
