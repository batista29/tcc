import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import createPartida from './createPartida/index'
import createLocal from './createLocal/index'

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="createPartida" component={createPartida} />
            <Tab.Screen name="createLocal" component={createLocal} />
        </Tab.Navigator>
    );
}