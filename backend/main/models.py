from django.db import models 
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.query import QuerySet
from django.contrib.auth.hashers import make_password

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        MANAGER = "MANAGER", "Manager"
        CUSTOMER = "CUSTOMER", "Customer"
        DELIVERY_PERSON = "DELIVERY_PERSON","Delivery Person"
        
    email = models.EmailField(unique=True)     
    role = models.CharField(max_length=50, choices=Role.choices)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.role 
            # self.password = make_password(self.password)
        return super().save(*args, **kwargs)    
        
      





# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     date_of_birth = models.DateField(null=True, blank=True)
#     image = models.ImageField(upload_to="images", null=True, blank=True)
#     biography = models.CharField(max_length=300, null=True, blank=True)
    
#     def __str__(self):
#         return f"{self.user.username} Profile"


class CustomerManger(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset().filter(role=User.Role.CUSTOMER)


class Customer(User):
    
    base_role = User.Role.CUSTOMER
    customer = CustomerManger()


    class Meta:
        proxy = True

    def welcome(self):
        return f"Welcome {self.username}"

    def __str__(self) -> str:
        return f"${self.username} {self.base_role}" 
    
    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)


class RestuarantMangerManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset().filter(role=User.Role.MANAGER)


class RestuarantManager(User):
    base_role = User.Role.MANAGER
    manager = RestuarantMangerManager()

    class Meta:
        proxy = True
        
    def __str__(self) -> str:
        return f"{self.username} {self.base_role}"
     
    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)    

    
    

class DelivererManager(BaseUserManager):
   
    def get_queryset(self, *args,**kwargs):
        return super().get_queryset().filter(role= User.Role.OWNER)  

class Deliverer(User)    :
    base_role = User.Role.DELIVERY_PERSON
    deliverer = DelivererManager()  
    
    class Meta:
        proxy=True    
        
    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)    
        

class Restuarant(models.Model):
    manager= models.OneToOneField(RestuarantManager,on_delete=models.CASCADE)
    name = models.CharField(max_length=255,unique=True)
    phone = models.PositiveBigIntegerField(unique=True)
    email = models.EmailField(unique=True)
    registered_time = models.DateTimeField(auto_now_add=True)
    openenig_time = models.TimeField()
    closing_time = models.TimeField()
    image = models.ImageField(upload_to="images", null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name


class FoodCategory(models.Model):
    title = models.CharField(max_length=255, blank=True, null=False)
    detail = models.TextField(null=True, blank=True)
    icon = models.ImageField(upload_to="images",null=True, blank=True)
    def __str__(self):
        return self.title


class Food(models.Model):
    restuarant = models.ForeignKey(Restuarant, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    detail = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(FoodCategory, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="images", null=True, blank=True)
    in_stock = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    order_time = models.DateTimeField(auto_now_add=True)
    delivering_itme = models.DecimalField(max_digits=10, decimal_places=2,default=30.5)
    payment_method = models.CharField(max_length=255)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    objects = models.Manager()
    
    class Meta:
        ordering = ['-order_time']

    @property
    def order_items(self):
        return self.orderItems_set.all()
    
    def __str__(self):
        return f"{self.id} Order"
    
    
class OrderItem(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        DELIVERED = "DELIVERED", "Delivered"
        CANCELLED = "CANCELLED", "Cancelled"
    
    order = models.ForeignKey(Order,related_name='items',on_delete=models.CASCADE)  
    food = models.ForeignKey(Food,on_delete=models.CASCADE) 
    restuarant = models.ForeignKey(Restuarant,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price= models.DecimalField(max_digits=10,decimal_places=2)
    status = models.CharField(
        max_length=25, default=Status.PENDING, choices=Status.choices
    )
   

class RestuarantRating(models.Model):
    restuarant = models.ForeignKey(
        Restuarant, on_delete=models.CASCADE, related_name="product_ratings"
    )
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rating = models.IntegerField()
    reviews = models.TextField()
    added_time = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.rating}-{self.reviews}"





class Comment(models.Model):
    restuarant = models.ForeignKey(Restuarant, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    added_time = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(null=True,blank=True)


class AdminReport(models.Model):
    restuarant = models.ForeignKey(Restuarant, on_delete=models.CASCADE)


class RestuarantReport(models.Model):
    restuarant_manger = models.ForeignKey(Restuarant, on_delete=models.CASCADE)
    body = models.TextField()


class Payment(models.Model):
    pass

    
class Rating(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
    restuarant = models.ForeignKey(Restuarant,on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=3,decimal_places=2)
       