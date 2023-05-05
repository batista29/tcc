import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import principal from './principal/index.js'

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="principal" component={principal}></Tab.Screen>
        </Tab.Navigator>
    )
}