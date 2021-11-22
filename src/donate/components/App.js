import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class Donate extends Component {
    constructor() {
        super()
        this.state = {
            receiver: '',
            amount: 0,
            frequency: '',
            payAccount: ''
        }
        this.changeReceiver = this.changeReceiver.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
        this.changeFrequency = this.changeFrequency.bind(this)
        this.changePayAccount = this.changePayAccount.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeReceiver(event) {
        this.setState({
            receiver: event.target.value
        })
    }
    changeAmount(event) {
        this.setState({
            amount: event.target.value
        })
    }
    changeFrequency(event) {
        this.setState({
            frequency: event.target.value
        })
    }
    changePayAccount(event) {
        this.setState({
            payAccount: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const registered = {
            receiver: this.state.receiver,
            amount: this.state.amount,
            frequency: this.state.frequency,
            payAccount: this.state.payAccount
        }

        axios.post('http://localhost:4000/app/donate', registered)
            .then(res => console.log(res.data))

        // Go back to home page
        window.location = '/donate'
        this.setState({
            receiver: '',
            amount: 0,
            frequency: '',
            payAccount: ''
        })
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text'
                                placeholder='Receiver Identifier'
                                onChange={this.changeReceiver}
                                value={this.state.receiver}
                                className='form-control form-group'
                            />
                            <input type='number'
                                placeholder='Amount(DAI)'
                                onChange={this.changeAmount}
                                value={this.state.amount}
                                className='form-control form-group'
                            />
                            <input type='text'
                                placeholder='Frequency'
                                onChange={this.changeFrequency}
                                value={this.state.frequency}
                                className='form-control form-group'
                            />
                            <input type='text'
                                placeholder='Payment Account'
                                onChange={this.changePayAccount}
                                value={this.state.payAccount}
                                className='form-control form-group'
                            />
                            <input type='submit'
                                className='btn btn-primary btn-block'
                                value='Submit'
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Donate
