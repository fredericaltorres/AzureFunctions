import React from 'react';
import NotificationService from '../services/NotificationService';

class NotificationViewer extends React.Component {

    constructor(...args) {

        super(...args);
        this.state = {
            count: -1,
        };
    }

    componentDidMount() {
        let { count } = NotificationService.getNotification();
        this.setState({ count });
    }

    render() {
        return (
            <section>
                <div className="notifications">
                    {this.state.count != -1  ? `${this.state.count} Notification Awaiting!` : `Loading...`}
                </div>
            </section>
        );
    }
 }

 export default NotificationViewer;
