"""
API views for products (list + detail).
"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


@api_view(['GET'])
def product_list(request):
    """List all products (same shape as initial-products.json customProducts)."""
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response({'removedIds': [], 'customProducts': serializer.data})


@api_view(['GET'])
def product_detail(request, pk):
    """Single product by id."""
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'detail': 'Not found'}, status=404)
    serializer = ProductSerializer(product, context={'request': request})
    return Response(serializer.data)
