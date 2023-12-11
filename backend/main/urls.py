from django.urls import path, include
from . import views
from rest_framework import routers
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)
router = routers.DefaultRouter()
router.register("restuarants", views.RestuarantView)
router.register("foods", views.FoodViewSet)
router.register("customers", views.CustomersView)
router.register("managers", views.RestuarantManagerViewSet)
router.register("users", views.UserViewSet)
router.register("orders", views.OrderView)
router.register('order_items',views.OrderItemView)
# router.register('rating', views.RestuarantRatingView)
router.register('categories', views.FoodCategoryView)
# router.register("rest/<int:pk>",views.getRestuarantByManager)
urlpatterns = [
    path("user/login", views.customer_login , name="login"),
    path("customer/register", views.customer_register , name="register"),
    path("manager/register",views.manager_register,name='manger/register'),
    path("rest/<int:pk>",views.getRestuarantByManager.as_view()),
    path('restuarant/<int:pk>/menu',views.GetFoodsByRestuarant.as_view()),
    
    path('orders/customer/<int:pk>/',views.GetOrdersByCustomer.as_view()),
    path('orders/restuarant/<int:pk>/',views.GetOrderItemsOfRestuarant.as_view()),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
