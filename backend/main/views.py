from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets,status
from . import models
from . import serialazer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError
from . serialazer import OrderSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
import json




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        token['email'] = user.email
        # token['phone'] = user.phone
        return token
    
class MyTokenObtainPairView(TokenObtainPairView)  :
    serializer_class = MyTokenObtainPairSerializer 
     
class RestuarantView(viewsets.ModelViewSet):
    queryset = models.Restuarant.objects.all()
    serializer_class = serialazer.RestuarantSerializer


class FoodViewSet(viewsets.ModelViewSet):
    queryset = models.Food.objects.all()
    serializer_class = serialazer.FoodSerializer


class FoodCategoryView(viewsets.ModelViewSet):
    queryset = models.FoodCategory.objects.all()
    serializer_class = serialazer.FoodCategorySerializer


class OrderView(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serialazer.OrderSerializer

class OrderItemView(viewsets.ModelViewSet):
    queryset = models.OrderItem.objects.all()
    serializer_class = serialazer.OrderItemSerializer

class RestuarantRatingView(viewsets.ModelViewSet):
    queryset = models.RestuarantRating.objects.all()
    serializer_class = serialazer.RestuarantRatingSerializer


class CustomersView(viewsets.ModelViewSet):
    queryset = models.Customer.customer.all()
    serializer_class = serialazer.CustomerSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serialazer.UserSerializer

class RestuarantManagerViewSet(viewsets.ModelViewSet):
    queryset = models.RestuarantManager.manager.all()
    serializer_class = serialazer.RestuarantManagerSerializer


@csrf_exempt
def customer_login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(username=username, password=password)
    print(user)
    msg = None
    if user:
        print(user.is_active)
        msg = {
            "bool": True,
            "username":username,
            "is_superuser":user.is_superuser,
            "user_id":user.id,
            'role':user.role,
            'email':user.email,
            
        }
        
    else:
        msg = {"bool": False, msg: "Invalid Password/Username"}

    return JsonResponse(msg)

@csrf_exempt
def customer_register(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    email = request.POST.get("email")
    role = request.POST.get("role")
    print(username , password,email,role)
    hashPass = make_password(password)
    msg = None
   
    try:
        user = models.Customer.objects.create(username=username, email=email, password=hashPass,role=role)
        
        if user:
            # user = models.user.objects.create(user=user)
           
            msg = {
                "bool": True,
                "user":user.id,
            }
            
        else:
            msg = {"bool": False, msg: "Oops... Something went wrong"}
            
    except IntegrityError:
        msg={
            'bool':False,
             msg: "Username already exists"
        }
   
    return JsonResponse(msg)

@csrf_exempt
def manager_register(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    email = request.POST.get("email")
    print(username , password,email)
    hashPass = make_password(password)
    msg = None
    try:
        manager = models.RestuarantManager.objects.create(username=username, email=email, password=hashPass,role='MANAGER')
     
        if manager:
            print(manager)
            msg = {
                "bool": True,
                "manager":manager.id,
            }
            
        else:
            msg = {"bool": False, msg: "Oops... Something went wrong"}
            
    except IntegrityError:
        msg={
            'bool':False,
             msg: "Username already exists"
        }
   
    return JsonResponse(msg)

class getRestuarantByManager(generics.ListAPIView):
    queryset = models.Restuarant.objects.all()
    serializer_class = serialazer.RestuarantSerializer
    def get_queryset(self):
        qs = super().get_queryset()
        manager_id = self.kwargs['pk']
        # print(manager_id)
        qs= qs.filter(manager__id = manager_id)
        print(qs)
        return qs

class GetFoodsByRestuarant(generics.ListAPIView):
    queryset = models.Food.objects.all()
    serializer_class = serialazer.FoodSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        rest_id = self.kwargs['pk']
        # print(manager_id)
        qs= qs.filter(restuarant__id = rest_id)
        print(qs)
        return qs    

class GetOrdersByCustomer(generics.ListAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serialazer.OrderSerializer
    # permission_classes = [IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        # print(manager_id)
        qs= qs.filter(customer__id = customer_id)
        print(qs)
        return qs        


class GetOrderItemsOfRestuarant(generics.ListAPIView):
    queryset = models.OrderItem.objects.all() 
    serializer_class = serialazer.OrderItemSerializerWithDetail
    depth = 1
    def get_queryset(self):
        
        qs = super().get_queryset()
        rest_id = self.kwargs['pk']
        qs = qs.filter(restuarant_id = rest_id)
        print(qs)
        return qs


   