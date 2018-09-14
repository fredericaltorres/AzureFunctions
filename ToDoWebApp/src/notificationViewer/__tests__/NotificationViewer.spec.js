import React from 'react';
import renderer from 'react-test-renderer';

// Load the component to test
import NotificationViewer from '../NotificationViewer';

// Define the fact that we are going to mock notificationService because 
// it is a dependencE of NotificationViewer
jest.mock('../../services/NotificationService');

// Now load the notificationService, the mocked instance will be loaded
// const notificationService = require(`../../services/NotificationService`).default;
import notificationService from '../../services/NotificationService';

describe(`The NotificationViewer component`, () => {

    function getNotificationViewerText(tree) {
        const instance = tree.root;
        const component = instance.findByProps( { className:"notifications" } );
        const text = component.children[0];
        return text;
    }
    it(`should display the correct number of notifications`, () => {

        notificationService.__setCount(5);

        const tree = renderer.create( <NotificationViewer/> );
        const text = getNotificationViewerText(tree);
        expect(text).toEqual("5 Notification Awaiting!");
    }); 

    const expectedLoadingMessage = 'Loading...';

    it(`should display the '${expectedLoadingMessage}' when initializing`, () => {

        notificationService.__setCount(-1);
        
        const tree = renderer.create( <NotificationViewer/> );
        const text = getNotificationViewerText(tree);
        expect(text).toEqual(expectedLoadingMessage);
    }); 
});