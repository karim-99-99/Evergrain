"""
Django admin for Product and ProductMedia.
"""
from django.contrib import admin
from .models import Product, ProductMedia


class ProductMediaInline(admin.TabularInline):
    model = ProductMedia
    extra = 0
    ordering = ['order']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title_en', 'title_ar', 'price_en', 'price_ar', 'badge_en']
    list_filter = ['badge_en']
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    inlines = [ProductMediaInline]
    fieldsets = [
        ('English', {
            'fields': ['title_en', 'description_en', 'short_description_en', 'badge_en', 'price_en', 'features_en'],
        }),
        ('Arabic', {
            'fields': ['title_ar', 'description_ar', 'short_description_ar', 'badge_ar', 'price_ar', 'features_ar'],
        }),
        ('Legacy', {
            'fields': ['title', 'description', 'short_description', 'badge', 'price', 'features'],
            'classes': ['collapse'],
        }),
        ('Other', {'fields': ['dimensions', 'weight']}),
    ]


@admin.register(ProductMedia)
class ProductMediaAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'media_type', 'order', 'file', 'url']
    list_filter = ['media_type']
    ordering = ['product', 'order']
