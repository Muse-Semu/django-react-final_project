from rest_framework import serializers
from rest_framework.fields import empty
from . import models
# from django.contrib.auth.models import User



    
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = "__all__"
        meta_depth = 1

class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FoodCategory
        fields = "__all__"
        meta_depth = 1


class FoodSerializer(serializers.ModelSerializer):
    # category = FoodCategorySerializer(read_only=True)

    class Meta:
        model = models.Food
        fields = "__all__"
        # meta_depth = 1


class RestuarantSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Restuarant
        fields = "__all__"
        # meta_depth = 1
        
    def create(self, validated_data):
        # items_data = validated_data.pop('items')
        restuarnt = models.Restuarant.objects.create(**validated_data)
        # for item_data in items_data:
        #     models.OrderItem.objects.create(order=order, **item_data)
        print(restuarnt)
        return restuarnt   

class RestuarantManagerSerializer(serializers.ModelSerializer):
    restuarant = RestuarantSerializer()

    class Meta:
        model = models.RestuarantManager
        fields = "__all__"
        meta_depth = 2



        
    
class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.OrderItem
        fields = "__all__"
        meta_depth=1
        
class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    # delivery_time = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    items = OrderItemSerializer(many=True)
    class Meta:
        model = models.Order
        fields = "__all__"
        read_only_fields = ['user','order_status','order_time']
        # meta_depth=2
        

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = models.Order.objects.create(**validated_data)
        for item_data in items_data:
            models.OrderItem.objects.create(order=order, **item_data)
        return order

class RestuarantRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RestuarantRating
        fields = ["id", "review", "rating"]

    def __init__(self, *args, **kwargs):
        super(RestuarantRatingSerializer, self).__init__(*args, **kwargs)
        # self.Meta.meta_depth = 1


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"
        meta_depth = 1


class OrderItemSerializerWithDetail(serializers.ModelSerializer):
    
    
    class Meta:
        model = models.OrderItem
        fields = "__all__"
        depth=1


class ChapaSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'       
        
class RatingSerializer(serializers.ModelSerializer)  :
   class Meta:
       fields = '__all__'  