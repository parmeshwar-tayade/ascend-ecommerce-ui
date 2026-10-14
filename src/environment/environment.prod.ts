export const environment = {
  production: true,

  apiUrl: 'https://api.yourdomain.com/api',

  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refreshToken: '/auth/refresh-token'
    },

    users: {
      getProfile: '/users/profile',
      updateProfile: '/users/profile'
    },

    products: {
      getAll: '/products',
      getById: '/products',
      create: '/products',
      update: '/products',
      delete: '/products'
    },

    categories: {
      getAll: '/categories'
    },

    cart: {
      getCart: '/cart',
      addItem: '/cart/items',
      updateItem: '/cart/items',
      removeItem: '/cart/items',
      clearCart: '/cart'
    },

    orders: {
      getAll: '/orders',
      getById: '/orders',
      create: '/orders'
    }
  }
};