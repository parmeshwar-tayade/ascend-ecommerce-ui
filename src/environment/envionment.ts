export const environment = {
  production: false,

  apiUrl: 'http://localhost:8081/api/v1',

  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refreshToken: '/auth/refresh-token',
      forgotPassword: '/auth/forgot-password'
    },

    user: {
      register: '/user/register',
      getProfile: '/user/getProfile',
      updateProfile: '/user/updateProfile',
      getUsers: '/user/getUsers',
      deleteUser: '/user/deletUser'
    },

    product: {
      admin: {
        getById: '/product/admin/getProductById',
        getAll: '/product/admin/getAllProducts',
        create: '/product/admin/createProduct',
        update: '/product/admin/updateProduct',
        delete: '/product/admin/deleteProduct',
      },
      customer: {
        getById: '/product/getProductById',
        getAll: '/product/getAllProducts',
        search: '/product/searchProducts',
      }
    },

    category: {
      admin: {
        getAll: '/product/admin/getAllCategories',
        create: '/product/admin/createCategory',
        delete: '/product/admin/deleteCategoryById'
      },
      customer: {
        getAll: '/product/getAllCategories',
        create: '/product/createCategory',
        delete: '/product/deleteCategory'
      }
    },

    order: {
      getAll: '/orders',
      getById: '/orders',
      create: '/orders'
    }
  },
};