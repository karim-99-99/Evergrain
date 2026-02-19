"""
Serializers for Product API (frontend-compatible format).
"""
from rest_framework import serializers
from .models import Product, ProductMedia


class ProductMediaSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductMedia
        fields = ['type', 'url']

    def get_url(self, obj):
        request = self.context.get('request')
        if obj.file:
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return obj.url or ''

    def to_representation(self, instance):
        return {
            'type': instance.media_type,
            'url': self.get_url(instance),
        }


class ProductSerializer(serializers.ModelSerializer):
    media = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'title_en', 'title_ar', 'title',
            'description_en', 'description_ar', 'description',
            'short_description_en', 'short_description_ar', 'short_description',
            'badge_en', 'badge_ar', 'badge',
            'price_en', 'price_ar', 'price',
            'features_en', 'features_ar', 'features',
            'media', 'image', 'images',
            'dimensions', 'weight',
        ]

    def get_media(self, obj):
        request = self.context.get('request')
        items = obj.media_items.all()
        return [
            {
                'type': m.media_type,
                'url': request.build_absolute_uri(m.file.url) if m.file and request else (m.file.url if m.file else m.url or ''),
            }
            for m in items
        ]

    def get_image(self, obj):
        first = obj.media_items.filter(media_type='image').first()
        if first:
            request = self.context.get('request')
            if first.file:
                return request.build_absolute_uri(first.file.url) if request else first.file.url
            return first.url or ''
        return ''

    def get_images(self, obj):
        urls = []
        for m in obj.media_items.filter(media_type='image'):
            if m.file:
                request = self.context.get('request')
                urls.append(request.build_absolute_uri(m.file.url) if request else m.file.url)
            elif m.url:
                urls.append(m.url)
        return urls if urls else ([self.get_image(obj)] if self.get_image(obj) else [])
