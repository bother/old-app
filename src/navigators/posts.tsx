import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { FunctionComponent } from 'react'

import { TabBar } from '../components/posts'
import { Latest, Nearby, Popular } from '../scenes'

export type PostsParams = {
  Popular: undefined
  Nearby: undefined
  Latest: undefined
}

const { Navigator, Screen } = createMaterialTopTabNavigator<PostsParams>()

export const PostsNavigator: FunctionComponent = () => (
  <Navigator tabBar={(props) => <TabBar {...props} />}>
    <Screen component={Popular} name="Popular" />
    <Screen component={Nearby} name="Nearby" />
    <Screen component={Latest} name="Latest" />
  </Navigator>
)
