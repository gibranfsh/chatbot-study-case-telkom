<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'sender' => $request->sender,
            'content' => $request->content
        ]);

        return response()->json($message, 201);
    }
}
