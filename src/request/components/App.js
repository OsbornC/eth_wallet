import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class Request extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            title: '',
            reason: '',
            description: ''
        }
        this.changeAmount = this.changeAmount.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeReason = this.changeReason.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeAmount(event) {
        this.setState({
            amount: event.target.value
        })
    }
    changeTitle(event) {
        this.setState({
            title: event.target.value
        })
    }
    changeReason(event) {
        this.setState({
            reason: event.target.value
        })
    }
    changeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }
    onSubmit(event) {
        event.preventDefault()

        const registered = {
            amount: this.state.amount,
            title: this.state.title,
            reason: this.state.reason,
            description: this.state.description
        }

        axios.post('http://localhost:4000/app/request', registered)
            .then(res => console.log(res.data))

        // Go back to home page
        window.location = '/request'
        this.setState({
            amount: 0,
            title: '',
            reason: '',
            description: ''
        })
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='number'
                                placeholder='Amount(DAI)'
                                onChange={this.changeAmount}
                                value={this.state.amount}
                                className='form-control form-group'
                            />
                            <input type='text'
                                placeholder='Title'
                                onChange={this.changeTitle}
                                value={this.state.title}
                                className='form-control form-group'
                            />
                            <input type='text'
                                placeholder='Reason'
                                onChange={this.changeReason}
                                value={this.state.reason}
                                className='form-control form-group'
                            />
                            <input type='text'
                                placeholder='Description'
                                onChange={this.changeDescription}
                                value={this.state.description}
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

export default Request
