import React from 'react'
import Nav from './common/Nav'
import { Row, Col, Input, Button } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userAuthReq } from '../store/user'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                password: '',
            },
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.userAuthReq(this.state.user)
    }

    onInputChange = ({ target }) => {
        const { name, value } = target
        const updatedState = this.state.user
        updatedState[name] = value
        this.setState({ user: updatedState })
    }

    render() {
        if (this.props.user.username) return <Redirect to='/' />
        return (
            <div>
                <Nav />
                <Row>
                    <Col s={4} offset='s4'>
                        <Row>
                            <Input onChange={this.onInputChange} name='username' label="username" s={12} placeholder="example@mail.com" />
                            <Input onChange={this.onInputChange} name='password' type="password" label="password" s={12} />
                            <Button onClick={this.onSubmit}> Enter </Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapState = ({ user }) => ({
    user
})

const mapDispatch = dispatch => ({
    userAuthReq: user => dispatch(userAuthReq(user)),
})

export default connect(mapState, mapDispatch)(Login)