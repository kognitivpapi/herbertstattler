import { getWorkDetail } from '../data/workDetails'
import { splitWorkTitle } from './splitWorkTitle'

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/exhibitions': 'Exhibitions',
  '/material': 'Material',
  '/about': 'About',
  '/contact': 'Contact',
}

export function getNavContextLabel(pathname: string, workId?: string): string {
  if (pathname.startsWith('/work/') && workId) {
    const work = getWorkDetail(workId)
    if (work) return splitWorkTitle(work.title).name
    return 'Work'
  }

  return routeLabels[pathname] ?? 'Home'
}
