import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'

const PAGE_TITLES = {
  '/admin':            'Dashboard Overview',
  '/admin/rankings':   'Global Rankings',
  '/admin/branch':     'Branch Analytics',
  '/admin/section':    'Section Analytics',
  '/admin/subjects':   'Subject Analytics',
  '/admin/failures':   'Failure Analytics',
  '/student':          'My Dashboard',
  '/student/results':  'My Results',
  '/student/backlogs': 'My Backlogs',
}

export default function DashboardLayout() {
  const location = useLocation()

  const title = Object.entries(PAGE_TITLES).find(([path]) =>
    location.pathname.startsWith(path) && (location.pathname === path || location.pathname[path.length] === '/')
  )?.[1] || PAGE_TITLES[location.pathname] || 'SRKR Analytics'

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Topbar title={title} />
        <div className="page-body">
          <Outlet />
        </div>
      </div>
    </div>
  )
}