import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html#scrollbehavior
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If user used back/forward button, keep the saved position
    if (savedPosition) {
      return savedPosition
    }

    // Always scroll to top on route change
    return { top: 0 }
  }
}