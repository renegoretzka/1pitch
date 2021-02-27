import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Teams from '../navigation/Teams'
import CreateTeam from '../navigation/Team/CreateTeam'
import UpdateTeam from '../navigation/Team/UpdateTeam'

import { color } from '../../styles/colors'
import { FONT_WEIGHT_BOLD } from '../../styles/variables'
import StartupName from '../navigation/Team/CreateStartup/StartupName'
import InvestorName from '../navigation/Team/CreateInvestor/InvestorName'
import StartupIndustry from '../navigation/Team/CreateStartup/StartupIndustry'
import InvestorIndustry from '../navigation/Team/CreateInvestor/InvestorIndustry'
import StartupStage from '../navigation/Team/CreateStartup/StartupStage'
import InvestorStage from '../navigation/Team/CreateInvestor/InvestorStage'
import StartupCapital from '../navigation/Team/CreateStartup/StartupCapital'
import InvestorCapital from '../navigation/Team/CreateInvestor/InvestorCapital'
import InvestorInformation from '../navigation/Team/CreateInvestor/InvestorInformation'
import StartupInformation from '../navigation/Team/CreateStartup/StartupInformation'

const Stack = createStackNavigator()

const TeamStack = () => {
  return (
    <Stack.Navigator initialRouteName="Teams" screenOptions={headerOptions}>
      <Stack.Screen
        name="Teams"
        component={Teams}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateTeam"
        component={UpdateTeam}
        options={{
          title: 'Update team'
        }}
      />
      <Stack.Screen
        name="CreateTeam"
        component={CreateTeam}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="StartupName"
        component={StartupName}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="StartupIndustry"
        component={StartupIndustry}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="StartupStage"
        component={StartupStage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="StartupCapital"
        component={StartupCapital}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="StartupInformation"
        component={StartupInformation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="InvestorName"
        component={InvestorName}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="InvestorIndustry"
        component={InvestorIndustry}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="InvestorStage"
        component={InvestorStage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="InvestorCapital"
        component={InvestorCapital}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="InvestorInformation"
        component={InvestorInformation}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

const headerOptions = {
  headerStyle: {
    backgroundColor: color.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  headerTintColor: color.white,
  headerTitleStyle: {
    fontWeight: FONT_WEIGHT_BOLD
  },
  tabBarVisible: false
}

export default TeamStack
