import HomeView from '../views/HomeView.vue'
import FavouritesView from "../views/FavouritesView.vue"
import CategoriesView from "../views/CategoriesView.vue"
import DefaultLayoutVue from '@/components/DefaultLayout.vue'

const routes =
  [
    {
      path: '/',
      component: DefaultLayoutVue,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/categories',
          name: 'categories',
          component: CategoriesView
        },
        {
          path: '/favourites',
          name: 'favourites',
          component: FavouritesView // alternativa per non importare all'inizio: () => import('../views/Favourites.vue')
        }
      ]
    }

  ]

export default routes