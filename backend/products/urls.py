"""
API URL routes for products.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list),
    path('products/<int:pk>/', views.product_detail),
    # Same shape as initial-products.json for drop-in replacement
    path('initial-products.json', views.product_list),
]
