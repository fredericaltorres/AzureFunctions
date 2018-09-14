import React from 'react';
import renderer from 'react-test-renderer';
// Load the component to test
import NotificationViewer from '../NotificationViewer';
// Load the service 
import notificationService from '../../services/NotificationService';

describe(`The NotificationViewer component`, () => {

    function getNotificationViewerText(tree) {
        const instance = tree.root;
        const component = instance.findByProps( { className:"notifications" } );
        const text = component.children[0];
        return text;
    }
    it(`should display '7 Notification Awaiting!' message`, async () => {
        
        notificationService.getNotification = jest.fn(() => { return { count : 7 } });

        const tree = renderer.create(
            <NotificationViewer/>
        );
        const text = getNotificationViewerText(tree);
        expect(text).toEqual("7 Notification Awaiting!");

        // Verify that method notificationService.getNotification has been called once
        //expect(1).toEqual(notificationService.getNotification.mock.calls.length);
    });  
});