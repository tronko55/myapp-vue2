import HomeView from '../views/HomeView.vue'
import FavouritesView from "../views/FavouritesView.vue"
import CategoriesView from "../views/CategoriesView.vue"
import IngredientsView from "../views/IngredientsView.vue"
import DefaultLayoutVue from '@/components/DefaultLayout.vue'
import MealViewVue from '@/views/MealView.vue'
import MealsByCategory from '@/views/MealsByCategory.vue'
import MealsByIngredient from '@/views/MealsByIngredient.vue'


const routes =
  [
    {
      path: '/',
      component: DefaultLayoutVue,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
          redirect: { name: 'byLetter', params: { letter: 'a' } },
        },
        {
          path: "/home/byLetter/:letter",
          name: "byLetter",
          component: HomeView
        },
        {
          path: '/meal/:id',
          name: 'meal',
          component: MealViewVue
        },
        {
          path: '/categories',
          name: 'categories',
          component: CategoriesView,
        },
        {
          path: "/category/:category",
          name: "category",
          component: MealsByCategory,
        },
        {
          path: '/ingredients',
          name: 'ingredients',
          component: IngredientsView,
        },
        {
          path: "/ingredient/:ingredient",
          name: "ingredient",
          component: MealsByIngredient,
        },
        {
          path: '/favourites',
          name: 'favourites',
          component: FavouritesView
        }
      ]
    }

  ]

export default routes