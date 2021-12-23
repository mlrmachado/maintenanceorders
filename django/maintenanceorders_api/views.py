import json
from django.db import models
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from blog.models import Category, Post, Order
from .serializers import CategorySerializer, OrderSerializer, PostSerializer
from rest_framework import filters, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
from django.forms.models import model_to_dict
import os

try:
    IsAuthenticatedNecessary = not (os.environ['AUTH_FULL'] == 'FALSE') #Controla se utiliza autenticação ou não
except:
    IsAuthenticatedNecessary = True

class Orders(APIView): #api/order/<str:id>    
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    def get(self, request, id, format=None):        
        try:
            serializer = OrderSerializer(Order.objects.get(pk=id)).data # TRAVAR SE EXISTE, PODE NÃO EXISTIR, DAR RETORNO CONDIZENTE
        except Order.DoesNotExist:
            return JsonResponse({'message': 'The Order {id} does not exist'.format(id=id)}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer)        
    
    def delete(self, request, id, format=None):
        try:
            Order.objects.get(pk=id).delete()            
        except Order.DoesNotExist:    
            return JsonResponse({'message': 'The Order {id} does not exist'.format(id=id)}, status=status.HTTP_404_NOT_FOUND)        
        return JsonResponse({'message': 'Order {id} deleted'.format(id=id)}) 

class ListOrders(APIView):
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]    
    def get(self, id):                        
        data = Order.objects.all()
        ready = []        
        for item in data:
            row = {}        
            row['id'] = item.id
            row['name'] = item.name
            row['phone'] = item.phone
            row['agency'] = item.agency
            row['description'] = item.description
            row['company'] = item.company
            row['deadline'] = json.dumps(item.deadline, default=str).replace('\"', '').replace(':00+00:00', '')
            row['categoryid'] = item.category.id
            row['categoryname'] = item.category.name
            ready.append(row)

        json_data = json.dumps(ready)
        return HttpResponse(json_data, content_type="application/json")        
        

class PostOrder(APIView): #api/order/create/
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):         
        serializer = OrderSerializer(data=request.data)           
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK,)
        else:
            return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED, exception=True)

class EditOrder(APIView):
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    def put(self, request, id):
        try: 
            order = Order.objects.get(pk=id) 
        except Order.DoesNotExist:
            return JsonResponse({'message': 'Order {id} does not exist'.format(id=id)}, status=status.HTTP_404_NOT_FOUND) 
        order_data = OrderSerializer(data=request.data)
        if order_data.is_valid():
            order_data = order_data.data
        order_serializer = OrderSerializer(order, data=order_data)
        if order_serializer.is_valid(): 
            order_serializer.save() 
            return JsonResponse(order_serializer.data) 
        return JsonResponse(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class PostCategory(APIView): #api/order/create/
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, format=None):        
        serializer = CategorySerializer(data=request.data)           
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK,)
        else:
            return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED, exception=True)

class Categories(APIView):
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    def get(self, request, id, format=None):        
        try:
            serializer = CategorySerializer(Category.objects.get(pk=id)).data
        except Category.DoesNotExist:
            return JsonResponse({'message': 'The category {id} does not exist'.format(id=id)}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer)
    
    def delete(self, request, id, format=None):
        try:
            Category.objects.get(pk=id).delete()
        except Category.DoesNotExist:
            return JsonResponse({'message': 'The category {id} does not exist'.format(id=id)}, status=status.HTTP_404_NOT_FOUND)         
        except models.ProtectedError:
            return JsonResponse({'message': 'Category {id} used in some order'.format(id=id)}, status=status.HTTP_409_CONFLICT)
        return JsonResponse({'message': 'Category {id} deleted'.format(id=id)}) 

class ListCategories(generics.ListAPIView):
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class EditCategory(APIView):
    if IsAuthenticatedNecessary:
        permission_classes = [permissions.IsAuthenticated]
    def put(self, request, id):
        try: 
            category = Category.objects.get(pk=id) 
        except Category.DoesNotExist:
            return JsonResponse({'message': 'The category {id} does not exist'.format(id=id)}, status=status.HTTP_404_NOT_FOUND) 
        category_data = CategorySerializer(data=request.data)
        if category_data.is_valid():
            category_data = category_data.data
            category_serializer = CategorySerializer(category, data=category_data)
            if category_serializer.is_valid(): 
                category_serializer.save() 
                return JsonResponse(category_serializer.data) 
        return JsonResponse(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)     