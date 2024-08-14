<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::get('/conversations', [ConversationController::class, 'index']);
Route::post('/conversations', [ConversationController::class, 'store']);
Route::get('/conversations/{id}', [ConversationController::class, 'show']);
Route::post('/conversations/{conversation_id}/messages', [MessageController::class, 'store']);
