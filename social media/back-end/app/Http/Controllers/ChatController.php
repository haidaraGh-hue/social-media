<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'user_id' => $request->user_id,
            'text' => $request->input('message'),
            'to_user_id' => $request->to_user_id,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['status' => 'Message Sent!', 'message' => $message]); // إرجاع الرسالة المرسلة
    }

    public function getMessages($id, $to_id){
        $messages = Message::where('user_id', $id)->Where('to_user_id', $to_id)->orderByDesc('created_at')->get();
        return $messages;
    }
}