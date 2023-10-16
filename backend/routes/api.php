<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AttributeValueController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SupplierController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::get('/get-category-list', [CategoryController::class, 'getCategoryList']);
    Route::get('/get-sub-category-list/{categoryId}', [SubCategoryController::class, 'getSubCategoryList']);
    Route::get('/get-brand-list', [BrandController::class, 'getBrandList']);
    Route::get('/get-supplier-list', [SupplierController::class, 'getSupplierList']);
    Route::get('/get-attribute-list', [AttributeController::class, 'getAttributeList']);
    Route::get('/get-attribute-value-list/{attributeId}', [AttributeValueController::class, 'getAttributeValueList']);

    Route::apiResource('/category', CategoryController::class);
    Route::apiResource('/sub-category', SubCategoryController::class);
    Route::apiResource('/brand', BrandController::class);
    Route::apiResource('/supplier', SupplierController::class);
    Route::apiResource('/attribute', AttributeController::class);
    Route::apiResource('/attribute-value', AttributeValueController::class);
});
