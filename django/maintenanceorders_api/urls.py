from .views import Categories, EditCategory, EditOrder, ListCategories, ListOrders, PostCategory, PostOrder, Orders
from django.urls import path

app_name = 'maintenanceorders_api'

urlpatterns = [
    #Order API'S    
    path('order/create/', PostOrder.as_view(), name='createpost'),
    path('order/<str:id>', Orders.as_view(), name='orders'),
    path('listorders/', ListOrders.as_view(), name='listorders'),
    path('order/edit/<str:id>', EditOrder.as_view(), name='editorder'),
    #Category API'S    
    path('category/create/', PostCategory.as_view(), name='createcategory'),
    path('category/<str:id>', Categories.as_view(), name='categories'),
    path('listcategories/', ListCategories.as_view(), name='listcategories'),
    path('category/edit/<str:id>', EditCategory.as_view(), name='editcategory'),
]
