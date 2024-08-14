<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return Conversation::with(['messages' => function ($query) {
            $query->orderBy('created_at', 'ASC');
        }])->orderBy('created_at', 'ASC')->get();
    }

    public function store(Request $request)
    {
        $conversation = Conversation::create($request->all());
        return response()->json($conversation, 201);
    }

    public function show($id)
    {
        return Conversation::with(['messages' => function ($query) {
            $query->orderBy('created_at', 'ASC');
        }])->findOrFail($id);
    }
}
