<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\RelationshipController;
use App\Http\Controllers\StoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/getUserById/{id}',[AuthController::class,'getUserById']);
    Route::post('/updateUser/{id}',[AuthController::class,'updateUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/getStories', [StoryController::class,'getStories'])->name('stories.getStories');
    Route::get('/getStoryById/{id}', [StoryController::class,'getStoryById'])->name('stories.getStoryById');
    Route::post('/store', [StoryController::class,'store'])->name('stories.store');
    Route::get('/getUsersIFollow/{id}', [RelationshipController::class,'getUsersIFollow'])->name('relationship.getUsersIFollow');
    Route::get('/getUsersFollowMe/{id}', [RelationshipController::class,'getUsersFollowMe'])->name('relationship.getUsersFollowMe');
    Route::get('/getFriendshipSuggestions/{id}',[RelationshipController::class,'getFriendshipSuggestions'])->name('relationship.getFriendshipSuggestions');
    Route::post('/addFollow/{followerId}/{followedId}', [RelationshipController::class, 'addFollow'])->name('relationship.addFollow');
    Route::post('/setPost', [PostsController::class,'setPost'])->name('posts.setPost');
    Route::get('/getProfilePosts', [PostsController::class,'getProfilePosts'])->name('posts.getProfilePosts');
    Route::get('/getHomePosts', [PostsController::class,'getHomePosts'])->name('posts.getHomePosts');
    Route::post('/sendMessage', [ChatController::class,'sendMessage'])->name('chat.sendMessage');
    Route::get('/getMessages/{id}/{toId}', [ChatController::class,'getMessages'])->name('chat.getMessages');
});


// Public Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


