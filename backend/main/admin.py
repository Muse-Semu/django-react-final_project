from django.contrib import admin
from . import models

admin.site.register(models.User)
admin.site.register(models.Customer)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)
admin.site.register(models.Food)
admin.site.register(models.FoodCategory)
admin.site.register(models.Restuarant)
admin.site.register(models.RestuarantManager)
