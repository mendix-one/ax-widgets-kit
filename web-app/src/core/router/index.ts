import { createBrowserRouter } from 'react-router'

import { AuthGuard } from '../../auth/AuthGuard'
import { AuthLayout } from '../../auth/AuthLayout'
import { GuestGuard } from '../../auth/GuestGuard'
import { Layout } from '../../shared/layout/Layout'

export const router = createBrowserRouter([
  // Auth routes — accessible only when NOT authenticated
  {
    path: 'auth',
    Component: GuestGuard,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: 'sign-in',
            lazy: async () => {
              const module = await import('../../auth/SignInPage')
              return { Component: module.default }
            },
          },
          {
            path: 'signup',
            lazy: async () => {
              const module = await import('../../auth/SignupPage')
              return { Component: module.default }
            },
          },
          {
            path: 'reset-pass',
            lazy: async () => {
              const module = await import('../../auth/ResetPassPage')
              return { Component: module.default }
            },
          },
        ],
      },
    ],
  },

  // App routes — accessible only when authenticated
  {
    Component: AuthGuard,
    children: [
      {
        Component: Layout,
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import('../../pages/dashboard/DashboardPage')
              return { Component: module.default }
            },
          },
          {
            path: 'yield',
            lazy: async () => {
              const module = await import('../../pages/yield/YieldPage')
              return { Component: module.default }
            },
          },
          {
            path: 'defects',
            lazy: async () => {
              const module = await import('../../pages/defects/DefectsPage')
              return { Component: module.default }
            },
          },
          {
            path: 'lots',
            lazy: async () => {
              const module = await import('../../pages/lots/LotsPage')
              return { Component: module.default }
            },
          },
          {
            path: 'technology-roadmap',
            lazy: async () => {
              const module = await import('../../pages/technology-roadmap/TechnologyRoadmapPage')
              return { Component: module.default }
            },
          },
          {
            path: 'roadmap',
            lazy: async () => {
              const module = await import('../../pages/roadmap/RoadmapPage')
              return { Component: module.default }
            },
          },
          {
            path: 'about',
            lazy: async () => {
              const module = await import('../../pages/about/AboutPage')
              return { Component: module.default }
            },
          },
          {
            path: '*',
            lazy: async () => {
              const module = await import('../../pages/not-found/NotFoundPage')
              return { Component: module.default }
            },
          },
        ],
      },
    ],
  },
])
