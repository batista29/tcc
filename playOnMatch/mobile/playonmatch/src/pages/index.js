import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Login from './login/index'
import Cadastro from './cadastro/index'

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Cadastro" component={Cadastro} />
        </Tab.Navigator>
    );
}