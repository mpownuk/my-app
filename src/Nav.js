import React, { Component } from "react";
import './index.css'

class Navigation extends Component {
    render() {
        const arr = ['click me', 'or me', 'or me!']
        return (
            <nav>
                <NavItem value={arr[0]} />
                <NavItem value={arr[1]} />
                <NavItem value={arr[2]} />
            </nav>
        )
    }
}

class NavItem extends Component {
    state = {
        value: this.props.value,
        flag: true
    }

    handleClick = () => {
        this.setState((prev) => {
            const newValue = prev.flag ? 'changed' : this.props.value
            return {
                value: newValue,
                flag: !prev.flag
            }
        })
    }

    render() {
        return (
            <ClickableThing
                onClick={this.handleClick}
                value={this.state.value}
            />
        )
    }
}

class ClickableThing extends Component {
    render() {
        return (
            <p onClick={this.props.onClick}>
                {this.props.value}
            </p>
        )
    }
}

export default Navigation