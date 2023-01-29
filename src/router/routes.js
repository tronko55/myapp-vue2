import HomeView from '../views/HomeView.vue'
import FavouritesView from "../views/FavouritesView.vue"
import CategoriesView from "../views/CategoriesView.vue"
import DefaultLayoutVue from '@/components/DefaultLayout.vue'
import MealViewVue from '@/views/MealView.vue'
import MealsByCategory from '@/views/MealsByCategory.vue'


const routes =
  [
    {
      path: '/',
      component: DefaultLayoutVue,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          children: [

          ]
        },
        {
          path: '/categories',
          name: 'categories',
          component: CategoriesView,
          children: [

          ]
        },
        {
          path: '/favourites',
          name: 'favourites',
          component: FavouritesView // alternativa per non importare all'inizio: () => import('../views/Favourites.vue')
        },
        {
          path: '/meal/:id',
          name: 'meal',
          component: MealViewVue
        },
        {
          path: "/category/:category",
          name: "category",
          component: MealsByCategory,
        },
        {
          path: "/byLetter/:letter",
          name: "byLetter"
        }
      ]
    }

  ]

export default routes